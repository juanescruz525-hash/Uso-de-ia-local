document.addEventListener("DOMContentLoaded", () => {

const input = document.getElementById("prompt")
const button = document.getElementById("send-btn")
const chatBox = document.getElementById("chat-box")

async function sendPrompt(){

const prompt = input.value.trim()

if(prompt === "") return

chatBox.innerHTML += `
<div class="user-message">${prompt}</div>
`

input.value = ""

const loaderId = "loader-" + Date.now()

chatBox.innerHTML += `
<div class="bot-message loading" id="${loaderId}">
Pensando<span class="dots"></span>
</div>
`

chatBox.scrollTop = chatBox.scrollHeight

try{

const response = await fetch("/chat",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({prompt})

})

const data = await response.json()

document.getElementById(loaderId).innerText = data.response

}catch(error){

document.getElementById(loaderId).innerText =
"⚠️ Error conectando con el servidor"

}

chatBox.scrollTop = chatBox.scrollHeight

}

button.addEventListener("click", sendPrompt)

input.addEventListener("keydown",(event)=>{

if(event.key === "Enter"){
sendPrompt()
}

})

})
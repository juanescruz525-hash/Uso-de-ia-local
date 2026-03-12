import { useState } from "react" 
 
 export default function ChatInput({messages,setMessages}){ 
 
 const [input,setInput] = useState("") 
 
 async function send(){ 
 
 if(!input) return 
 
 const newMessages = [...messages,{role:"user",text:input}] 
 setMessages(newMessages) 
 
 setInput("") 
 
 let botMessage = {role:"bot",text:""} 
 setMessages([...newMessages,botMessage]) 
 
 const response = await fetch("http://localhost:8000/chat",{ 
 
 method:"POST", 
 
 headers:{ 
 "Content-Type":"application/json" 
 }, 
 
 body:JSON.stringify({prompt:input}) 
 
 }) 
 
 const reader = response.body.getReader() 
 const decoder = new TextDecoder() 
 
 while(true){ 
 
 const {value,done} = await reader.read() 
 
 if(done) break 
 
 botMessage.text += decoder.decode(value) 
 
 setMessages([...newMessages,{...botMessage}]) 
 
 } 
 
 } 
 
 return( 
 
 <div className="input-bar"> 
 
 <input 
 value={input} 
 onChange={e=>setInput(e.target.value)} 
 onKeyDown={(e)=> e.key==="Enter" && send()} 
 placeholder="Escribe tu mensaje..." 
 /> 
 
 <button onClick={send}> 
 Enviar 
 </button> 
 
 </div> 
 
 ) 
 
 }

import Message from "./Message" 
 
 export default function ChatWindow({messages}){ 
 
 return( 
 
 <div className="chat-window"> 
 
 {messages.map((m,i)=>( 
 <Message key={i} message={m}/> 
 ))} 
 
 </div> 
 
 ) 
 
 }

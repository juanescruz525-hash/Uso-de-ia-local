import { useState } from "react" 
import ChatWindow from "./components/ChatWindow" 
import ChatInput from "./components/ChatInput" 
 
export default function App(){ 
 
 const [messages,setMessages] = useState([]) 
 
 return( 
 
 <div className="app"> 
 
 <h1 className="title">MiniChapi</h1> 
 
 <ChatWindow messages={messages} /> 
 
 <ChatInput setMessages={setMessages} messages={messages} /> 
 
 </div> 
 
 ) 
 
 }

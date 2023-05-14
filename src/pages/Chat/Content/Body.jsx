import React, { Component, useState, useEffect } from "react";
import io from "socket.io-client";

import "./bodyd.css";
import Avatar from "../Groups/Avatar";
import ChatItem from "./ChatItem";
let socket;


export default function ChatContent(props) {

  const messagesEndRef = React.useRef(null) 
  const [msg,setmsg] = React.useState("");
  const [messages , setmessages] = React.useState([]);
  const [clicked,setclicked] = React.useState(true)
  const user = JSON.parse( localStorage.getItem("user"));
  const fileref = React.useRef(null)
  const [file,setfile] = React.useState(null);

  React.useEffect(()=>{
      socket = io.connect("http://localhost:3000");
      socket.emit("setup",user)
      socket.on("connected",()=>{
          console.log("connected");
      })
  
  },[])
    
   React.useEffect(()=>{
     socket.on("recieve",(msg)=>{
      setmessages([...messages,msg]);
      scrollToBottom();
     })
   })


  function change()
  {
    let GId = props.id.Id;
    socket.emit("join",GId);
    axios.get(`http://localhost:3000/chats/${GId}`,{headers:{Autorization:props.token}})
    .then(res=>{
        setmessages(res.data) 
        scrollToBottom()               
    })
    .catch(err=>console.log(err));
  }
 
    React.useEffect(()=>{
      change()
    },[props.id.Id])
   
    function sendMsg(e)
    {  
      console.log("send message clicked")
      e.preventDefault();
      let GId = props.id.Id;
      let formdata = new FormData();
      
       if(file) formdata.append("file",file);
       else formdata.append("Msg",msg)


      console.log("rasengan rsngan rasengana")
       axios.post(`http://localhost:3000/chats/${GId}`,formdata, {headers:{Autorization:props.token}})
       .then(res=>{
        socket.emit('sent',res.data, GId);
        console.log(res.data)
        setfile(null);
        setmsg("")
       })
       .catch(err=>{
         console.log(err);
         setfile(null);
       } )
      
    }
  

  const scrollToBottom = () => {
    
     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function selectfile(e)
  {  
    console.log("send file clicked")
    fileref.current.click();
  }

  function handlefile(e)
  {
     setfile(e.target.files[0]);
  }
     

  const  handleChange = (e) => {
     setmsg(e.target.value );
  };
    
    if(!props.id.Id)
      return (
        <div className="main__chatcontent ">
          <h5>select a group </h5>
        </div>
      )
    return (
      
      <div className="main__chatcontent">
         <div>
        <div className="content__header">
          <div className="blocks">
            <div className="current-Group">
              <Avatar
                isOnline="active"
                image={props.id.image}
              />
              <p>{props.id.name}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="logout">
              <button onClick={props.logout} className="">
                Logout <i className="fa-sharp fa-solid fa-arrow-up-left-from-circle" style={{color: "#6c1fe0"}}></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            { messages.map((item, index) => {
      
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={item.id}
                  user={user.id === item.UserId ? "me":"other"}
                  msg={item.message}
                  image={item.image}
                  type={item.type}
                  name={item.User}
                />
              );
            })}
            <div style={{height:"3px"}}  ref={messagesEndRef} ></div>
          </div>
        </div>
        </div>

        <div className="content__footer">
          <div className="sendNewMessage">
  
            <button onClick={selectfile} className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
          
            <input 
            type="file" 
            onChange={handlefile}
            ref={fileref}
            style={{display:"none"}}
            name="file_name"
             />
            <input
              type="text"
              placeholder="Type a message here"
              onChange={handleChange}
              value={msg}
            />
            <button onClick={sendMsg} className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>


         
            
          </div>
        </div>

      </div>
    );
  }


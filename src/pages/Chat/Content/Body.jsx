import React, { Component, useState, useEffect } from "react";

import "./bodyd.css";
import Avatar from "../Groups/Avatar";
import ChatItem from "./ChatItem";

export default function ChatContent(props) {
 const messagesEndRef = React.useRef(null) 
 const [msg,setmsg] = React.useState("");
 const [messages , setmessages] = React.useState([]);
 const [clicked,setclicked] = React.useState(true)
    
    React.useEffect(()=>{
      let GId = props.id.Id;
      
      axios.get(`http://localhost:3000/chats/${GId}`,{headers:{Autorization:props.token}})
      .then(res=>{
          setmessages(res.data)                 
      })
      .catch(err=>console.log(err));
      
    },[props.id,clicked])
   
    function sendMsg()
    { 
      let GId = props.id.Id;
       axios.post(`http://localhost:3000/chats/${GId}`, {Msg:msg}, {headers:{Autorization:props.token}})
       .then(res=>{
        setclicked(v=>!v);
        scrollToBottom();
       })
       .catch(err=>console.log(err));
    }
  

  const scrollToBottom = () => {
     messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // componentDidMount() {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.keyCode == 13) {
  //       if (this.state.msg != "") {
  //         this.chatItms.push({
  //           key: 1,
  //           type: "",
  //           msg: this.state.msg,
  //           image:
  //             "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //         });
  //         this.setState({ chat: [...this.chatItms] });
  //         this.scrollToBottom();
  //         this.setState({ msg: "" });
  //       }
  //     }
  //   });
  //   this.scrollToBottom();
  // }

  const  handleChange = (e) => {
     setmsg(e.target.value );
  };

  
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-Group">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>{props.id.name}</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
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
                  user={item.type}
                  msg={item.message}
                  // image={item.image}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
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


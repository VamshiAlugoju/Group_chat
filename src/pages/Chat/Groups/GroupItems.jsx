import React, { Component } from "react";
import Avatar from "./Avatar";
import "./Groups.css";

function GroupItems(props) {
   const selectChat = (e) => {
      
       
      for (
        let index = 0;
        index < e.currentTarget.parentNode.children.length;
        index++
      ) {
        e.currentTarget.parentNode.children[index].classList.remove("active");
      }
      e.currentTarget.classList.add("active");
       
      props.changegroup(props.id , props.name);
    };

  return (
    <div
      style={{ animationDelay: `0.s` }}
      onClick={selectChat}
      className={`chatlist__item ${props.active ? props.active : ""} `}
      id={props.id}
    >
      <Avatar
        image={props.image ? props.image : "http://placehold.it/80x80"}
      />
      <div className="userMeta">
        <p>{props.name}</p>
      </div>
    </div>
  );
}

export default GroupItems;

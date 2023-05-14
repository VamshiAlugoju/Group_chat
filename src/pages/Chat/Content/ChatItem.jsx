import React from "react";
import Avatar from "../Groups/Avatar";

export default function ChatItem (props) {
  
  let file = props.type === "file";
   
    return (
      <div
        // style={{ animationDelay: `0.8s` }}
        className={`chat__item ${ props.user ? props.user : ""}`}
      >
        <div className="chat__item__content">
            <div className="chat_user_name">
                <p>{props.name ? props.name.Name : ""}</p>
            </div>
            {file ?
             <div className="image_div"> 
               <img src={props.image} alt="img" />
             </div> :
          <div className="chat__msg">{ props.msg}</div>
             }
          
        </div>
        
      </div>
    );
  
}

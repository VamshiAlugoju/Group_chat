import React from "react";
import "./Groups.css"
export default function Avatar (props) {
 
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={ props.image} alt="#" />
        </div>
        
      </div>
    );
}
import React from 'react'
// import "groupinfo.css"
import "./adduserItem.css"
function AdduserItem(props) {

    function add_to_group()
    {
        axios.post("http://localhost:3000/groups/add_to_group",{userId:props.id,groupId:props.groupId})
        .then(res=>{
            console.log("added");
        })
        .catch(err=>console.log(err));
    }
    
  return (
    <div className='user_main'>
       <div className='add_user_name'>
         <p className=''>{props.name}</p>
       </div>
       <div className='add_btn'>
         <button onClick={add_to_group} className='add_user_btn'>
         <i className="fa-solid fa-plus fa-beat-fade" style={{color: "#180ae6"}}></i>
         </button>
       </div>
    </div>
  )
}

export default AdduserItem
import React from 'react'
// import "groupinfo.css"
function UserItem(props) {
    
  return (
    <div className='user_main'>
       <div className='user_name'>
         <p>{props.name}</p>
       </div>
       <div className='admin_div'>
        <p>{props.admin ?? "Admin"}</p>
       </div>
    </div>
  )
}

export default UserItem
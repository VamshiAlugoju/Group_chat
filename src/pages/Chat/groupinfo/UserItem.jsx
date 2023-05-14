import React from 'react'

// import "groupinfo.css"
function UserItem(props) {
  
  const user = JSON.parse( localStorage.getItem("user"))

  function delete_user()
  {
    axios.delete(`http://localhost:3000/groups/delete_user?user_id=${props.id}&&group_id=${props.group_id}`)
    .then(res=>{
      
      props.clicked();
    })
    .catch(err=>console.log(err));
  }
   
  function makeAdmin() 
  {  
    console.log(props.id)
     axios.post(`http://localhost:3000/groups/makeAdmin`,{UserId:props.id,GroupId:props.group_id})
     .then(res=>{
      console.log(res.data);
      props.clicked();
     })
     .catch(err=>console.log(err));
  }

   let item ;
   
   const admin = props.admin;
   
   if(admin){
       item = <p>Admin</p>
   }
   else if(!admin && user.id ===props.Admin)
   {
    item =   <button onClick={delete_user} className='delete_btn' >      
    <i className="fa-solid fa-trash-can" style={{color: "#d81313"}}></i>
   </button>
   }
   
  return (
    <div className='user_main'>
      <div className='user_top_row'>
       <div className='user_name'>
         <p>{props.name}</p>
       </div>
       <div className='admin_div'>
         
          {item}
       </div>
      </div>
      <div className='make_admin'>
       { (!admin && user.id === props.Admin)? 
        <button onClick={makeAdmin} >Make admin</button> 
        : "" }
      </div>
    </div>
  )
}

export default UserItem
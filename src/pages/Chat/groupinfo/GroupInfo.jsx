import React from "react";
// import "./groupinfo.css";
import "./g.css"
import UserItem from "./UserItem";
import AddUsers from "./AddUsers";

export default function GroupInfo (props) {
   
  const user = JSON.parse( localStorage.getItem("user"))

  const[openmodal,setopenmodal] = React.useState(false);
  const[clicked , setclicked] = React.useState(false);
  function toggleclicked()
  {
    console.log("ello")
    setclicked(prev=>!prev);
  }
   function toggleisOpen()
   {      setclicked(prev=>!prev);
       setopenmodal(prev=>!prev);
   }

  let [users,setusers] = React.useState([]);
  let [admin,setadmin] = React.useState(false);
  React.useEffect(()=>{
    axios.get(`http://localhost:3000/groups/${props.id.Id}`)
    .then(res=>{
      console.log(res.data.users_arr[0])
        setusers(res.data.users_arr[0]);
        setadmin(res.data.admin)
        
    })
    .catch(err=>console.log(err));
  },[props.id.Id ,clicked])
    
  if(!user) return;
   
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={props.id.image} />
          </div>
          <h4 className="mt-2">{props.id.name}</h4>
        </div>
        <div className="user_list">
          <div className="users_div">
            <div className="user_and_btn">
              <h5>Users</h5>
              {admin === user.id ? <button onClick={toggleisOpen} >
                <i className="fa-regular fa-plus fa-rotate-90" style={{color: "#4f26c0"}}></i>
                </button> :" " }
               
            </div>
          </div>
           {users.map(item=>{
              
            return(

              <UserItem 
               name={item.Name}
               admin = {item.isadmin}
               Admin={admin}
               id={item.UserId}
               key={item.UserId}
               group_id={props.id.Id}
               clicked={toggleclicked}
               />
            )
           })}
        </div>
        <AddUsers clicked={toggleclicked} id={props.id.Id} toggleisOpen={toggleisOpen} isOpen={openmodal} />
      </div>
    );
  
}

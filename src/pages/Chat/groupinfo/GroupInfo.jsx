import React from "react";
// import "./groupinfo.css";
import "./g.css"
import UserItem from "./UserItem";
import AddUsers from "./AddUsers";

export default function GroupInfo (props) {
   
  const[openmodal,setopenmodal] = React.useState(false);

   function toggleisOpen()
   {    
       console.log("hello")
       setopenmodal(prev=>!prev);
   }

  let [users,setusers] = React.useState([]);

  React.useEffect(()=>{
    axios.get(`http://localhost:3000/groups/${props.id.Id}`)
    .then(res=>{
        setusers(res.data);
         
    })
    .catch(err=>console.log(err));
  },[props.id.Id])
   
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU" />
          </div>
          <h4 className="mt-2">{props.id.name}</h4>
        </div>
        <div className="user_list">
          <div className="users_div">
            <div className="user_and_btn">
              <h5>Users</h5>
               <button onClick={toggleisOpen} >
                <i className="fa-regular fa-plus fa-rotate-90" style={{color: "#4f26c0"}}></i>
                </button>
            </div>
          </div>
           {users.map(item=>{
             
            return(

              <UserItem 
               name={item.Name}
               />
            )
           })}
        </div>
        <AddUsers id={props.id.Id} toggleisOpen={toggleisOpen} isOpen={openmodal} />
      </div>
    );
  
}

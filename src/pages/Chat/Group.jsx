
import React from 'react'
import "./group.css"
import Groups from './Groups/Groups'
import Body from './Content/Body'
import GroupInfo from './groupinfo/GroupInfo'
import io from "socket.io-client";

function Group(props) {
  
  const [GId , setGId]= React.useState({Id:"",name:"",image:""});
  
  function changegroup(id , name,image)
  {   
     setGId({Id:id,name,image});
  }
     
  return (
    <div className='chat_body' > 
      <Groups changegroup={changegroup}  token={props.token} />
      <Body id={GId} logout={props.logout} token={props.token} />
      <GroupInfo id={GId} />
    </div>
     
  )
}

export default Group
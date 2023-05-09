
import React from 'react'
import "./group.css"
import Groups from './Groups/Groups'
import Body from './Content/Body'
import GroupInfo from './groupinfo/GroupInfo'
function Group(props) {
  
  const [GId , setGId]= React.useState({Id:"",name:""});
  
  function changegroup(id , name)
  {
     setGId({Id:id,name});
  }
     
  return (
    <div className='chat_body' > 
      <Groups changegroup={changegroup}  token={props.token} />
      <Body id={GId}  token={props.token} />
      <GroupInfo id={GId} />
    </div>
     
  )
}

export default Group
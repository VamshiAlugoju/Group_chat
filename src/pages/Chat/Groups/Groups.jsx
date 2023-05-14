import React from 'react'
import GroupItems from './GroupItems';
import "./Groups.css"
import Modal from './Formodal';

function Groups(props) {

  const [isOpen ,setIsOpen] = React.useState(false);
  const [click,setclick] = React.useState(false);
  function toggleisOpen()
  {
    setIsOpen(prev=>!prev);
    
  }

   
  const [Grouparr,setGrouparr] = React.useState([]);
  let token = localStorage.getItem("token");

  React.useEffect(()=>{
    axios.get("http://localhost:3000/user/groups",{headers:{Autorization:token}})
    .then(res=>{
        setGrouparr(res.data);                            
    })
    .catch(err=>console.log(err));
  },[click])
 
   function changearr( )
   { 
    setclick(prev=>!prev);
   }


  return (
    <div className="main__chatlist">
    <button onClick={toggleisOpen} className="btn">
      <i className="fa fa-plus"></i>
      <span>New Group</span>
    </button>
    <div className="chatlist__heading">
      <h2>Groups</h2>
    </div>
     
    <div className="chatlist__items">
      {Grouparr.map((item, index) => {
        return (
          <GroupItems
            changegroup={props.changegroup}
            name={item.Name}
            key={item.id}
            animationDelay={index + 1}
            // active={item.active ? "active" : ""}
            id={item.id}
            image={item.image}
          /> 
        );
      })}
    </div>
    <Modal changearr={changearr} token={props.token} isOpen={isOpen} toggleisOpen={toggleisOpen} />
  </div>
  )
}

export default Groups
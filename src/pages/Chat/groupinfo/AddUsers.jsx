import React from "react";
import Modal from "react-modal";
import "./modal.css";
import AdduserItem from "./AdduserItem";
const customStyles = {
  content: {
    top: "35%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
    height: "40%",
    padding: "0px",
  },
};

function addUsers(props) {

  const [users,setusers] = React.useState([]);

  React.useEffect(()=>{
    
    axios.get(`http://localhost:3000/groups/get_users`)
    .then(res=>{
     
      setusers(res.data);
    })
    .catch(err=>console.log("err"));

  },[])

  function closeModal() {
    props.clicked();
    props.toggleisOpen();
  }

  function submit_form(e) {
    e.preventDefault();
    //  axios.post("http://localhost:3000/user/groups",{Name},{headers:{Autorization:props.token}})
    //  .then(res=>{
    //   console.log(res)
    //   props.toggleisOpen();
    //   props.changearr(res.data);
    //  })
    //  .catch(err=>console.log(err));
  }

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="main_div_modal ">

          <div className=" heading_div  ">
            <div className=" heading">
              <h5>Users</h5>
              <button className="close_btn" onClick={props.toggleisOpen}>
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
          <div className="users_div_modal">
            {users.map(item=>{
              return(
                <AdduserItem key={item.id} groupId={props.id} name={item.Name} id={item.id} />
              )
            })}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default addUsers;

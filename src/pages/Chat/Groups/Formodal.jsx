 import React from "react";
import Modal from "react-modal";
import "./modal.css"
function modal(props)
{   
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    // const [modalIsOpen, setIsOpen] = React.useState(true);
    const [Name,setName] = React.useState("")
    function handlechange(e)
    {
      setName(e.target.value)
    }
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    props.toggleisOpen();
  }

  function submit_form(e)
  {
     e.preventDefault();
     axios.post("http://localhost:3000/user/groups",{Name},{headers:{Autorization:props.token}})
     .then(res=>{
      console.log(res)
      props.toggleisOpen();
      props.changearr(res.data);
     })
     .catch(err=>console.log(err));
  }
  return(
    <>
     <Modal
        isOpen={props.isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <div className="d-flex justify-content-end mb-1">
        <button className="button" onClick={props.toggleisOpen}><i className="fa-solid fa-xmark"></i></button>
        </div>
        
        <form className="form_div">
          <div className="d-flex flex-column mb-3">
          <label htmlFor="submit_group_name" name="group_name">Group Name :</label>
          <input type={"text"} value={Name} id="submit_group_name"  onChange={handlechange} />
          </div>
          <div className="text-center mt-1">
          <button onClick={submit_form} className="submit_btn">the modal</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default modal;
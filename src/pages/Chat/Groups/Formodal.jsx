 import React from "react";
import Modal from "react-modal";
import "./modal.css"
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
function modal(props)
{   
    
    const [Name,setName] = React.useState("")
    const [file,setfile] = React.useState(null);

    function handlechange(e)
    {
      setName(e.target.value)
    }
    function handleimage(e){
      // console.log(e.target.files[0]);
         setfile(e.target.files[0])

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
     let formdata = new FormData();
    //  console.log(file)
     formdata.append( "file", file);
     formdata.append( "Name", Name);

     axios.post("http://localhost:3000/user/groups",formdata,{headers:{Autorization:props.token}})
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
          <input type="file"  name="group_img" onChange={handleimage} />
          </div>
          <div className="text-center mt-1">
          <button onClick={submit_form} className="submit_btn">Submit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default modal;
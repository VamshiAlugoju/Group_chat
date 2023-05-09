
import React from "react";

function signup(props) {

   const [formData,setformData] = React.useState({
    Name:"",
    Email:"",
    Number:"",
    Password:""
   })

    function signUp(e)
    {  
         e.preventDefault();
         let {Email,Password,Name,Number} = formData;
         axios.post("http://localhost:3000/user/signup" , {Name,Password,Email,Number})
         .then(res=>{
            alert(res.data.message);
            props.mode();
         })
          .catch(err=>console.log(err));
          
    }

    function handleChange(e)
    {
       let {id,value} = e.target
       setformData({
         ...formData,
          [id]:value
       })
    }
  return (
    <>
      <div className="row">
        <div className="col-4 mx-auto mt-5 " >

        <form >
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name 
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              aria-describedby="emailHelp"
              value={formData.Name}
              onChange={handleChange}
            />
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              value={formData.Email}
              onChange={handleChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="Number" className="form-label">
              Number
            </label>
            <input
              type="number"
              className="form-control"
              id="Number"
              value={formData.Number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>
           <div className="text-center">
            
          <button  onClick={signUp} className="btn btn-primary text-center">
            Submit
          </button>
           </div>
        </form>
        <div className="text-center mt-2">
            <p>Already have an account  <button onClick={props.mode} className="btn btn-sm btn-dark">Login</button></p>
        </div>
        </div>
      </div>
    </>
  );
}

export default signup;

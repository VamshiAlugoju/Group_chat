
import React from "react";

function Login(props) {

   const [formData,setformData] = React.useState({
    // Name:"",
    // Email:"",
    Number:"",
    Password:""
   })

    function login(e)
    {  
         e.preventDefault();
         console.log(formData)
    }

    function handleChange(e)
    {
       let {id,value} = e.target
       setformData({
         ...formData,
          [id]:value
       })
       console.log(formData[id]);
    }
  return (
    <>
      <div className="row">
        <div className="col-4 mx-auto mt-5 " >

        <form >
          {/* <div className="mb-3">
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
            
          </div> */}
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
            
          <button  onClick={login} className="btn btn-primary text-center">
            Login
          </button>
           </div>
           <div className="text-center mt-2">
            <p>create an account <button onClick={props.mode} className="btn btn-sm btn-dark">Signup</button></p>
        </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default Login;

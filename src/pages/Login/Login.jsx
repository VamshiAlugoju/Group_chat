
import React from "react";
import "../Auth/auth.css"
function Login(props) {

   const [formData,setformData] = React.useState({
    Email:"",
    Password:""
   })

    function login(e)
    {  
         e.preventDefault();
         let {Email,Password} = formData;
         axios.post("http://localhost:3000/user/login" , {Email,Password})
         .then(res=>{
          if(res.status === 204)
           alert("user doesn't exist with email id");

           if(res.data.success)
           {
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("user",JSON.stringify(res.data.user))
             props.loggedin();
           }
           else{
            alert("password incorrect")
           }
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
        

        <form className="login_form_div" >
          <div className="mb-3">
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
            
          <button  onClick={login} className="auth_btn text-center">
            Login
          </button>
           </div>
           <div className="text-center mt-2">
            <p>create an account <button onClick={props.mode} className="auth_btn">Signup</button></p>
        </div>
        </form>
       
      </div>
    </>
  );
}

export default Login;

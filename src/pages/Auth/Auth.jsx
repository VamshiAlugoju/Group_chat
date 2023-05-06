// import { sign } from 'crypto'
import React from 'react'
import Signup from '../Signup/signup'
import Login from '../Login/Login'
function Auth() {
   const [isLogin,setisLogin] = React.useState(true)
   function changeMode()
   {
    setisLogin(prev=>!prev);
   }
  return (
    <>
    { isLogin ? <Login mode = {changeMode} /> : <Signup mode={changeMode} />}
    </>
  )
}

export default Auth

import React from 'react'
import './App.css'
import Auth from './pages/Auth/Auth'
import Group from './pages/Chat/Group'

function App() {
  
  const [isLoggedIn ,setLoggedIN] = React.useState(false)
  const auth = localStorage.getItem("token");

  React.useEffect(()=>{
    if(auth)
    {
      setLoggedIN(true)
    }
    else{
      setLoggedIN(false);
    }

  },[]);

  function loggedin()
  {
    setLoggedIN(prev=>!prev);
  }
  return (
    <>
      <div className='main_div'>
      {isLoggedIn ? <Group token={auth} /> : <Auth loggedin = {loggedin} />} 
      </div>
    </>
  )
}

export default App

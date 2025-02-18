import React,{useState} from 'react'
import {API_URL} from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const [username,setusername]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [error,seterror]=useState("");
  const [loading,setloading]=useState("");

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const response=await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({username,email,password})
      })

      if (response.ok){
        const data=await response.json();
        console.log(data);
        alert("Vendor Registered Successfully")
        setemail("")
        setusername("")
        setpassword("")
        showLoginHandler()
      }

    } catch (error) {
      console.error("registration falied for vendor",error);
      alert("Vendor Registration Failed")
    }
  }

  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3><br/>
            <label>Username</label>
            <input type="text" name='username' value={username} onChange={(e)=>setusername(e.target.value)} placeholder='Enter your username' /><br/>
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder='Enter your email' /><br/>
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter your password' /><br/>
        <div className="btnSubmit">
            <button type='submit'>Submit</button>
        </div>
        </form>
    </div>
  )
}

export default Register

import React from 'react';
import { useState } from 'react';
import './CSS/LoginSignup.css'

export const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username : "",
    password : "",
    email : ""
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value })
  }

  const login = async() => { 
    console.log("login Function", formData);
    let responseData;
    await fetch("http://localhost:8001/login", {
      method: 'POST',
      headers : {
        Accept : "application/form-data",
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify(formData),
    })
    .then((responce) => responce.json())
    .then((data) => responseData = data)

    if(responseData.success){
      console.log("Login success");
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.message); 
    }
    
  }

  const signup = async() => {
    console.log("signUp Function",formData);
    let responseData;
    await fetch("http://localhost:8001/signup", {
      method: 'POST',
      headers : {
        Accept : "application/form-data",
        "Content-Type" : 'application/json',
      },
      body : JSON.stringify(formData),
    })
    .then((responce) => responce.json())
    .then((data) => responseData = data)

    if(responseData.success){
      console.log("Login success");
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace("/");
    }
    else{
      alert(responseData.error);
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">
          {state === "Sign Up"? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />: <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' required/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' required/>
        </div>
        <button onClick={() => {state === 'Login' ? login() : signup()}}>Continue</button>
        {state == 'Sign Up'?
        <p className="loginsigup-login">Already have an account? <span onClick={() => setState('Login')}>Login here </span></p> :
        <p className="loginsigup-login">Create an account? <span onClick={() => setState('Sign Up')}>Sign Up here </span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id=''/>
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

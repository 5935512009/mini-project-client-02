import React, { useState } from 'react';
import auth from '../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from 'firebase'
import './appA.css';
import './log.css';


const Login =({ setSession })=>{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(
        username,
        password
      );
      
      const { user } = response;

      setSession({
        isLoggedIn: true,
        currentUser: user
      });
    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.message
      });
    }
  };

  const handleRegister = async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(
        username,
        password
      );

      const { user } = response;

      setSession({
        isLoggedIn: true,
        currentUser: user
      });
    } catch (error) {
      setSession({
        isLoggedIn: false,
        currentUser: null,
        errorMessage: error.essage
      });
    }
  };
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  return (
    
    <div class="wrapper zzz"   >
    <div class="form-signin" id="ccc">
      <img src="https://i.pinimg.com/originals/1c/d7/b3/1cd7b38e7a147808595157315392eadb.jpg" height="100" wight="100" id="icon1"></img>
    <h1 class="form-signin-heading" id="aaa" > TOP 10 FOOD </h1>
    
    {/* <p1>{username} {password}</p1> */}
    <input type="text" class="form-control" name="username" 
    placeholder="Email Address" 
    onChange={(e) =>setUsername(e.target.value)}
    />
    <input type="password" class="form-control" name="password" 
    placeholder="Password" 
    onChange={(e)=>setPassword(e.target.value)}
    />
    <br/>
    <button class="btn btn-secondary" onClick={handleLogin}> Login</button>
    <button class="btn btn-warning" onClick={handleRegister}> Register</button>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
    <br>
    </br>   
        <div class="img">
            
            
            
        </div>
    </div>
  </div>
  );
}

export default Login;
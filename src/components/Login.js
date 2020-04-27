import React, { useState } from 'react';
import auth from '../firebase';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from 'firebase'
import './appA.css';


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
    
    <div class="wrapper" >
    <div class="form-signin"id="ccc">
    <h2 class="form-signin-heading" id="aaa" >Login TOP 10 food </h2>
    
    {/* <p1>{username} {password}</p1> */}
    <input type="text" class="form-control" name="username" 
    placeholder="Email Address" 
    onChange={(e) =>setUsername(e.target.value)}
    />
    <input type="password" class="form-control" name="password" 
    placeholder="Password" 
    onChange={(e)=>setPassword(e.target.value)}
    />
    
    <button onClick={handleLogin}> Login</button>
    <button onClick={handleRegister}> Register</button>
    <StyledFirebaseAuth
      uiConfig={uiConfig}
      firebaseAuth={firebase.auth()}
    />
    <br>
    </br>   
        <div class="img">
            <img src="https://readthecloud.co/wp-content/uploads/2019/04/living-eat-forest-food-7.jpg" alt="Error"height="500" wight="200"></img>
            <img src="https://readthecloud.co/wp-content/uploads/2019/04/living-eat-forest-food-7.jpg" alt="Error"height="500" wight="200"></img>
            
        </div>
    </div>
  </div>
  );
}

export default Login;
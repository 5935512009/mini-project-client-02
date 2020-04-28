import React, { useState, useEffect } from 'react';
import Login from './Login'
import auth from '../firebase';
import './appA.css';

const Admin = () => {
  const [session, setSession] = useState({
    isLoggedIn: false,
    currentUser: null,
    errorMessage: null
  });

  useEffect(() => {
    const handleAuth = auth.onAuthStateChanged(user => {
      if (user) {
        setSession({
          isLoggedIn: true,
          currentUser: user,
          errorMessage: null
        });
      }
    });

    return () => {
      handleAuth();
    };
  }, []);
 

  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  };
  return (
    <div id="aaa">
      {session.isLoggedIn ? (
        <div>
          <span>
            <h1 id="ccc">Welcome  {session.currentUser && session.currentUser.displayName}</h1>
            {session.currentUser && session.currentUser.email}
            <br/>
            <img
               width="180px" height="150px"
              src={session.currentUser && session.currentUser.photoURL}
            />
          </span>
          
            <br/>
           
            <button  
               
                onClick={handleLogout}>logout</button>
          <h1>schedule top 10 food</h1>
          
            <div class="tab tab-1" id="table">
            
            <table  border="3" id="fff" className="white" >
                    <tr>
                        <th id="venchon">restaurant</th>
                        <th id="venchon">memu</th>
                        <th id="venchon">score</th>
                    </tr>
            </table>
              
            </div>
            <div class="tab tab-2"  >
        
                <h1>Restaurant  Name : <input type="text" name="fname" id="fname"></input></h1>
                <h1>Menu Name        : <input type="text" name="lname" id="lname"></input></h1>
                <h1>Score Menu       : <input type="number" name="age" id="age"></input></h1>

                <button onclick="addHtmlTableRow();">Add</button>
                <button onclick="editHtmlTbleSelectedRow();">Edit</button>
                <button onclick="removeSelectedRow();">Remove</button>
            </div>
             
          <script>
            
          </script>

        </div>

      ) : (
          <div>
          <Login setSession={setSession} />
          
           </div>
        )}
        
        
    </div>
     
  )
  
    
}
export default Admin
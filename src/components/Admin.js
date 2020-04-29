import React, { useState, useEffect } from 'react';
import Login from './Login'
import auth from '../firebase';
import './appA.css';
import MaterialTable from 'material-table';
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
   
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);  

  const handleLogout = () => {
    auth.signOut().then(response => {
      setSession({
        isLoggedIn: false,
        currentUser: null
      });
    });
  };

  const [state, setState] = React.useState({
    columns: [
      { title: 'Restaurant', field: 'name' },
      { title: 'Menu', field: 'surname' },
      { title: 'Score', field: 'birthYear', type: 'numeric' },
      {
        title: 'Price',
        field: 'birthCity',
        lookup: { 34: '40',35: '50', 63: '60', 64: '70', 65: '80', 66: '90', 67: '100' , 68: '1000'},
      },
       {title: 'Data', field:'name01' },
       
      
    ],
    data: [
      { name: 'ร้านเหลือง', surname: 'ผัดกระเพรา+ใข่ดาว', birthYear: 9, birthCity: 63, name01: 'เมนูสุดคลาสสิก' },
      {
        name: 'ร้านเหลือง',
        surname: 'หมูผัดนํ้ามันหอย',
        birthYear: 7,
        birthCity: 34,
        name01: 'เมนูยอดนิยมของร้านเหลือง' ,

      },
      {
        name: 'ร้านบังหลังมอ',
        surname: 'ข้าวมันไก่อบ',
        birthYear: 9,
        birthCity: 34,
        name01: 'เมนูยอดนิยมของร้านบังหลังมอ' ,
      },
    ],
  });


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
            <br/>
           
            <button  
               class = "btn btn-success"
                onClick={handleLogout}>logout</button>
          <h1>schedule top 10 food</h1>
          <MaterialTable
      title="TOP 10 FOOD IN THE WEEK"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
           
             
          

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
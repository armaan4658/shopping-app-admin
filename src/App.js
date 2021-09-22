import './App.css';
import {Switch , Route, Redirect} from 'react-router-dom';
import {LogIn} from './component/login.js';
import {Home} from './component/home.js';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
export const Login = React.createContext(null);
export const SetLogin = React.createContext(null);
export const CheckLogin = React.createContext(null);
function App() {
  const [login,setLogin] = useState(false);
  const checkLogin = () => {
      axios.get('https://0q54sk5m7j.execute-api.us-east-2.amazonaws.com/dev/admin/islogin',{withCredentials:true})
      .then(res=>{
        if(res.data.login==="true"){
          setLogin(true);
        }else{
          setLogin(false);
        }
      })
  }
  return (
    <Login.Provider value={login}>
      <SetLogin.Provider value={setLogin}>
        <CheckLogin.Provider value={checkLogin}>
            <Switch>
                <Route exact path='/'>
                    <LogIn />
                </Route>
                <Route path='/home'>
                    {login ? <Home/> : <Redirect to ='/'/>}
                </Route>
            </Switch>
        </CheckLogin.Provider>
      </SetLogin.Provider>
    </Login.Provider>
  );
}

export default App;

// **************** App.js  *************************

import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";

export default function App(){
  return(
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  )
}


// *************** routes.js *************************

import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import Private from './Private';

function RoutesApp() {
  return(
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/register' element= { <Register />} />
      <Route path='/admin' element= { <Private> <Admin /> </Private> } />
    </Routes>
  )
}

export default RoutesApp;

// ************** Private.js *********************

import { useState, useEffect } from "react";
import { auth } from "../firebaseconection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Private({ children }) {

  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = {
            uid: user.uid,
            email: user.email
          }

          localStorage.setItem("@detailUser", JSON.stringify(userData))


          setLoading(false)
          setSigned(true)

        } else {
          setLoading(false)
          setSigned(false)
        }
      })
    }

    checkLogin()
  }, [])


  if (loading){
    return(
      <div>Loading...</div>
    )
  }

  if (!signed) {
    return <Navigate to='/' />
  }

  return children;
}
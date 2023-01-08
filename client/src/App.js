import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import { Login } from "./components/Login"
import Navbar from "./components/Navbar"
import { Signup } from "./components/Signup"
import { AuthProvider} from "./context/AuthProvider"
import {useAuth} from './context/AuthProvider'
import { RequireAuth } from "./context/RequireAuth"
import {NoMatch} from "./components/NoMatch"
import { useState, useEffect } from "react"
import Feed from "./components/Feed"

function App() {
  const authLocal = useAuth()
  // const [loader, setLoader] = useState(false);


  // if (loader)
  //   return (
  //     <div
  //       style={{
  //         flex: 1,
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <h1>LOADING...</h1>
  //     </div>
  //   );

  return (
    <>

      <AuthProvider>
        <BrowserRouter>
         
          <Routes>
      
            <Route path='/' element={
              
                <Home />
               
            } />
            
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/feed' element={ <RequireAuth> <Feed /> </RequireAuth>} />
            <Route path='*' element={ <NoMatch /> } />

          </Routes>

        </BrowserRouter>
      </AuthProvider>



    </>



  )
}

export default App

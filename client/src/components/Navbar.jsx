
import { NavLink } from 'react-router-dom'
import {useAuth} from '../context/AuthProvider'
import React, { useState, useEffect } from 'react'

function Navbar() {

  const authLocal = useAuth()

  const [stickyClass, setStickyClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', stickNavbar);
    return () => window.removeEventListener('scroll', stickNavbar);
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      
      windowHeight > 150 ? setStickyClass('active') : setStickyClass('');
    }
  };


    return (

      <>


<nav className={`navbar navbar-expand-lg fixed-top py-5 ${stickyClass}`}>
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end pe-nav" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0 ">
        <li className="nav-item mx-3">
        <NavLink className="nav-link fs-5" to='/' >
                  Home
                </NavLink>
        </li>

       {!authLocal.user &&( <>
        <li className="nav-item mx-3">
        <NavLink className="nav-link fs-5" to='/login' >
                    Login
                  </NavLink>
        </li>
        <li className="nav-item mx-3">
          
        <NavLink className="nav-link fs-5" to='/signup' >
                    Signup
                  </NavLink>
        </li> 
        </> ) }
        

        {authLocal.user &&( <>
        <li className="nav-item">
          
       <button onClick={()=>{authLocal.logout()} }>Logout</button>
                   
                  
        </li>
        </> ) }
      
        
      </ul>
    </div>
  </div>
</nav>
      






       {/* <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div class="container-fluid">
          
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse d-flex justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link" to='/' >
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to='/profile' >
                  Profile
                </NavLink>
              </li>
              <li class="nav-item">
              
                  <NavLink className="nav-link" to='/login' >
                    Login
                  </NavLink>
                
              </li>
              <li>
               
                  <NavLink className="nav-link" to='/signup' >
                    Signup
                  </NavLink>
              
              </li>
              <li>
               
               <NavLink className="nav-link" to='/addbooks' >
                AddBooks
               </NavLink>
           
           </li>
            </ul>
          </div>
        </div>
      </nav>  */}
  
      </>
    )
  }
  
  export default Navbar
  
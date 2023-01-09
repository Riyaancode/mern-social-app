
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import React, { useState, useEffect } from 'react'

function Navbar() {

  const authLocal = useAuth()


  const user = JSON.parse(localStorage.getItem("user"));


  return (

    <>


      {/* <nav className={`navbar navbar-expand-lg  py-3`}>
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-between " id="navbarSupportedContent">

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
</nav> */}


      <header class="py-3 mb-4 border-bottom bg-white">
        <div class="container d-flex flex-wrap justify-content-between">

          <form class="col-12 col-lg-auto mb-3 mb-lg-0" role="search">
            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
          </form>
          <a href="/#" class="d-flex align-items-center mb-3 mb-lg-0 text-dark text-decoration-none">
            <div class="dropdown text-end">
              <a class="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={require("../uploads/" + user.image)} alt="mdo" width="32" height="32" class="rounded-circle" />
              </a>
              <ul class="dropdown-menu text-small" >

                <li><a class="dropdown-item" >Profile</a></li>
                <li><hr class="dropdown-divider" /></li>
                {authLocal.user && (<>
                  <li className="dropdown-item">

                    <button onClick={() => { authLocal.logout() }}>Logout</button>


                  </li>
                </>)}
              </ul>
            </div>

          </a>
        </div>
      </header>




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

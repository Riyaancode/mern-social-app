
import axios from "axios";
import { useAuth } from '../context/AuthProvider'
import React, { useState, useEffect } from 'react'

function Navbar() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length === 0 || query.length > 2) {
      searchUser()
    }

  }, [query])

  const authLocal = useAuth()


  const user = JSON.parse(localStorage.getItem("user"));

  const [searchData, setSearchData] = useState([]);
 

  const searchUser = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/users?q=${query}`);
      setSearchData(res.data);

    } catch (error) {
      console.log("ERROR", error);
      // setErrors(error.response.data);
    }
  };

  return (

    <>




      <header className="py-3 mb-4 border-bottom bg-white border-0 shadow">
        <div className="container d-flex flex-wrap justify-content-between">

          <form className=" mb-3 mb-lg-0" role="search">
            <input type="search" className="form-control" placeholder="Search..." onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
            
            <div className="card-body bg-white position-absolute z-1">
              {


                searchData.map((data) => (

                  <div className="card border-0 shadow-sm mb-3" key={data._id}>

                    <div className="p-2">
                      <div className="d-flex justify-content-start">
                        <div className="d-flex align-items-center">
                          <img src={require("../uploads/" + data.image)} className="rounded-circle" width="45" alt="" />
                          <div>
                            <h5 className="mb-0 mx-2" >{`${data.firstName} ${data.lastName}`}</h5>
                            <span className="mb-0 mx-2" >{`${data.location}`}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))





              }
            </div>
          </form>
          <div className="d-flex align-items-center mb-3 mb-lg-0 text-dark text-decoration-none">
            <div className="dropdown text-end">
              <a className="d-block link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <img src={require("../uploads/" + user.image)} alt="mdo" width="32" height="32" className="rounded-circle" />
              </a>
              <ul className="dropdown-menu text-small" >

                <li><a className="dropdown-item" href="/">Home</a></li>
                <li><hr className="dropdown-divider" /></li>
                {authLocal.user && (<>
                  <li className="dropdown-item">

                    <button className="btn" onClick={() => { authLocal.logout() }}>Logout</button>


                  </li>
                </>)}
              </ul>
            </div>

          </div>
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

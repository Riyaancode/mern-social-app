import { NavLink } from 'react-router-dom'


function Home() {




  return (

    <main>
      <div className="d-flex justify-content-between h-100">
        <div className="left position-relative w-25">
          <img src={require("../img/flare.png")} className="position-absolute flare" height="640" alt="character" />
          <img src={require("../img/character.png")} className="position-absolute" height="625" alt="character" />
          <img src={require("../img/objects.png")} className="position-absolute start-50" height="620" alt="character" />

        </div>
        <div className="right d-flex align-items-center w-50 justify-content-center text-end flex-column">
          <h1 className="display-4 mb-4"><b> SOCIAL APP </b> <br /> CONECPT</h1>
          <div className='d-flex justify-content-between align-items-center'>
           
              <NavLink className="nav-link fs-5" to='/signup' >
               Create Account
              </NavLink>
           
              <NavLink className="nav-link fs-5" to='/login' >
                Signin
              </NavLink>
          
          </div>
        </div>
      </div>
    </main>

  )
}

export default Home

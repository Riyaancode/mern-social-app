import { NavLink } from 'react-router-dom'


function Home() {




  return (

    <main>
      <div className="row h-100 w-100 m-0">
        <div className="left p-0 col-6">
          <img src={require("../img/flare.png")} className="position-absolute flare " height="640" alt="character" />
          <img src={require("../img/character.png")} className="position-absolute " height="625" alt="character" />
          <img src={require("../img/objects.png")} className="position-absolute " height="620" alt="character" />

        </div>
        <div className="right col-6 d-flex align-items-center justify-content-center text-end ">
          <div className='d-flex flex-column  align-items-end'>
            <h1 className="display-4 mb-4"><b> SOCIAL APP </b> <br /> CONECPT</h1>
            <div className='d-flex '>


              <NavLink className="nav-link mx-2 fs-5 mainbtn" to='/login' >
                Login
              </NavLink>
              <NavLink className="nav-link mx-2 fs-5 mainbtn" to='/signup' >
                Signup
              </NavLink>


            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default Home

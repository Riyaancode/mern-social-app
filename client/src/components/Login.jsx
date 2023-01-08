import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'



export const Login = () => {

  const [userSigninData, setUserSigninData] = useState({
    email: "",
    password: ""
  });



  const navigate = useNavigate()
  const location = useLocation()
  const redirectPath = location.state?.path || '/feed';

  const authLocal = useAuth()


  const handleLogin = async () => {


    try {
      // const res = await axios.post("/signin", userSigninData);
      //   console.log("LOGIN", res);
      const res = await axios.post("http://localhost:4000/signin", userSigninData);
      const user = res.data;
      console.log(user)
      authLocal.login(user)

      localStorage.setItem('user', JSON.stringify(user))
      navigate(redirectPath, { replace: true });
      alert("successfully Login");
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error)
      alert(errorMessage + ' ' + errorCode);
    };
  }

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUserSigninData({ ...userSigninData, [name]: value })
  }


  return (

    <main>
      <div className="d-flex justify-content-between h-100">
        <div className="left position-relative w-25">
          <img src={require("../img/flare.png")} className="position-absolute flare" height="640" alt="character" />
          <img src={require("../img/character.png")} className="position-absolute" height="625" alt="character" />
          <img src={require("../img/objects.png")} className="position-absolute start-50" height="620" alt="character" />

        </div>
        <div className="right d-flex align-items-center w-50 justify-content-center flex-column px-5">
          <div class="back-button">
            <NavLink to="/" >
            <div className="arrow-wrap">
              <span className="arrow-part-1"></span>
              <span className="arrow-part-2"></span>
              <span className="arrow-part-3"></span>
            </div>
            </NavLink>
          </div>
          <h2 className='mb-5 fs-1 fw-bold'>Login to Your Account</h2>
          <div class="mb-3 form__group field w-75">
            <input type='email' className="form__field" placeholder="Email" value={userSigninData.email} onChange={handleInputs} name="email" id='email' required />
            <label htmlFor='email' className="form__label">Email</label>
          </div>


          <div className="mb-3 form__group field w-75" >
            <input type='password' className='form__field' id='password' placeholder="Password" value={userSigninData.password} name='password' onChange={handleInputs} required />
            <label htmlFor='password' className="form__label">Password</label>
          </div>
          <button className="btn w-75 mt-3" onClick={handleLogin}>Login</button>

          <span className='mt-4 '> Don't have an account? <NavLink className="signuplink fw-bold" to='/signup'>Sign up</NavLink></span>

        </div>
      </div>
    </main>

    // <div className='container w-50'>
    //   <h1>Login</h1>
    //   <div>
    //     <div className="mb-3" />
    //       <label htmlFor='email' className="form-label">Email</label>
    //       <input type='email' className='form-control' id='email' value={userSigninData.email} name='email' onChange={handleInputs} />
    //     <div />

    //     <div className="mb-3" >
    //       <label htmlFor='password' className="form-label">Password</label>
    //       <input type='password' className='form-control' id='password' value={userSigninData.password} name='password' onChange={handleInputs}/>
    //       </div>
    //       <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    //   </div>
    // </div>
  )
}

import { useState } from 'react'
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'
import { useNavigate, useLocation } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
export const Signup = () => {

  const [userdata, setuserdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateofBirth: "",
    location: "",
    occupation: ""

  });
  const [image, setImage] = useState()

  const { firstName, lastName, email, password, dateofBirth, location, occupation } = userdata;

  const navigate = useNavigate()
  const locationPath = useLocation()
  const redirectPath = locationPath.state?.path || '/feed';

  const authLocal = useAuth()





  const formData = new FormData();

  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("dateofBirth", dateofBirth);
  formData.append("location", location);
  formData.append("occupation", occupation);
  formData.append("image", image);


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/register", formData)
      const user = res.data;
      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      authLocal.login(user)
      navigate(redirectPath, { replace: true })
      alert("successfully Signup");


    } catch (error) {
      console.log(error)
      alert(error.message)
    };

  }




  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setuserdata({ ...userdata, [name]: value })
  }




  return (
    <>


<main>
      <div className="row h-100 w-100 m-0">
        <div className="left p-0 col-6">
          <img src={require("../img/flare.png")} className="position-absolute flare " height="640" alt="character" />
          <img src={require("../img/character.png")} className="position-absolute " height="625" alt="character" />
          <img src={require("../img/objects.png")} className="position-absolute " height="620" alt="character" />

        </div>
        <div className="right right-signup h-100 p-5 flex-column col-6 d-flex align-items-center justify-content-center text-end ">
        <div class="back-button">
            <NavLink to="/" >
            <div className="arrow-wrap">
              <span className="arrow-part-1"></span>
              <span className="arrow-part-2"></span>
              <span className="arrow-part-3"></span>
            </div>
            </NavLink>
          </div>
          <h2 className=' fs-1 fw-bold'>Create Your Account</h2>
            <form method="POST" className='w-100 px-5' encType="multipart/form-data">

              <div className="mb-4 w-100" >

                <div className="row w-100">
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" id="firstName" placeholder="First name" aria-label="First name" value={userdata.firstName} name='firstName' onChange={handleInputs} />
                    <label htmlFor="firstName" className="form__label">First Name</label>
                  </div>
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" id="lastName" placeholder="Last name" aria-label="Last name" value={userdata.lastName} name='lastName' onChange={handleInputs} />
                    <label htmlFor="lastName" className="form__label">Last Name</label>
                  </div>
                </div>

              </div >

              <div className='mb-4 w-100'>
              <div className='row w-100'>

                <div className="col form__group field mx-3">
                  
                  <input type='email' className='form__field' id='email' value={userdata.email} placeholder="Email" name='email' onChange={handleInputs} />
                  <label htmlFor='email' className="form__label">Email</label>
                </div>

                <div className="col form__group field mx-3" >
                  
                  <input type='password' className='form__field' id='password' name='password' placeholder="Password" value={userdata.password} onChange={handleInputs} />
                  <label htmlFor='password' className="form__label">Password</label>
                </div>
              </div>
              </div>

            <div className='mb-4 w-100'>
              <div className='row w-100'>
              <div className="col form__group field mx-3">
                
                <input className="form__field" type="file" id="formFile" placeholder="Your Profile Photo" onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="formFile" className="form__label hide">Profile Photo</label>
              </div>

              <div className="col form__group field mx-3">
                
                <input placeholder="Select date" type="date" id="dob" className="form__field" name='dateofBirth' value={userdata.dateofBirth} onChange={handleInputs} />
                <label htmlFor='dob' className="form__label hide">Date of Birth</label>
              </div>
              </div>
              </div>


              <div className="mb-4 w-100">
                <div className="row w-100">
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" placeholder="Location" id="location" aria-label="location " value={userdata.location} name='location' onChange={handleInputs} />
                    <label htmlFor="location" className="form__label">Location </label>
                  </div>
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" placeholder="Occupation" id="occupation" aria-label="occupation" value={userdata.occupation} name='occupation' onChange={handleInputs} />
                    <label htmlFor="occupation" className="form__label">Occupation</label>
                  </div>
                </div>
              </div>






              <button className="btn btn-primary w-100 my-4" onClick={handleSignup}>Signup</button>
              
            </form>
             <span> Already have an account? <NavLink className="signuplink fw-bold" to='/login'>Signin</NavLink></span>
        </div>
      </div>
    </main>






      {/* <main>
        <div className="d-flex justify-content-between h-100">
          <div className="left position-relative w-25">
            <img src={require("../img/flare.png")} className="position-absolute flare" height="640" alt="character" />
            <img src={require("../img/character.png")} className="position-absolute" height="625" alt="character" />
            <img src={require("../img/objects.png")} className="position-absolute start-50" height="620" alt="character" />

          </div>
          <div className="right d-flex flex-column align-items-center w-50 justify-content-center px-5">
          <div class="back-button">
            <NavLink to="/" >
            <div className="arrow-wrap">
              <span className="arrow-part-1"></span>
              <span className="arrow-part-2"></span>
              <span className="arrow-part-3"></span>
            </div>
            </NavLink>
          </div>
          <h2 className=' fs-1 fw-bold'>Create Your Account</h2>
            <form method="POST" className='w-100' encType="multipart/form-data">

              <div className="mb-4 w-100" >

                <div className="row w-100">
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" id="firstName" placeholder="First name" aria-label="First name" value={userdata.firstName} name='firstName' onChange={handleInputs} />
                    <label htmlFor="firstName" className="form__label">First Name</label>
                  </div>
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" id="lastName" placeholder="Last name" aria-label="Last name" value={userdata.lastName} name='lastName' onChange={handleInputs} />
                    <label htmlFor="lastName" className="form__label">Last Name</label>
                  </div>
                </div>

              </div >

              <div className='mb-4 w-100'>
              <div className='row w-100'>

                <div className="col form__group field mx-3">
                  
                  <input type='email' className='form__field' id='email' value={userdata.email} placeholder="Email" name='email' onChange={handleInputs} />
                  <label htmlFor='email' className="form__label">Email</label>
                </div>

                <div className="col form__group field mx-3" >
                  
                  <input type='password' className='form__field' id='password' name='password' placeholder="Password" value={userdata.password} onChange={handleInputs} />
                  <label htmlFor='password' className="form__label">Password</label>
                </div>
              </div>
              </div>

            <div className='mb-4 w-100'>
              <div className='row w-100'>
              <div className="col form__group field mx-3">
                
                <input className="form__field" type="file" id="formFile" placeholder="Your Profile Photo" onChange={(e) => setImage(e.target.files[0])} />
                <label htmlFor="formFile" className="form__label">Profile Photo</label>
              </div>

              <div className="col form__group field mx-3">
                
                <input placeholder="Select date" type="date" id="dob" className="form__field" name='dateofBirth' value={userdata.dateofBirth} onChange={handleInputs} />
                <label htmlFor='dob' className="form__label">Date of Birth</label>
              </div>
              </div>
              </div>


              <div className="mb-4 w-100">
                <div className="row w-100">
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" placeholder="Location" id="location" aria-label="location " value={userdata.location} name='location' onChange={handleInputs} />
                    <label htmlFor="location" className="form__label">Location </label>
                  </div>
                  <div className="col form__group field mx-3">
                    
                    <input type="text" className="form__field" placeholder="Occupation" id="occupation" aria-label="occupation" value={userdata.occupation} name='occupation' onChange={handleInputs} />
                    <label htmlFor="occupation" className="form__label">Occupation</label>
                  </div>
                </div>
              </div>






              <button className="btn btn-primary w-100 my-4" onClick={handleSignup}>Signup</button>
              
            </form>
             <span> Already have an account? <NavLink className="signuplink fw-bold" to='/login'>Signin</NavLink></span>
          </div>
        </div>
      </main> */}
      {/* <div className='container w-50'>
        <h1>Signup</h1>
        <form method="POST" encType="multipart/form-data">

          <div className="mb-3" >

            <div className="row">
              <div className="col">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" placeholder="First name" aria-label="First name" value={userdata.firstName} name='firstName' onChange={handleInputs} />
              </div>
              <div className="col">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" placeholder="Last name" aria-label="Last name" value={userdata.lastName} name='lastName' onChange={handleInputs} />
              </div>
            </div>

          </div >


          <div className="mb-3">
          <label htmlFor='email' className="form-label">Email</label>
          <input type='email' className='form-control' id='email' value={userdata.email} name='email' onChange={handleInputs} />
          </div>

          <div className="mb-3" >
            <label htmlFor='password' className="form-label">Password</label>
            <input type='password' className='form-control' id='password' name='password' value={userdata.password} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Profile Photo</label>
            <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          <div className="mb-3">
            <label htmlFor='dob' className="form-label">Date of Birth</label>
            <input placeholder="Select date" type="date" id="dob" className="form-control" name='dateofBirth' value={userdata.dateofBirth} onChange={handleInputs} />
          </div>



          <div className="mb-3" />

          <div className="mb-3">
            <div className="row">
              <div className="col">
                <label htmlFor="location" className="form-label">Location </label>
                <input type="text" className="form-control" id="location" aria-label="location " value={userdata.location} name='location' onChange={handleInputs} />
              </div>
              <div className="col">
                <label htmlFor="occupation" className="form-label">Occupation</label>
                <input type="text" className="form-control" id="occupation" aria-label="occupation" value={userdata.occupation} name='occupation' onChange={handleInputs} />
              </div>
            </div>
          </div>


          <div />





          <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
        </form>
      </div> */}
    </>
  )
}

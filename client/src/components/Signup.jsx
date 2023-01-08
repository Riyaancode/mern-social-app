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
  const redirectPath = locationPath.state?.path || '/';

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
        <div className="d-flex justify-content-between h-100">
          <div className="left position-relative w-25">
            <img src={require("../img/flare.png")} className="position-absolute flare" height="640" alt="character" />
            <img src={require("../img/character.png")} className="position-absolute" height="625" alt="character" />
            <img src={require("../img/objects.png")} className="position-absolute start-50" height="620" alt="character" />

          </div>
          <div className="right d-flex align-items-center w-50 justify-content-center px-5">
            <form method="POST" className='w-100' encType="multipart/form-data">

              <div className="mb-4 w-100" >

                <div className="row w-100">
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

              <div className='mb-4 w-100'>
              <div className='row w-100'>

                <div className="col">
                  <label htmlFor='email' className="form-label">Email</label>
                  <input type='email' className='form-control' id='email' value={userdata.email} name='email' onChange={handleInputs} />
                </div>

                <div className="col" >
                  <label htmlFor='password' className="form-label">Password</label>
                  <input type='password' className='form-control' id='password' name='password' value={userdata.password} onChange={handleInputs} />
                </div>
              </div>
              </div>

            <div className='mb-4 w-100'>
              <div className='row w-100'>
              <div className="col">
                <label htmlFor="formFile" className="form-label">Profile Photo</label>
                <input className="form-control" type="file" id="formFile" onChange={(e) => setImage(e.target.files[0])} />
              </div>

              <div className="col">
                <label htmlFor='dob' className="form-label">Date of Birth</label>
                <input placeholder="Select date" type="date" id="dob" className="form-control" name='dateofBirth' value={userdata.dateofBirth} onChange={handleInputs} />
              </div>
              </div>
              </div>


              <div className="mb-4 w-100">
                <div className="row w-100">
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






              <button className="btn btn-primary" onClick={handleSignup}>Signup</button>
            </form>
          </div>
        </div>
      </main>
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

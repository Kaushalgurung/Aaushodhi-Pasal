import './CustomerSignUp.css'
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
// {signedIn, setSignedIn}
const CustomerSignUp = ({signedIn}) => {
  const history = useHistory();
//   const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  // const [token, setToken] = useState("")

  useEffect(() => {
    if(signedIn){
      history.push('/')
    }
  },[signedIn])

  const handleClick = async(e) => {
    console.log(email)
    console.log(password)
    e.preventDefault();
    const form = new FormData();
    form.append("name",name)
    form.append("email", email)
    form.append("password", password)
    // form.append("name", name)
    // console.log(email, password, username, confirmPassword, name)
    try{
        const response =  await axios.post('http://localhost:4000/api/v1/customer/register/',form
        )
        console.log(response.data)
        history.push('/customer-signin')
    }
    catch(error){
        console.log(error)
    }
 
    // if(response.status === 200 || response.status === 500){
    //     history.push('/')
    // }
    

    
    // navigate('/login')
  }


  return (
   <div className="signUpContainer">
     <div className="signUpWrapper">
        <h1 className="signUpTitle">SIGN UP</h1>
        <form className="signUpForm">
        <input value = {name} onChange = {(e) => setName(e.target.value)} className = "formInput" placeholder="Name" />

          <input  value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" className = "formInput" placeholder="Email" />
          <input value = {password}  onChange = {(e) => setPassword(e.target.value)} type = 'password'  className = "formInput" placeholder="Password" />
          <span className = "agreement">
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button onClick = {handleClick} className = "createAccount">Create account</button>
          </form>
          <Link to = '/customer-signin' className = "alreadyAccount"><span>Already have an account? Click To Login!</span></Link> 

     </div>
   </div>
  )
}

export default CustomerSignUp
import './CustomerLogin.css'
import {Link} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
// {signedIn, setSignedIn}
const CustomerLogin = ({signedIn, setSignedIn}) => {
  // const  navigate = useNavigate();
  const history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [user, setUser] = useState({})

  useEffect(() => {
    if(signedIn){
      // navigate('/')
      history.push('/')
    }
  },[signedIn])

  // const refreshToken = async () => {
  //   try {
  //     const res = await axios.get("http://127.0.0.1:8000/accounts/token/refresh/", { refresh: token.refresh });
  //     setToken({
  //       accessToken: res.data.access,
  //       refreshToken: res.data.refresh,
  //     });

  //     console.log(res.data)
  //     return res.data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const verifyToken = async () => {
  //   try{
  //     const res = await axios.post('http://127.0.0.1:8000/accounts/token/verify/', {
  //     token : token.access
  //     })
  //     console.log(res)
  //     console.log(res.data)

  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // }


  const handleSubmit = async(e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email",email)
    form.append("password",password)
    try{
      const response = await axios.post('http://localhost:4000/api/v1/customer/login',form)
      console.log(response.data)
      setUser(response.data)
      setSignedIn(true)

      await localStorage.setItem('customer-token', response.data.token)
      history.push('/')
      
    }
    catch(error){
      console.log(error)
    }
   
    

    // if(response.status === 200){
    //   setToken(response.data)
    //   setSignedIn(true)

    //   await localStorage.setItem('access', response.data.access)
    //   await localStorage.setItem('refresh', response.data.refresh)
    // }
    

    
  //   console.log("//////")
  //  refreshToken();

  
  }


  return (
   <div className="loginContainer">
     <div className="loginWrapper">
        <h1 className="loginTitle">Sign In</h1>
        <form className="loginForm">
        
          <input value = {username} onChange = {(e) => setUsername(e.target.value)} className = "formInput" placeholder="Username" />
          <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" className = "formInput" placeholder="Email" />
          <input value = {password} onChange = {(e) => setPassword(e.target.value)}  type = "password"  className = "formInput" placeholder="Password" />
          
         
          <button className = "loginAccount" onClick = {handleSubmit}>Login</button>
          </form>
          <Link to = '/customer-signup' className = "newAccount"><span>Don't have an account? Click To Register</span></Link> 

     </div>
   </div>
  )
}

export default CustomerLogin
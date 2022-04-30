import '../customerLogin/CustomerLogin.css'
import {Link} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../user/context'
import { saveLoginInfo } from '../services/db'
// {signedIn, setSignedIn}
const Login = () => {
  // const  navigate = useNavigate();
  const history = useHistory();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [showToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastHeader, setToastHeader] = useState("");
    const [toastBg, setToastBg] = useState("danger");
    const { login } = useContext(UserContext)



  const handleSubmit = async(e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("email",email)
    form.append("password",password)
    try{
      const response = await axios.post('http://localhost:4000/api/v1/admin/login/',form)
      console.log(response.data)

      login({ email, password }).then((res) => {
        // console.log(res);
        if (res.error) {
          setToastMessage(res.message);
          setToastHeader("Login Failed");
          setToastBg("danger");
          setToast(true);
        } else {
            console.log("No error")
          saveLoginInfo(res.data.data).then((db_res) => {
            if (db_res.success) {
                console.log("Success")
              setToastMessage("Login Successfull");
              setToastHeader("Success");
              setToastBg("success");
              // history.push('/')
              window.location.reload();
            } else {
              setToastMessage(res.message);
              setToastHeader("Login Failed");
              setToastBg("danger");
            }
          });
          setToast(true);
        }
      }
      );
    }
    catch(error){
      console.log(error)
    }
  
  }



  return (
   <div className="loginContainer">
     <div className="loginWrapper">
        <h1 className="loginTitle">Admin Sign In</h1>
        <form className="loginForm">
        
          <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "email" className = "formInput" placeholder="Email" />
          <input value = {password} onChange = {(e) => setPassword(e.target.value)}  type = "password"  className = "formInput" placeholder="Password" />
          
         
          <button className = "loginAccount" onClick = {handleSubmit}>Login</button>
          </form>
          <Link to = '/customer-signup' className = "newAccount"><span>Don't have an account? Click To Register</span></Link> 

     </div>
   </div>
  )
}

export default Login
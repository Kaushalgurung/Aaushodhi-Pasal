//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
//import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Login from '../Login';
import { UserContext } from "../user/context";
import { saveLoginInfo } from "../services/db";
import React, { useContext, useState } from "react";
// import { useHistory } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Row,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import axios from 'axios';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastHeader, setToastHeader] = useState("");
    const [toastBg, setToastBg] = useState("danger");
    const { login } = useContext(UserContext);
    const history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://s3-ap-south-1.amazonaws.com/ricedigitals3bucket/AUPortalContent/2021/07/12114718/blog-banner.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              login
            </Typography>
            <Box component="form" noValidate  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => {e.preventDefault(); setEmail(e.target.value);}}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
              variant="primary"
              onClick={async(e) => {
                e.preventDefault();
                const form = new FormData();
                form.append("email",email)
                form.append("password", password)


               const response =  await axios.post('http://localhost:4000/api/v1/admin/login/',form)
                console.log(response.data)
                login({ email, password }).then((res) => {
                  console.log(res);
                  if (res.error) {
                    setToastMessage(res.message);
                    setToastHeader("Login Failed");
                    setToastBg("danger");
                    setToast(true);
                  } else {
                    saveLoginInfo(res.data.data).then((db_res) => {
                      if (db_res.success) {
                        setToastMessage("Login Successfull");
                        setToastHeader("Success");
                        setToastBg("success");
                        history.push('/')
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
            }
              >
                Log-In
              </Button>
              <>             </>
              <Button
                type="submit"
                fullWidth
                variant="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Clear
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
        
      <ToastContainer className="p-3" position="top-end">
        <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg}>
          <Toast.Header>
            <strong className="me-auto">{toastHeader}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      </Grid>
    </ThemeProvider>
  );
};
export default Login;
//(TODO: Samrat): conditional render Login page, list appointment and add doctor page
import "./App.css";
import Doctors from "./doctors";
import { DoctorContextProvider } from "./doctors/context";
import {
  AppointmentContextProvider,
} from "./appointments/context";
import Navs from "./nav";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProductContextProvider } from "./products/context";
import Home from "./Home";
import About from "./About";
import Login from "./Login/Login.jsx";
import AddDoctor from "./doctors/addDoctor";
import AddProduct from "./products/addProducts";
import AddMedicine from "./medicines/addMedicines";
import { useEffect, useState } from "react";
import { validate } from "./services/db";
import { UserContextProvider } from "./user/context";
import DetailEdit from "./doctors/details";
import ProductDetailEdit from "./products/details"
import MedicineDetailEdit from "./medicines/details"
import ChangePassword from "./user";
import Appointments from "./appointments";
import Orders from "./orders";
import SignUp from "./Signup";
import Product from "./products";
// import Medicine from "./medicines"
import Medicine from './medicines'
import { OrderContextProvider } from "./orders/context";
import { MedicineContextProvider } from "./medicines/context";
import { CustomerContextProvider } from "./customer/context";
import CustomerLogin from "./customerLogin/CustomerLogin";
import CustomerSignUp from "./CustomerSignUp/CustomerSignUp";
import axios from "axios";
import Cart from "./Cart/Cart";
const ProtectedRoute = ({ authenticated, component: Component, ...rest }) => {
  return (
    <Route exact
      render={(props) =>
        authenticated ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [validated, setValidated] = useState(false);


    const token =  localStorage.getItem('customer-token')
    console.log(token)
  
  useEffect(() => {
    (async () => {
      const res = await validate();
      setAuthenticated(res);
      setValidated(true);
      // validate token
    })();
  }, [validated]);

  useEffect(() => {

  
    console.log("Useffect ran")
  
    if(token === ''){
      setSignedIn(false)
    }

    else {
      setSignedIn(true)
    }

  },[signedIn,token])
  return (
    <Router>
      <MedicineContextProvider>
        <ProductContextProvider>
          <OrderContextProvider>
            <AppointmentContextProvider>
              <CustomerContextProvider>
                <UserContextProvider>
                  <DoctorContextProvider>
                    {validated ? (
                      <div>
                        <Navs authenticated={authenticated} signedIn = {signedIn} setSignedIn = {setSignedIn}/>
                        <Switch>
                       
                          <Route path="/" exact component={Home} />
                          {validated && !authenticated ? (
                            <Route path="/login" exact component={Login} />
                          ) : (
                            ""
                          )}
                          <Route path="/about" component={About} />
                          <Route path="/doctors" exact component={Doctors} />
                          <Route path="/signup" exact component={SignUp} />
                          <Route path="/products" exact component={Product} />
                          <Route path="/medicines" exact >
                            <Medicine signedIn = {signedIn}/>
                          </Route>
                          <Route path = '/customer-signin' exact>
                              <CustomerLogin signedIn = {signedIn} setSignedIn = {setSignedIn}/>
                            </Route> 
                          <Route path = '/customer-signup'>
                            <CustomerSignUp signedIn = {signedIn} setSignedIn = {setSignedIn} />
                          </Route>
                          <Route path = '/cart'>
                            <Cart signedIn = {signedIn} />
                          </Route>
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/doctors/add"
                            component={AddDoctor}
                          />
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/products/add"
                            component={AddProduct}
                          />
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/medicines/add"
                            component={AddMedicine}
                          />
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/appointments"
                            component={Appointments}
                          />
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/orders"
                            component={Orders}
                          />
                          <ProtectedRoute
                            authenticated={authenticated}
                            path="/admin/changepassword"
                            component={ChangePassword}
                          />
                          <Route path={`/doctors/:id`} component={DetailEdit} />
                          <Route path={`/products/:id`} component={ProductDetailEdit} />
                          <Route path={`/medicines/:id`} component={MedicineDetailEdit} />
                          <Redirect to="/" />
                        </Switch>
                      </div>
                    ) : (
                      <div><h1>Loading.. Please wait....</h1></div>
                    )}
                  </DoctorContextProvider>
                </UserContextProvider>
              </CustomerContextProvider>
            </AppointmentContextProvider>
          </OrderContextProvider>
        </ProductContextProvider>
      </MedicineContextProvider>
    </Router>
  );
}

export default App;

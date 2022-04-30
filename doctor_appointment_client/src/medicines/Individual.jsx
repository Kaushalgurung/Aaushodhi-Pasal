import React,{useState, useEffect, useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Modal } from "react-bootstrap";
//import Button2 from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'; 
import { useDispatch } from "react-redux";
import {addProduct} from '../redux/cartRedux'
import axios from 'axios'
import { UserContext } from '../user/context';
import { useHistory } from 'react-router-dom';
const Individual = ({signedIn, i, medicine, setShow, setViewDetails, handleDetailsShow, setViewMedicine, setViewDelete, handleDeleteShow}) => {

    const history = useHistory()
  console.log(signedIn)
  

  const { is_admin } = useContext(UserContext);

  
  const dispatch = useDispatch();
//   const [productItem, setProductItem] = useState({})
//   useEffect(() => {
//     const getProduct = async () => {
//       // const response = await axois.get(`/category/${category}`)
      

//       const response1 = await axios.get(`http://localhost:4000//api/v1/medicines/${medicine._id}`)
//       console.log(response1.data)
//       setProductItem(response1.data)
//     }

//     getProduct()
//   },[])
  let quantity = 1;
  const addToCart = () => {
    dispatch(
      addProduct({ ...medicine, quantity})
    );
  }
  return (
    <Grid key={i} item>
            <Box sx={{ flexGrow: 1 }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    component="img"
                    alt="Medicine"
                    height="200"
                    image={medicine.img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bolder">Medicine Code:
                      {medicine.medicine_code}<br />
                    </Typography>
                    {/* <Typography variant="h7" color="text.primary" fontWeight="bold">
                      Details: {medicine.description}<br />
                      </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Designation:
                      {medicine.designation}<br />
                    </Typography> */}
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Medicine's Name: 
                      {medicine.medicine_name}<br />
                    </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Medicine's Use: 
                      {medicine.use}<br />
                    </Typography>
                    {/* <Typography variant="h7" color="text.primary" fontWeight="bold">Medicine's Dosage: 
                      {medicine.dosage}
                    </Typography> */}
                  </CardContent>
                  {is_admin ? (
                    <CardActions>
                    <Button onClick={() => {
                      history.push(
                        `${window.location.pathname}/${medicine._id}`
                        );
                      }}
                      >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setViewMedicine(medicine);
                        handleDeleteShow();
                      }}
                      >
                      Delete
                    </Button>
                  </CardActions>
                      ):(
                        <CardActions>
                    {/* <Button onClick={() => {
                      setViewMedicine(medicine); handleShow();
                      }}
                      >
                      Order Medicine
                    </Button> */}
                    <Button 
                      onClick={() => {
                        setViewMedicine(medicine);
                        handleDetailsShow();
                      }}
                      >
                      Show Details
                    </Button>
                    {
                      signedIn && <Button onClick = {addToCart} >Add To Cart</Button>
                    }
                  </CardActions>
                      )}
                </Card>
            </Box>
            </Grid>
  )
}

export default Individual
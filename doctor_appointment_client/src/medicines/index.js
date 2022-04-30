import { MedicineContext } from "./context";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../user/context";
import { useHistory } from "react-router";
import Detail from "./detailsView";
import BookMedicine from "./BookModal";
import Individual from "./Individual";

import Grid from '@mui/material/Grid'; 
 

const DeleteMedicine = ({ id, open, handleClose }) => {
  const { deleteMedicine, refreshData } = useContext(MedicineContext);
  
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Medicine</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wanna delete this medicine?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await deleteMedicine(id);
            refreshData();
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Medicines = ({signedIn}) => {
  const [show, setShow] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const { is_admin } = useContext(UserContext);
  const handleDetailsClose = () => setViewDetails(false);
  const handleDetailsShow = () => setViewDetails(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [viewMedicine, setViewMedicine] = useState({});
  const [viewDelete, setViewDelete] = useState(false);
  const handleDeleteClose = () => setViewDelete(false);
  const handleDeleteShow = () => setViewDelete(true);
  let { medicines } = useContext(MedicineContext);

  const [query, setQuery] = useState("")

  medicines = medicines.filter(medicine => medicine.medicine_name.includes(query))
  return (
    <div>
      <div style = {{marginTop : "20px", display : 'flex', justifyContent : 'space-around', alignItems : 'center', marginBottom : '20px'}}>
      <h1 style = {{marginLeft : '20px',fontSize : '25px'}}>List of Medicine</h1>
      <input type = "text" value = {query} onChange = {(e) => setQuery(e.target.value)} placeholder = "Search medicine by name..." style = {{border : '2px solid black', padding : '5px'}} />
      </div>
      <Grid sx={{ flexGrow: 0}} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
      {medicines.map((medicine, i) => {
        if (!medicine.is_archived) {
          return <Individual i = {i} medicine = {medicine} setShow = {setShow} setViewDetails = {setViewDetails} handleDetailsShow = {handleDetailsShow} setViewMedicine = {setViewMedicine} setViewDelete = {setViewDelete} handleDeleteShow = {handleDeleteClose} signedIn = {signedIn}/>
            
        
        }
      })}
      </Grid>
      </Grid>
      </Grid>

      {/* .card*/}

      {viewMedicine != new Object() && show ? (
        <BookMedicine
          id={viewMedicine._id}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      ) : (
        ""
      )}
      {viewMedicine != new Object() && viewDetails ? (
        <Detail
          open={viewDetails}
          medicine={viewMedicine}
          handleClose={handleDetailsClose}
          handleOpen={handleDetailsShow}
        />
      ) : (
        ""
      )}
      {viewMedicine != new Object() && viewDelete ? (
        <DeleteMedicine
          open={viewDelete}
          id={viewMedicine._id}
          handleClose={handleDeleteClose}
          handleOpen={handleDeleteShow}
        />
      ) : (
        ""
      )}
      
    </div>
  
  );
      
};
export default Medicines;

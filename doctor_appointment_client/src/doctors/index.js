import { DoctorContext } from "./context";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../user/context";
import { useHistory } from "react-router";
import Detail from "./detailsView";
import BookDoctor from "./BookModal";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button2 from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const DeleteDoctor = ({ id, open, handleClose }) => {
  const { deleteDoctor, refreshData } = useContext(DoctorContext);
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete doctor</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wanna delete this doctor?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await deleteDoctor(id);
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

const Doctors = () => {
  const { doctors } = useContext(DoctorContext);
  const [show, setShow] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const { is_admin } = useContext(UserContext);
  const handleDetailsClose = () => setViewDetails(false);
  const handleDetailsShow = () => setViewDetails(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [viewDoctor, setViewDoctor] = useState({});

  const [viewDelete, setViewDelete] = useState(false);
  const handleDeleteClose = () => setViewDelete(false);
  const handleDeleteShow = () => setViewDelete(true);

  const history = useHistory();
  return (
    <div>
      <h1>Patnered Pharmacy</h1>
      <Grid sx={{ flexGrow: 0}} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
      {doctors.map((doctor, i) => {
        if (!doctor.is_archived) {
          return (
            <Grid key={i} item>
            <Box sx={{ flexGrow: 1 }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    component="img"
                    alt="Pharmacy"
                    height="200"
                    image={doctor.img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bolder">Name:
                      {doctor.name}<br />
                    </Typography>
                    {/* <Typography variant="h7" color="text.primary" fontWeight="bold">
                      Details: {doctor.description}<br />
                      </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Designation:
                      {doctor.designation}<br />
                    </Typography> */}
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Phone no:
                      {doctor.phone}<br />
                    </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Email:
                      {doctor.email}<br />
                    </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Address:
                      {doctor.address}
                    </Typography>
                  </CardContent>
                  {is_admin ? (
                    <CardActions>
                    <Button onClick={() => {
                      history.push(
                        `${window.location.pathname}/${doctor._id}`
                        );
                      }}
                      >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setViewDoctor(doctor);
                        handleDeleteShow();
                      }}
                      >
                      Delete
                    </Button>
                  </CardActions>
                      ):(
                        <CardActions>
                    <Button onClick={() => {
                      setViewDoctor(doctor); handleShow();
                      }}
                      >
                      Order Medicine
                    </Button>
                    <Button 
                      onClick={() => {
                        setViewDoctor(doctor);
                        handleDetailsShow();
                      }}
                      >
                      View Details
                    </Button>
                  </CardActions>
                      )}
                </Card>
            </Box>
            </Grid>
          );
        }
      })}
      </Grid>
      </Grid>
      </Grid>

      {/* .card*/}

      {viewDoctor !== new Object() && show ? (
        <BookDoctor
          id={viewDoctor._id}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      ) : (
        ""
      )}
      {viewDoctor != new Object() && viewDetails ? (
        <Detail
          open={viewDetails}
          doctor={viewDoctor}
          handleClose={handleDetailsClose}
          handleOpen={handleDetailsShow}
        />
      ) : (
        ""
      )}
      {viewDoctor != new Object() && viewDelete ? (
        <DeleteDoctor
          open={viewDelete}
          id={viewDoctor._id}
          handleClose={handleDeleteClose}
          handleOpen={handleDeleteShow}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Doctors;

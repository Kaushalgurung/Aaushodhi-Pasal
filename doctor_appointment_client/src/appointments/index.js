import { useContext, useState } from "react";
import { AppointmentContext } from "./context";
import { Link } from "react-router-dom";
import { Table, Button, Toast, ToastContainer, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { prescriptionimages } from "../constants/api";

const ViewDoc=({appointment, open, onClose})=>{
  if(open == true){
    return(
      <Modal show={open} onHide={onClose}>
        <img src={prescriptionimages + `/${appointment.files[0]}`} alt="..."/>
      </Modal>
    )}else{
      return(
        <div></div>
      )
  }
}


const Appointments = () => {
  const {
    appointments,
    approveAppointment,
    deleteAppointment,
    completeAppointment,
    refreshData,
    //downloadFile,
  } = useContext(AppointmentContext);

  
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");
  const [openAppointment, setAppointmentImages] = useState(false);
  const [currAppointment, setCurrAppointment] = useState({})

  const handleDownload=(item)=>{
    setCurrAppointment(item);
    setAppointmentImages(true);
  }
  useEffect(()=>{
    refreshData();
  },[])
  if (appointments) {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Order-ID</th>
              <th>Patient's name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone </th>
              <th>Email</th>
              <th>Prescription</th>
              <th>Ordered Medicine From</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appnt, i) => {
              if (!appnt.is_archived) {
                return (
                  <tr key={i}>
                    <td>{appnt._id}</td>
                    <td>{appnt.name}</td>
                    <td>{appnt.age}</td>
                    <td>{appnt.gender}</td>
                    <td>{appnt.phone}</td>
                    <td>{appnt.email}</td>
                    <td><Button onClick={()=>{handleDownload(appnt)}}>View Prescription </Button></td>
                    <td>
                      <Button>
                      <Link to={`/doctors/${appnt.doctor_id}`} style={{color: 'black', textDecoration: "none", color: "inherit"}}>
                        View Pharmacy
                      </Link>
                      </Button>
                    </td>
                    {appnt.approved ? (
                      appnt.completed ? (
                        <>
                          <td>Completed</td>
                          <td>
                            <Button
                              onClick={async () => {
                                await deleteAppointment(appnt._id);
                                setToastMessage("Prescription deleted");
                                setToast(true);
                                refreshData();
                              }}
                            >
                              Delete
                            </Button>{" "}
                          </td>
                        </>
                      ) : (
                        <>
                          <td>Approved</td>
                          <td>
                            <Button
                              onClick={async () => {
                                await completeAppointment(appnt._id);
                                setToastMessage("Prescription completed");
                                setToast(true);
                                refreshData();
                              }}
                            >
                              Delivered
                            </Button>{" "}
                          </td>
                        </>
                      )
                    ) : (
                      <>
                        <td>Not Approved</td>
                        <td>
                          <Button
                            onClick={async () => {
                              await approveAppointment(appnt._id);
                              setToastMessage("Prescription Approved");
                              setToast(true);
                              refreshData();
                            }}
                          >
                            Approve
                          </Button>{" "}
                        </td>
                      </>
                    )}
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
        <ToastContainer className="p-3" position="buttom-end">
          <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg}>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>

        <ViewDoc appointment={currAppointment} open={openAppointment} onClose={()=>setAppointmentImages(!openAppointment)}/>
      </div>
    );
  } else {
    return <div>
      No medicine orders.
    </div>;
  }
};
export default Appointments;

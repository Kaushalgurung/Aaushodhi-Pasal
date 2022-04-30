import { useContext, useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { MedicineContext } from "../context";
const AddMedicine = () => {
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  const [toastBg, setToastBg] = useState("danger");
  const { addMedicine } = useContext(MedicineContext);
  const [values, setValues] = useState({
    medicine_code: "",
    medicine_name: "",
    img: "",
    use: "",
    sideeffect: "",
    dosage: "",
  });
  const resetValues = () => {
    setValues({
      medicine_code: "",
      medicine_name: "",
      img: "",
      use: "",
      sideeffect: "",
      dosage: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(values.catagories);
    const res = await addMedicine(values);
    console.log(res);
    if (res.success) {
      setToastHeader("Success");
      setToastMessage("Medicine Added!");
      setToastBg("success");
    } else {
      setToastHeader("Failed to add medicine!");
      setToastMessage(res.message.data.message);
      setToastBg("danger");
    }
    setToast(true);
  };
  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <Col xs lg="6">
              <Form.Group className="mb-3">
                <Form.Label>Medicine Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.medicine_code}
                  required
                  onChange={(e) => {
                    setValues({ ...values, medicine_code: e.target.value });
                  }}
                  placeholder="Medicine's code"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Medicine Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.medicine_name}
                  required
                  onChange={(e) => {
                    setValues({ ...values, medicine_name: e.target.value });
                  }}
                  placeholder="Medicines's name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Medicine Image (url):</Form.Label>
                <Form.Control
                  type="text"
                  value={values.img}
                  required
                  onChange={(e) => {
                    setValues({ ...values, img: e.target.value });
                  }}
                  placeholder="Medicine's image url"
                />
              </Form.Group>
              {/* <Form.Group className="mb-3">
                <Form.Label>Catagories:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.catagories}
                  required
                  onChange={(e) => {
                    setValues({ ...values, catagories: e.target.value });
                  }}
                  placeholder="example, example2, example3,..."
                /> */}
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Use:</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.use}
                    required
                    onChange={(e) => {
                      setValues({ ...values, use: e.target.value });
                    }}
                    placeholder="Medicine use"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Side-effect:</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.sideeffect}
                    required
                    onChange={(e) => {
                      setValues({ ...values, sideeffect: e.target.value });
                    }}
                    placeholder="Medicine use"
                  />
                </Form.Group>
              {/* </Form.Group> */}
              <Form.Group className="mb-3">
                <Form.Label>dosage:</Form.Label>
                <Form.Control
                  value={values.dosage}
                  min={1}
                  //max={}
                  required
                  onChange={(e) => {
                    setValues({ ...values, dosage: e.target.value });
                  }}
                  type="number"
                  placeholder="Price"
                />
              </Form.Group>
              <Button type="submit" variant="success" >
                Add Medicine
              </Button>{" "}
              <Button variant="outline-dark" onClick={resetValues}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg} >
            <Toast.Header>
              <strong className="me-auto">{toastHeader}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Container>
    </div>
  );
};
export default AddMedicine;

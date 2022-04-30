import { useState, useContext } from "react";

import {
  Form,
  FloatingLabel,
  FormGroup,
  Col,
  Row,
  Modal,
  Button,
  ToastContainer,
  Toast
} from "react-bootstrap";
import { OrderContext } from "../orders/context";
function OrderMedicine({ id, show, handleClose, handleShow }) {
  const { addOrder } = useContext(OrderContext);
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  const [toastBg, setToastBg] = useState("danger");
  const [values, setValues] = useState({
    name: "",
    gender: "Male",
    age: "",
    email: "",
    phone: "",
    problem_doc: null,
    medical_problem: "",
    product_id: id,
  });
  const clearValues = () => {
    setValues({
      name: "",
      gender: "Male",
      age: "",
      email: "",
      phone: "",
      problem_doc: null,
      medical_problem: "",
      product_id: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      setValues({ ...values, product_id: id });
    }
    const res = await addOrder(values);
    if (!res.error) {
      setToastHeader("Successly ordered product!");
      setToastMessage(res.message);
      setToastBg("success");
      setToast(true);
      clearValues();
      handleClose();
    }
    else {
      setToastHeader("Failed!");
      setToastMessage(res.message);
      setToastBg("danger");
    }
    setToast(true);
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill the form below to Order Medicine:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup className="mb-3" controlId="formBasic FullName">
              <Form.FloatingLabel>Full-Name:</Form.FloatingLabel>
              <Form.Control
                type="text"
                value={values.name}
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                }}
                placeholder="Enter full-name"
                style={{ width: "400px" }}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="formBasic Age">
              <Form.FloatingLabel>Age:</Form.FloatingLabel>
              <Form.Control
                type="number"
                value={values.age}
                onChange={(e) => {
                  setValues({ ...values, age: e.target.value });
                }}
                placeholder="Age"
                style={{ width: "100px" }}
              />
            </FormGroup>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Form.Label as="legend" column sm={5}>
                  Select gender:
                </Form.Label>
                <Col sm={10}>
                  <Form.Check
                    type="radio"
                    onClick={(e) => {
                      setValues({ ...values, gender: "Male" });
                    }}
                    label="Male"
                    name="genderRadio"
                    id="formVerticalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    onClick={(e) => {
                      setValues({ ...values, gender: "Female" });
                    }}
                    label="Female"
                    name="genderRadio"
                    id="formVerticalRadios2"
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={values.email}
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
                style={{ width: "400px" }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <FormGroup
              className="mb-3"
              controlId="formBasic Phone"
              style={{ width: "400px" }}
            >
              <Form.Label>Phone no:</Form.Label>
              <Form.Control
                value={values.phone}
                onChange={(e) => {
                  setValues({ ...values, phone: e.target.value });
                }}
                type="phone number"
                placeholder="Enter Phone-no:"
              />
            </FormGroup>

            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload legal document(citizenship/other)</Form.Label>
              <Form.Control type="file"
                onChange={(e) => {
                  setValues({ ...values, problem_doc: e.target.files[0] })
                }}
                multiple style={{ width: "400px" }} />
              <Form.Text className="text-muted">
                Legal document will be kept confidential.
              </Form.Text>
            </Form.Group>
            <FloatingLabel
              controlId="floatingTextarea"
              label="Your reason for buying this product."
            >
              <Form.Control
                value={values.medical_problem}
                onChange={(e) => {
                  setValues({ ...values, medical_problem: e.target.value });
                }}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: "100px", width: "400px" }}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} >
            Order Medicine
          </Button>
        </Modal.Footer>
        <ToastContainer className="p-3" position="top-end">
          <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg}>
            <Toast.Header>
              <strong className="me-auto">{toastHeader}</strong>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>
      </Modal>
    </>
  );
}
export default OrderMedicine;

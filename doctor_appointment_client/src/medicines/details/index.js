import { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, ToastContainer, Toast } from "react-bootstrap";
import { useParams } from "react-router";
import { MedicineContext } from "../context";
const DetailEdit = () => {
    const { getMedicineById } = useContext(MedicineContext);
    const { id } = useParams();
    const [details, setDetails] = useState({});
    useEffect(async () => {
        const res = await getMedicineById(id);
        setDetails(res);
        setValues(res);
    }, [])
    const { updateMedicine } = useContext(MedicineContext);

    const [showToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastHeader, setToastHeader] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [values, setValues] = useState({
        medicine_code: "",
        medicine_name: "",
        img: "",
        use: "",
        sideeffect: "",
        dosage: "",
    })
    const resetValues = () => {
        setValues({
            medicine_code: "",
            medicine_name: "",
            img: "",
            use: "",
            sideeffect: "",
            dosage: "",
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateMedicine(id, values);
        console.log(res);
        if (res.success) {
            setToastHeader("Success")
            setToastMessage("Medicine Updated!")
            setToastBg('success')
        } else {
            setToastHeader("Failed!")
            setToastMessage(res.message.data.message)
            setToastBg('danger')
        }
        setToast(true);
    }
    return (
        <div>
            <Container >
                <Form onSubmit={handleSubmit}>
                    <Row className="justify-content-md-center">
                        <Col xs lg="6">
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine Code: </Form.Label>
                                <Form.Control type="text"
                                    value={values.medicine_code}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, medicine_code: e.target.value });
                                    }}
                                    placeholder="Medicine's name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine Name: </Form.Label>
                                <Form.Control type="text"
                                    value={values.medicine_name}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, medicine_name: e.target.value });
                                    }}
                                    placeholder="sample" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine Image url: </Form.Label>
                                <Form.Control
                                    value={values.img}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, img: e.target.value });
                                    }}
                                    type="text" placeholder="Medicine Image url" />
                            </Form.Group>
                            {/* <Form.Group className="mb-3" >
                                <Form.Label>Medicine Catagories:</Form.Label>
                                <Form.Control type="text"
                                    value={values.catagories}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, catagories: e.target.value });
                                    }}
                                    placeholder="Medicine catagories" />
                            </Form.Group> */}

                            {//make it choose from options ?
                            }
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine Use: </Form.Label>
                                <Form.Control type="text"
                                    value={values.dosage}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, dosage: e.target.value });
                                    }}
                                    placeholder="Medicine's Use:" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine Side-effect: </Form.Label>
                                <Form.Control type="text"
                                    value={values.sideeffect}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, sideeffect: e.target.value });
                                    }}
                                    placeholder="Medicine's Use:" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Medicine's Dosage: </Form.Label>
                                <Form.Control
                                    value={values.price}
                                    onChange={(e) => {
                                        setValues({ ...values, dosage: e.target.value });
                                    }}
                                    placeholder="Medicine's Dosage:" />
                            </Form.Group>
                            <Button type="submit" variant="success"
                            >Update Medicine</Button>{'         '}
                            <Button variant="outline-dark" onClick={resetValues}>Reset</Button>{'         '}
                            {/* <Button link="/medicines">Back</Button> */}
                        </Col>
                    </Row>

                </Form>
                <ToastContainer className="p-3" position='top-end'>
                    <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg}>
                        <Toast.Header>
                            <strong className="me-auto">{toastHeader}</strong>
                        </Toast.Header>
                        <Toast.Body>{toastMessage}</Toast.Body>
                    </Toast>
                </ToastContainer>

            </Container>
        </div>
    )
}
export default DetailEdit;
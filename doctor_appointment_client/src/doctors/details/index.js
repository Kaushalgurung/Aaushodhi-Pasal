import { useContext, useEffect, useState } from "react";
import { Form,Button, Container, Row, Col, ToastContainer, Toast } from "react-bootstrap";
import { useParams } from "react-router";
import { DoctorContext } from "../context";
const DetailEdit = () => {
    const {getDoctorById} = useContext(DoctorContext);
    const {id} = useParams(); 
    const [details, setDetails] = useState({});
    useEffect(async()=>{
        const res = await getDoctorById(id);
        setDetails(res);
        setValues(res);
    },[])
    const {updateDoctor} = useContext(DoctorContext);

    const [showToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastHeader, setToastHeader] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [values, setValues] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        designation: '',
        description: ''
    })
    const resetValues = () => {
        setValues({
            name: '',
            phone: '',
            email: '',
            address: '',
            designation: '',
            description: ''
        });
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await updateDoctor(id, values);
        console.log(res);
        if(res.success){
            setToastHeader("Success")
            setToastMessage("Pharmacy Updated!")
            setToastBg('success')
        }else{
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
                                <Form.Label>Pharmacy Name</Form.Label>
                                <Form.Control type="text"
                                    value={values.name}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, name: e.target.value });
                                    }}
                                    placeholder="Pharmacy's name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email"
                                    value={values.email}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, email: e.target.value });
                                    }}
                                    placeholder="name@example.com" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control
                                    value={values.phone}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, phone: e.target.value });
                                    }}
                                    type="number" placeholder="phone number" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Physical address</Form.Label>
                                <Form.Control type="text"
                                    value={values.address}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, address: e.target.value });
                                    }}
                                    placeholder="physical address" />
                            </Form.Group>

                            {//make it coose from options ?
                            }
                            <Form.Group className="mb-3" >
                                <Form.Label>Designation</Form.Label>
                                <Form.Control type="text"
                                    value={values.designation}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, designation: e.target.value });
                                    }}
                                    placeholder="Pharmacy's designation" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Pharmacy's description</Form.Label>
                                <Form.Control
                                    value={values.description}
                                    onChange={(e) => {
                                        setValues({ ...values, description: e.target.value });
                                    }}
                                    as="textarea" rows={3} />
                            </Form.Group>
                        <Button type ="submit" variant="success"
                        >Submit</Button>{' '}
                        <Button variant="outline-dark" onClick={resetValues}>Reset</Button>
                        </Col>
                    </Row>

                </Form>
            <ToastContainer className="p-3" position='top-end'>
                <Toast show={showToast} onClose={()=>setToast(false)} bg={toastBg}>
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
import { useContext, useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, ToastContainer, Toast } from "react-bootstrap";
import { useParams } from "react-router";
import { ProductContext } from "../context";
const DetailEdit = () => {
    const { getProductById } = useContext(ProductContext);
    const { id } = useParams();
    const [details, setDetails] = useState({});
    useEffect(async () => {
        const res = await getProductById(id);
        setDetails(res);
        setValues(res);
    }, [])
    const { updateProduct } = useContext(ProductContext);

    const [showToast, setToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastHeader, setToastHeader] = useState('');
    const [toastBg, setToastBg] = useState('danger');
    const [values, setValues] = useState({
        product_code: '',
        product_name: '',
        img: '',
        catagories: '',
        use: '',
        price: ''
    })
    const resetValues = () => {
        setValues({
            product_code: '',
            product_name: '',
            img: '',
            catagories: '',
            use: '',
            price: ''
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await updateProduct(id, values);
        console.log(res);
        if (res.success) {
            setToastHeader("Success")
            setToastMessage("Product Updated!")
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
                                <Form.Label>Product Code</Form.Label>
                                <Form.Control type="text"
                                    value={values.product_code}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, product_code: e.target.value });
                                    }}
                                    placeholder="Product's name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Product Name:</Form.Label>
                                <Form.Control type="text"
                                    value={values.product_name}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, product_name: e.target.value });
                                    }}
                                    placeholder="sample" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Product Image url:</Form.Label>
                                <Form.Control
                                    value={values.img}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, img: e.target.value });
                                    }}
                                    type="text" placeholder="Product Image url" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Product Catagories:</Form.Label>
                                <Form.Control type="text"
                                    value={values.catagories}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, catagories: e.target.value });
                                    }}
                                    placeholder="Product catagories" />
                            </Form.Group>

                            {//make it coose from options ?
                            }
                            <Form.Group className="mb-3" >
                                <Form.Label>Product Use:</Form.Label>
                                <Form.Control type="text"
                                    value={values.price}
                                    required
                                    onChange={(e) => {
                                        setValues({ ...values, price: e.target.value });
                                    }}
                                    placeholder="Product's Use:" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Product's Price</Form.Label>
                                <Form.Control
                                    value={values.price}
                                    onChange={(e) => {
                                        setValues({ ...values, price: e.target.value });
                                    }}
                                    placeholder="Product's Price:" />
                            </Form.Group>
                            <Button type="submit" variant="success"
                            >Update Product</Button>{'         '}
                            <Button variant="outline-dark" onClick={resetValues}>Reset</Button>{'         '}
                            {/* <Button link="/products">Back</Button> */}
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
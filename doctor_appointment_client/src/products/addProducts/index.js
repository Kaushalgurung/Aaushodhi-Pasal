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
import { ProductContext } from "../context";
const AddProduct = () => {
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  const [toastBg, setToastBg] = useState("danger");
  const { addProduct } = useContext(ProductContext);
  const [values, setValues] = useState({
    product_code: "",
    product_name: "",
    img: "",
    catagories: "",
    use: "",
    price: "",
  });
  const resetValues = () => {
    setValues({
      product_code: "",
      product_name: "",
      img: "",
      catagories: "",
      use: "",
      price: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log(values.catagories);
    const res = await addProduct(values);
    console.log(res);
    if (res.success) {
      setToastHeader("Success");
      setToastMessage("Product Added!");
      setToastBg("success");
    } else {
      setToastHeader("Failed to add product!");
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
                <Form.Label>Product Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.product_code}
                  required
                  onChange={(e) => {
                    setValues({ ...values, product_code: e.target.value });
                  }}
                  placeholder="Product's code"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.product_name}
                  required
                  onChange={(e) => {
                    setValues({ ...values, product_name: e.target.value });
                  }}
                  placeholder="Products's name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Product Image (url):</Form.Label>
                <Form.Control
                  type="text"
                  value={values.img}
                  required
                  onChange={(e) => {
                    setValues({ ...values, img: e.target.value });
                  }}
                  placeholder="Product's image url"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Catagories:</Form.Label>
                <Form.Control
                  type="text"
                  value={values.catagories}
                  required
                  onChange={(e) => {
                    setValues({ ...values, catagories: e.target.value });
                  }}
                  placeholder="example, example2, example3,..."
                />
                <Form.Group className="mb-3">
                  <Form.Label>Product Use:</Form.Label>
                  <Form.Control
                    type="text"
                    value={values.use}
                    required
                    onChange={(e) => {
                      setValues({ ...values, use: e.target.value });
                    }}
                    placeholder="Product use"
                  />
                </Form.Group>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price:</Form.Label>
                <Form.Control
                  value={values.price}
                  min={10}
                  //max={}
                  required
                  onChange={(e) => {
                    setValues({ ...values, price: e.target.value });
                  }}
                  type="number"
                  placeholder="Price"
                />
              </Form.Group>
              <Button type="submit" variant="success" >
                Add Product
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
export default AddProduct;

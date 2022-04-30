import { Card, ListGroupItem, ListGroup, Modal, Button} from "react-bootstrap"
const Detail = ({ open, product, handleClose }) => {
    return (
        <Modal show={open} onHide={handleClose}>
            <Card >
                <Card.Body>
                    <Card.Title>Product Code:{product.product_code}</Card.Title>
                    {/* <Card.Text>Product Name:{product.product_name}</Card.Text> */}
                    {/* <Card.Text>
                        Catagory: {product.catagories}
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Product Name: {product.product_name}</ListGroupItem>
                    <ListGroupItem>Catagory: {product.catagories}</ListGroupItem>
                    <ListGroupItem>Use: {product.use}</ListGroupItem>
                    <ListGroupItem>Price: {product.price}  </ListGroupItem>
                    </ListGroup>
                <Card.Body>
                    <Button>
                    <Card.Link onClick={handleClose}>Close</Card.Link>
                    </Button>
                </Card.Body>
            </Card>
        </Modal>
    )
}
export default Detail;
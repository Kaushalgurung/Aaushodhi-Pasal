import { Card, ListGroupItem, ListGroup, Modal, Button} from "react-bootstrap"
const Detail = ({ open, doctor, handleClose }) => {
    return (
        <Modal show={open} onHide={handleClose}>
            <Card >
                <Card.Body>
                    <Card.Title>Name:{doctor.name}</Card.Title>
                    <Card.Text>
                        Details: {doctor.description}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Address: {doctor.address}</ListGroupItem>
                    <ListGroupItem>Email  : {doctor.email}  </ListGroupItem>
                    <ListGroupItem>Phone : {doctor.phone} </ListGroupItem>
                    <ListGroupItem>Designation : {doctor.designation} </ListGroupItem>
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
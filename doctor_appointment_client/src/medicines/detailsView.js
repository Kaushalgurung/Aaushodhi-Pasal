import { Card, ListGroupItem, ListGroup, Modal, Button} from "react-bootstrap"
const Detail = ({ open, medicine, handleClose }) => {
    return (
        <Modal show={open} onHide={handleClose}>
            <Card >
                <Card.Body>
                    <Card.Title>Medicine Code:{medicine.medicine_code}</Card.Title>
                    {/* <Card.Text>Medicine Name:{medicine.medicine_name}</Card.Text> */}
                    {/* <Card.Text>
                        Catagory: {medicine.catagories}
                    </Card.Text> */}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Medicine Name: {medicine.medicine_name}</ListGroupItem>
                    <ListGroupItem>Use: {medicine.use}</ListGroupItem>
                    <ListGroupItem>Side-Effects: {medicine.sideeffect}</ListGroupItem>
                    <ListGroupItem>Dosage: {medicine.dosage}  </ListGroupItem>
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
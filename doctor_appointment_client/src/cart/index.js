import { useContext, useState } from "react";
import { CartContext } from "./context";
import { Link } from "react-router-dom";
import { Table, Button, Toast, ToastContainer } from "react-bootstrap";
const Carts = () => {
  const {
    carts,
    approveCart,
    deleteCart,
    completeCart,
    refreshData,
    downloadFile,
  } = useContext(CartContext);

  const handleDownload = async (id) => {
    await downloadFile(id);
  }
  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("success");

  if (carts.length > 0) {
    return (
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cart-ID</th>
              <th>Customer's name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone </th>
              <th>Email</th>
              <th>Legal document</th>
              <th>Carted Medicine</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {carts.map((cartlst, i) => {
              if (!cartlst.is_archived) {
                return (
                  <tr key={i}>
                    <td>{cartlst._id}</td>
                    <td>{cartlst.name}</td>
                    <td>{cartlst.age}</td>
                    <td>{cartlst.gender}</td>
                    <td>{cartlst.phone}</td>
                    <td>{cartlst.email}</td>
                    <td><Button onClick={() => { handleDownload(cartlst._id) }}>Download Cart </Button></td>
                    <td>
                      <Button>
                        <Link to={`/products/${cartlst.product_id}`} style={{ color: 'black', textDecoration: "none", color: "inherit" }}>
                          View Product
                        </Link>
                      </Button>
                    </td>
                    {cartlst.approved ? (
                      cartlst.completed ? (
                        <>
                          <td>Completed</td>
                          <td>
                            <Button
                              onClick={async () => {
                                await deleteCart(cartlst._id);
                                setToastMessage("Cart deleted");
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
                                await completeCart(cartlst._id);
                                setToastMessage("Cart completed");
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
                              await approveCart(cartlst._id);
                              setToastMessage("Cart Approved");
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
      </div>
    );
  } else {
    return <div> No carts</div>;
  }
};
export default Carts;

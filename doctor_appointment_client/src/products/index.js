import { ProductContext } from "./context";
import { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { UserContext } from "../user/context";
import { useHistory } from "react-router";
import Detail from "./detailsView";
import BookProduct from "./BookModal";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
//import Button2 from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const DeleteProduct = ({ id, open, handleClose }) => {
  const { deleteProduct, refreshData } = useContext(ProductContext);
  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wanna delete this product?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={async () => {
            await deleteProduct(id);
            refreshData();
            handleClose();
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const Products = () => {
  const { products } = useContext(ProductContext);
  const [show, setShow] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);
  const { is_admin } = useContext(UserContext);
  const handleDetailsClose = () => setViewDetails(false);
  const handleDetailsShow = () => setViewDetails(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [viewProduct, setViewProduct] = useState({});
  const [viewDelete, setViewDelete] = useState(false);
  const handleDeleteClose = () => setViewDelete(false);
  const handleDeleteShow = () => setViewDelete(true);

  const history = useHistory();
  return (
    <div>
      <h1>List of Product</h1>
      <Grid sx={{ flexGrow: 0}} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={5}>
      {products.map((product, i) => {
        if (!product.is_archived) {
          return (
            <Grid key={i} item>
            <Box sx={{ flexGrow: 1 }}>
                <Card sx={{ maxWidth: 400 }}>
                  <CardMedia
                    component="img"
                    alt="Product"
                    height="200"
                    image={product.img}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bolder">Product Code:
                      {product.product_code}<br />
                    </Typography>
                    {/* <Typography variant="h7" color="text.primary" fontWeight="bold">
                      Details: {product.description}<br />
                      </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Designation:
                      {product.designation}<br />
                    </Typography> */}
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Product's Name:
                      {product.product_name}<br />
                    </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Product's Use:
                      {product.use}<br />
                    </Typography>
                    <Typography variant="h7" color="text.primary" fontWeight="bold">Product's Price:
                      {product.price}
                    </Typography>
                  </CardContent>
                  {is_admin ? (
                    <CardActions>
                    <Button onClick={() => {
                      history.push(
                        `${window.location.pathname}/${product._id}`
                        );
                      }}
                      >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setViewProduct(product);
                        handleDeleteShow();
                      }}
                      >
                      Delete
                    </Button>
                  </CardActions>
                      ):(
                        <CardActions>
                    <Button onClick={() => {
                      setViewProduct(product); handleShow();
                      }}
                      >
                      Order Product
                    </Button>
                    <Button 
                      onClick={() => {
                        setViewProduct(product);
                        handleDetailsShow();
                      }}
                      >
                      Show Details
                    </Button>
                  </CardActions>
                      )}
                </Card>
            </Box>
            </Grid>
          );
        }
      })}
      </Grid>
      </Grid>
      </Grid>

      {/* .card*/}

      {viewProduct != new Object() && show ? (
        <BookProduct
          id={viewProduct._id}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
        />
      ) : (
        ""
      )}
      {viewProduct != new Object() && viewDetails ? (
        <Detail
          open={viewDetails}
          product={viewProduct}
          handleClose={handleDetailsClose}
          handleOpen={handleDetailsShow}
        />
      ) : (
        ""
      )}
      {viewProduct != new Object() && viewDelete ? (
        <DeleteProduct
          open={viewDelete}
          id={viewProduct._id}
          handleClose={handleDeleteClose}
          handleOpen={handleDeleteShow}
        />
      ) : (
        ""
      )}
    </div>
  );
};
export default Products;

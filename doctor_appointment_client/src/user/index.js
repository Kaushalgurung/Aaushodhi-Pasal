import { useContext, useState } from "react";
import {
  ToastContainer,
  Form,
  Button,
  Container,
  Toast,
} from "react-bootstrap";
import { UserContext } from "./context";
const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const { changePassword, logout } = useContext(UserContext);

  const [showToast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastHeader, setToastHeader] = useState("");
  const [toastBg, setToastBg] = useState("danger");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword === oldPassword) {
      setToastHeader("Failed!");
      setToastMessage("New password is same as new password");
      setToastBg("danger");
    } else {
      const res = await changePassword({ newPassword, oldPassword });
      if (!res.error) {
        setToastHeader("Success");
        setToastMessage("Password Changed");
        setToastBg("success");
        setToast(true);
        await logout();
        window.location.reload();
      } else {
        setToastHeader("Failed!");
        setToastMessage(res.message);
        setToastBg("danger");
      }
    }
    setToast(true);
  };
  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Previous Password</Form.Label>
          <Form.Control
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
            type="password"
            placeholder="Previous password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            type="password"
            placeholder="New password"
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <ToastContainer className="p-3" position="top-end">
        <Toast show={showToast} onClose={() => setToast(false)} bg={toastBg}>
          <Toast.Header>
            <strong className="me-auto">{toastHeader}</strong>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};
export default ChangePassword;

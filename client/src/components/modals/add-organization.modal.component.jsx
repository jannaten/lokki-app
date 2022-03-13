import { Modal, Form, Button } from "react-bootstrap";
import { useContext, useState } from "react";
import { DataContext } from "../../contexts";

function AddOrganizationModal({ setVisible, visible }) {
  const [name, setName] = useState("");
  const { addOrganization } = useContext(DataContext);

  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Add organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Organzation name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter organization name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            style={{ borderRadius: "0" }}
            onClick={async () => {
              await addOrganization({ name });
              setVisible(!visible);
              setName("");
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddOrganizationModal;

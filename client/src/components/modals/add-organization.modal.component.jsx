import { useContext, useState } from "react";
import { DataContext } from "../../contexts";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { FormControl, CustomButton, FormLabel } from "../";

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
          <Form.Group controlId="formBasicEmail">
            <Row>
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="name" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormControl
                  value={name}
                  placeholder="Enter organization name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          text="Add"
          className="me-2"
          onClick={async () => {
            await addOrganization({ name });
            setVisible(!visible);
            setName("");
          }}
        />
        <CustomButton
          isOutline
          text="Close"
          onClick={() => setVisible(!visible)}
        />
      </Modal.Footer>
    </Modal>
  );
}

export default AddOrganizationModal;

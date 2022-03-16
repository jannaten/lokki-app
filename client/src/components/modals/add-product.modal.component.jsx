import { CustomButton, FormSelect, FormLabel } from "../";
import { Col, Form, Modal, Row } from "react-bootstrap";

function AddProductModal({
  setSelectedProduct,
  selectedProduct,
  organization,
  setVisible,
  addProduct,
  products,
  visible,
}) {
  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>{organization.name}</Modal.Title>
      </Modal.Header>
      {products && (
        <Modal.Body>
          <Form.Group controlId="formBasicText">
            <Row>
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="name" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormSelect
                  queries={products}
                  onClick={(e) => setSelectedProduct(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Modal.Body>
      )}
      <Modal.Footer>
        <CustomButton
          text="Add"
          onClick={() => {
            addProduct(
              organization,
              selectedProduct === null ? products[0].id : selectedProduct
            );
            setSelectedProduct(null);
            setVisible(!visible);
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

export default AddProductModal;

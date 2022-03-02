import { Modal, Form, Button } from "react-bootstrap";

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
          <p>Add a product</p>
          <Form.Select
            aria-label="Default select example"
            onClick={(e) => setSelectedProduct(e.target.value)}
          >
            {products &&
              products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
          </Form.Select>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setVisible(!visible)}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addProduct(
              organization,
              selectedProduct === null ? products[0].id : selectedProduct
            );
            setSelectedProduct(null);
            setVisible(!visible);
          }}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;

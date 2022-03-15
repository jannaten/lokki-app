import { Modal, Form, Button } from "react-bootstrap";
import { useTheme } from "styled-components";

function AddProductModal({
  setSelectedProduct,
  selectedProduct,
  organization,
  setVisible,
  addProduct,
  products,
  visible,
}) {
  const theme = useTheme();
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
        <Button
          variant=""
          style={{
            borderRadius: "0",
            color: theme.basic.bright,
            backgroundColor: theme.primary,
          }}
          onClick={() => {
            addProduct(
              organization,
              selectedProduct === null ? products[0].id : selectedProduct
            );
            setSelectedProduct(null);
            setVisible(!visible);
          }}
        >
          Add
        </Button>
        <Button
          variant="outline-dark"
          style={{ borderRadius: "0" }}
          onClick={() => setVisible(!visible)}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;

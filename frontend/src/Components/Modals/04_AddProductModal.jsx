import React from "react";
import { connect } from "react-redux";
import { soProducts } from "../../redux/";
import { FormHeader } from "../Reusable-Components";
import { createStructuredSelector } from "reselect";
import { Modal, ModalBody, ModalFooter, Form } from "react-bootstrap";
import { SubmitButton, CancelButton, XButton } from "../Reusable-Components";

class AddProductModal extends React.Component {
  constructor() {
    super();
    this.productSelect = React.createRef();
  }

  render() {
    const {
      show,
      products,
      handleModal,
      handleSubmit,
      organization,
    } = this.props;
    return (
      <Modal
        centered
        size="lg"
        show={show}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-header"
      >
        <Modal.Header>
          <FormHeader
            children={`Add a Product for Organization: ${organization.name}`}
          />
          <XButton onClick={handleModal} />
        </Modal.Header>
        <ModalBody>
          <Form.Control as="select" ref={this.productSelect}>
            {products.map((sele) => {
              return (
                <option key={sele.id} value={sele.id} children={sele.name}>
                  {sele.name}
                </option>
              );
            })}
          </Form.Control>
        </ModalBody>
        <ModalFooter>
          <SubmitButton
            children="Add"
            onClick={() =>
              handleSubmit(
                organization.id,
                this.productSelect.current.value,
                this.productSelect.current.children
              )
            }
          />
          <CancelButton children="cancel" onClick={handleModal} />
        </ModalFooter>{" "}
      </Modal>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  products: soProducts,
});

export default connect(mapStateToProps)(AddProductModal);

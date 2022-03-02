import React from "react";
import { connect } from "react-redux";
import { addOrganization } from "../../redux";
import { createStructuredSelector } from "reselect";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { FormHeader, FormInput, errorToast } from "../Reusable-Components";
import { SubmitButton, CancelButton, XButton } from "../Reusable-Components";
import { handleAddOrganization, handleOrganizationChange } from "../../redux";
import { soCompanyProduct, soName } from "../../redux";
import { soShowAddOrganiationModal } from "../../redux";

const AddOrganizationModal = ({
  name,
  show,
  handleModal,
  handleChange,
  companyProduct,
  addOrganization,
}) => {
  const onSubmit = async (event) => {
    event.preventDefault();
    const setBool = companyProduct.some((el) => el.name === name.trim());
    if (!setBool) {
      await addOrganization(name.trim());
    } else {
      handleModal();
      errorToast(`${name.trim()} Organization already exist.`);
    }
  };

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
        <FormHeader children="Add a Organization" />
        <XButton onClick={handleModal} />
      </Modal.Header>
      <ModalBody>
        <div className="form-group row">
          <label className="col-12 col-sm-2 col-form-label">
            Organization Name:
          </label>
          <div className="col-sm-10">
            <FormInput
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Write your company name here (required)"
              required
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <SubmitButton children="Add" onClick={onSubmit} />
        <CancelButton children="cacel" onClick={handleModal} />
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  name: soName,
  companyProduct: soCompanyProduct,
  show: soShowAddOrganiationModal,
});

const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(handleAddOrganization()),
  addOrganization: (name) => dispatch(addOrganization(name)),
  handleChange: (event) => dispatch(handleOrganizationChange(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrganizationModal);

import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { ssShowAddTrasKeyModal } from "../../redux/";
import ModalHeader from "react-bootstrap/ModalHeader";
import { FormHeader, FormInput } from "../Reusable-Components/";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { handleChange, handleAddLocaleKeyModal } from "../../redux/";
import { SubmitButton, CancelButton, XButton } from "../Reusable-Components/";

const addModalTranslationModal = ({
  show,
  keyChange,
  handleModal,
  handleSubmit,
}) => (
  <Modal
    centered
    size="lg"
    show={show}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-header"
  >
    <ModalHeader>
      <FormHeader children="Key info : " />
      <XButton onClick={handleModal} />
    </ModalHeader>
    <ModalBody>
      <div className="form-group row">
        <label className="col-12 col-sm-2 col-form-label">Key:</label>
        <div className="col-sm-10">
          <FormInput
            type="text"
            name="localeKey"
            onChange={keyChange}
            placeholder="Give a localize Key (required)"
            required
          />
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <SubmitButton children="Create" onClick={handleSubmit} />
      <CancelButton children="close" onClick={handleModal} />
    </ModalFooter>
  </Modal>
);

const mapStateToProps = createStructuredSelector({
  show: ssShowAddTrasKeyModal,
});

const mapDispatchToProps = (dispatch) => ({
  keyChange: (event) => dispatch(handleChange(event)),
  handleModal: () => dispatch(handleAddLocaleKeyModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addModalTranslationModal);

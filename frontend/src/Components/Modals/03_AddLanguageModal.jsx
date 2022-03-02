import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import ModalHeader from "react-bootstrap/ModalHeader";
import { ssShowAddLanguageModal } from "../../redux/";
import { FormHeader, FormInput } from "../Reusable-Components/";
import { Modal, ModalBody, ModalFooter } from "react-bootstrap";
import { handleAddLanguageModal, handleChange } from "../../redux/";
import { SubmitButton, CancelButton, XButton } from "../Reusable-Components/";

const addNewLanguageModal = ({
  show,
  handleModal,
  handleChange,
  handleSubmit,
}) => (
  <Modal
    centered
    size="lg"
    role="dialog"
    aria-modal="true"
    show={show}
    aria-labelledby="modal-header"
  >
    <ModalHeader>
      <FormHeader children="Add a new language" />
      <XButton onClick={handleModal} />
    </ModalHeader>
    <ModalBody>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Language:
        </label>
        <div className="form-input">
          <FormInput
            type="text"
            id="username"
            name="language"
            onChange={handleChange}
            placeholder="Language name "
            autoFocus
          />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Abbreviation:</label>
        <div className="form-input">
          <FormInput
            type="text"
            name="abbreviation"
            onChange={handleChange}
            placeholder="Abbreviation of the language "
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
  show: ssShowAddLanguageModal,
});

const mapDispatchToProps = (dispatch) => ({
  handleModal: () => dispatch(handleAddLanguageModal()),
  handleChange: (event) => dispatch(handleChange(event)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addNewLanguageModal);

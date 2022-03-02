import React from "react";
import { Modal } from "react-bootstrap";
import { FormHeader, FormInput } from "../Reusable-Components/";
import { XButton, CancelButton, SubmitButton } from "../Reusable-Components/";

export default class EditLocalizedValueModal extends React.Component {
  render() {
    const {
      showModal,
      handleModal,
      translation,
      handleUpdate,
      localization,
      onlocalizationValueChange,
    } = this.props;

    return (
      <Modal
        size="lg"
        centered
        role="dialog"
        show={showModal}
        aria-modal="true"
        aria-labelledby="modal-header"
      >
        <Modal.Header>
          <FormHeader children="Edit key and value pair" />
          <XButton onClick={handleModal} />
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-12 col-sm-2 col-form-label">Key:</label>
            <div className="col-sm-10">
              <FormInput
                name="key"
                type="text"
                defaultValue={translation.key.key}
                disabled
              />
            </div>
          </div>
          <hr />
          {localization.map((locale) => (
            <div className="form-group row" key={locale.id}>
              <label className="col-3 col-sm-3 col-md-3 col-form-label">
                {locale.name} ({locale.locale})
              </label>
              <div className="col-sm-9 col-lg-9 col-md-9">
                <FormInput
                  type="text"
                  defaultValue={this.props.onLocaleValue(locale)}
                  onChange={(event) =>
                    onlocalizationValueChange(
                      event,
                      locale.locale,
                      locale.id,
                      this.props.onLocaleValueId(locale)
                    )
                  }
                />
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <SubmitButton children="Update" onClick={handleUpdate} />
          <CancelButton children="close" onClick={handleModal} />
        </Modal.Footer>
      </Modal>
    );
  }
}

import { useContext } from "react";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { FormControl, CustomButton, FormLabel } from "../";

function EditValuesModal({
  setEditedValueChangeList,
  editedValueChangeList,
  localizations,
  handleChange,
  locale_keys,
  setVisible,
  visible,
}) {
  const { editLocalizeValues } = useContext(DataLocaleContext);
  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Localization Values</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicText">
            <Row className="mb-3">
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="Key" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormControl defaultValue={locale_keys.key} disabled />
              </Col>
            </Row>
          </Form.Group>
          {localizations.map((localization) => (
            <Form.Group key={localization.id} controlId="formBasicText">
              <Row className="mb-3">
                <Col sm={12} md={3} lg={2}>
                  <FormLabel text={localization.locale} />
                </Col>
                <Col sm={12} md={9} lg={10}>
                  <FormControl
                    defaultValue={
                      locale_keys.locale_values[localization.locale]
                        ? locale_keys.locale_values[localization.locale].value
                        : ""
                    }
                    placeholder={`insert value for ${localization.name} language`}
                    onChange={(e) => {
                      handleChange({
                        value: e.target.value,
                        localeKeyId: locale_keys.id,
                        localizationId: localization.id,
                        id: locale_keys.locale_values[localization.locale]
                          ? locale_keys.locale_values[localization.locale].id
                          : null,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Form.Group>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          className="me-2"
          text="Save Changes"
          onClick={async () => {
            if (editedValueChangeList.length > 0)
              await editLocalizeValues(editedValueChangeList);
            setVisible(!visible);
            setEditedValueChangeList([]);
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

export default EditValuesModal;

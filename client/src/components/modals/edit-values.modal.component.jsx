import { useContext } from "react";
import { useTheme } from "styled-components";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

function EditValuesModal({
  setEditedValueChangeList,
  editedValueChangeList,
  localizations,
  handleChange,
  locale_keys,
  setVisible,
  visible,
}) {
  const theme = useTheme();
  const { editLocalizeValues } = useContext(DataLocaleContext);
  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Localization Values</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicText123">
            <Row>
              <Col sm={12} md={3} lg={2}>
                <Form.Label className="mt-2 me-4">Key</Form.Label>
              </Col>
              <Col sm={12} md={9} lg={10}>
                <Form.Control
                  defaultValue={locale_keys.key}
                  type="text"
                  disabled
                />
              </Col>
            </Row>
          </Form.Group>
          {localizations.map((localization) => (
            <Form.Group
              className="mb-3"
              key={localization.id}
              controlId="formBasicText"
            >
              <Row>
                <Col sm={12} md={3} lg={2}>
                  <Form.Label className="mt-2 me-4">
                    {localization.locale}
                  </Form.Label>
                </Col>
                <Col sm={12} md={9} lg={10}>
                  <Form.Control
                    type="text"
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
          <Button
            variant=""
            style={{
              borderRadius: "0",
              color: theme.basic.bright,
              backgroundColor: theme.primary,
            }}
            onClick={async () => {
              if (editedValueChangeList.length > 0)
                await editLocalizeValues(editedValueChangeList);
              setVisible(!visible);
              setEditedValueChangeList([]);
            }}
          >
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditValuesModal;

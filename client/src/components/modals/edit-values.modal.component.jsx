import { useContext, useState } from "react";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Button } from "react-bootstrap";

function EditValuesModal({ setVisible, visible, localizations, locale_keys }) {
  const [editedValueChangeList, setEditedValueChangeList] = useState([]);

  const { editLocalizeValues } = useContext(DataLocaleContext);

  const handleChange = (value) => {
    let copy = [...editedValueChangeList];
    if (!copy.some((el) => el.localizationId === value.localizationId)) {
      copy = [
        ...copy,
        {
          id: value.id ? value.id : null,
          localizationId: value.localizationId,
          localeKeyId: value.localeKeyId,
          value: value.value,
        },
      ];
      setEditedValueChangeList(copy);
      return;
    }
    if (copy.some((el) => el.localizationId === value.localizationId)) {
      copy.map((el) => {
        if (el.localizationId === value.localizationId) {
          el.value = value.value;
        }
        return el;
      });
      setEditedValueChangeList(copy);
    }
  };

  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Add organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {localizations.map((localization) => (
            <Form.Group
              key={localization.id}
              className="mb-3 d-flex"
              controlId="formBasicEmail"
            >
              <Form.Label>{localization.locale}</Form.Label>
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
                    // fromDefault: locale_keys.locale_values[localization.locale]
                    //   ? locale_keys.locale_values[localization.locale]
                    //       .fromDefault
                    //   : true,
                    id: locale_keys.locale_values[localization.locale]
                      ? locale_keys.locale_values[localization.locale].id
                      : null,
                  });
                }}
              />
            </Form.Group>
          ))}
          <Button
            variant="primary"
            onClick={async () => {
              if (editedValueChangeList.length > 0)
                await editLocalizeValues(editedValueChangeList);
              setVisible(!visible);
              setEditedValueChangeList([]);
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditValuesModal;

import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Button } from "react-bootstrap";

function AddLocaleKeyValuesModal({ localizations, setVisible, visible }) {
  const { orgId } = useParams();
  const [localeKey, setLocaleKey] = useState("");
  const [addLocaleValueChangeList, setAddLocaleValueChangeList] = useState([]);

  const { onAddlocaleKeyValues } = useContext(DataLocaleContext);

  const handleChange = (value) => {
    let copy = [...addLocaleValueChangeList];
    if (!copy.some((el) => el.localizationId === value.localizationId)) {
      copy = [
        ...copy,
        {
          localizationId: value.localizationId,
          value: value.value,
        },
      ];
      setAddLocaleValueChangeList(copy);
      return;
    }
    if (copy.some((el) => el.localizationId === value.localizationId)) {
      copy.map((el) => {
        if (el.localizationId === value.localizationId) {
          el.value = value.value;
        }
        return el;
      });
      setAddLocaleValueChangeList(copy);
    }
  };

  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Locale Key and Values</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
            <Form.Label>Locale Key</Form.Label>
            <Form.Control
              type="text"
              defaultValue={localeKey}
              placeholder="insert locale key"
              onChange={(e) => {
                setLocaleKey(e.target.value);
              }}
            />
          </Form.Group>
          {localizations.map((localization) => (
            <Form.Group
              key={localization.id}
              className="mb-3 d-flex"
              controlId="formBasicEmail"
            >
              <Form.Label>{localization.locale}</Form.Label>
              <Form.Control
                type="text"
                defaultValue=""
                disabled={localeKey.length < 1}
                placeholder={`insert value for ${localization.name} language`}
                onChange={(e) => {
                  handleChange({
                    value: e.target.value,
                    localizationId: localization.id,
                  });
                }}
              />
            </Form.Group>
          ))}
          <Button
            variant="primary"
            disabled={localeKey.length < 1}
            onClick={async () => {
              if (orgId === "1") {
                await onAddlocaleKeyValues({
                  valueList: addLocaleValueChangeList,
                  key: localeKey,
                });
              }
              setLocaleKey("");
              setVisible(!visible);
              setAddLocaleValueChangeList([]);
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddLocaleKeyValuesModal;

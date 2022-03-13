import { useContext, useState } from "react";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Button } from "react-bootstrap";

function AddLocalizationModal({ setVisible, visible, localizations }) {
  const [name, setName] = useState("");
  const [locale, setLocale] = useState("");
  const { addLocalization } = useContext(DataLocaleContext);

  return (
    <Modal show={visible} onHide={() => setVisible(!visible)}>
      <Modal.Header closeButton>
        <Modal.Title>Add Localization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter organization name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>locale</Form.Label>
            <Form.Control
              type="text"
              value={locale}
              placeholder="Enter organization name"
              onChange={(e) => setLocale(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="dark"
            style={{ borderRadius: "0" }}
            onClick={async () => {
              if (!localizations.find((el) => el.locale === locale)) {
                await addLocalization({ name, locale });
                setVisible(!visible);
                setName("");
                setLocale("");
              } else {
                alert(`${locale} locale already exist`);
              }
            }}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddLocalizationModal;

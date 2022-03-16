import { useContext, useState } from "react";
import { DataLocaleContext } from "../../contexts";
import { Modal, Form, Row, Col } from "react-bootstrap";
import { FormControl, FormLabel, CustomButton } from "../";

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
          <Form.Group className="mb-3" controlId="formBasicText">
            <Row className="mb-3">
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="name" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormControl
                  value={name}
                  placeholder="enter language name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="formBasicText">
            <Row>
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="locale" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormControl
                  value={locale}
                  placeholder="enter locale name"
                  onChange={(e) => setLocale(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <CustomButton
          className="me-2"
          text="Add"
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

export default AddLocalizationModal;

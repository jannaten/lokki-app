import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../../contexts";
import { FormControl, CustomButton, FormLabel } from "../";
import { Modal, Form, Row, Col } from "react-bootstrap";

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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col sm={12} md={3} lg={2}>
                <FormLabel text="key" />
              </Col>
              <Col sm={12} md={9} lg={10}>
                <FormControl
                  defaultValue={localeKey}
                  placeholder="insert locale key"
                  onChange={(e) => {
                    setLocaleKey(e.target.value);
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          {localizations.map((localization) => (
            <Form.Group
              key={localization.id}
              className="mb-3"
              controlId="formBasicEmail"
            >
              <Row>
                <Col sm={12} md={3} lg={2}>
                  <FormLabel text={localization.locale} />
                </Col>
                <Col sm={12} md={9} lg={10}>
                  <FormControl
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
                </Col>
              </Row>
            </Form.Group>
          ))}
        </Form>
        <Modal.Footer>
          <CustomButton
            className="me-2"
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
            text="Add"
          />
          <CustomButton
            isOutline
            text="Close"
            onClick={() => setVisible(!visible)}
          />
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
}

export default AddLocaleKeyValuesModal;

import { Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { DataLocaleContext, DataChildContext } from "../contexts";
import { OrganizationLocalizationSet, SideBar } from ".";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useWindowSize } from "../hooks";
import { Button } from "react-bootstrap";

const OrganizationLocalization = () => {
  const size = useWindowSize();
  const { orgId } = useParams();
  const [showEditedValue, setShowEditedValue] = useState(false);
  const [enableEditAllMode, setEnableEditAllMode] = useState(false);

  const { organization } = useContext(DataChildContext);
  const { onSortLocaleValue, localeKeysValues } = useContext(DataLocaleContext);
  const { localizations, defaultLocaleKeysValues } =
    useContext(DataLocaleContext);
  const { name } = organization;
  return (
    <Row className="w-100">
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={2}
        style={
          size.width > 575
            ? {
                width: "13vw",
                position: "fixed",
                marginTop: "3.5rem",
                zIndex: 6,
              }
            : { zIndex: 6 }
        }
      >
        <SideBar
          localizations={localizations}
          localeKeysValues={localeKeysValues}
        />
      </Col>
      <Col
        xs={12}
        sm={6}
        md={8}
        lg={10}
        style={{
          width: "87vw",
          marginTop: "5.5rem",
          marginLeft: "auto",
          paddingLeft: "2rem",
        }}
      >
        <h2>{name?.toUpperCase()} localization keys & values</h2>
        <InputGroup size="lg" className="mt-4">
          <FormControl
            aria-label="Large"
            style={{ borderRadius: "0" }}
            placeholder="Search by localization key or values"
            aria-describedby="inputGroup-sizing-sm"
          />
          <InputGroup.Text
            style={{
              color: "white",
              borderRadius: "0",
              backgroundColor: "#212529",
            }}
            id="inputGroup-sizing-lg"
          >
            Search
          </InputGroup.Text>
        </InputGroup>
        {orgId !== "1" && (
          <Button
            className="mt-3 me-3"
            style={{ borderRadius: "0" }}
            variant={!showEditedValue ? "dark" : "outline-dark"}
            onClick={() => {
              onSortLocaleValue(!showEditedValue);
              setShowEditedValue(!showEditedValue);
            }}
          >
            {!showEditedValue ? "Show Edited Values" : "Show All Values"}
          </Button>
        )}
        <Button
          className="mt-3"
          style={{ borderRadius: "0" }}
          variant={!enableEditAllMode ? "dark" : "outline-dark"}
          onClick={() => setEnableEditAllMode(!enableEditAllMode)}
        >
          {!enableEditAllMode
            ? "Enable Edit All Mode"
            : "Disable Edit All Mode"}
        </Button>
        <p className="h5 mt-4">{localeKeysValues.length} result has found</p>
        <Table hover style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>keys</th>
              {localizations && localizations.length > 0 && (
                <>
                  {localizations.map(({ id, locale }) => (
                    <th key={id} variant="outline-dark">
                      {locale}
                    </th>
                  ))}
                </>
              )}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {localeKeysValues.map((locale_keys) => {
              return (
                <OrganizationLocalizationSet
                  enableEditAllMode={enableEditAllMode}
                  localizations={localizations}
                  locale_keys={locale_keys}
                  key={locale_keys.id}
                  defaultLocaleKeys={defaultLocaleKeysValues.find(
                    (el) => el.id === locale_keys.id
                  )}
                />
              );
            })}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default OrganizationLocalization;

import { Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";
import { DataLocaleContext, DataChildContext } from "../contexts";
import { OrganizationLocalizationSet, SideBar } from ".";
import React, { useContext } from "react";
import { useWindowSize } from "../hooks";

const OrganizationLocalization = () => {
  const size = useWindowSize();
  const { organization } = useContext(DataChildContext);
  const { localizations, localeKeysValues, defaultLocaleKeysValues } =
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
        <InputGroup size="lg">
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
            {localeKeysValues.map((locale_keys) => (
              <OrganizationLocalizationSet
                localizations={localizations}
                locale_keys={locale_keys}
                key={locale_keys.id}
                defaultLocaleKeys={
                  defaultLocaleKeysValues
                    ? defaultLocaleKeysValues.find(
                        (el) => el.id === locale_keys.id
                      )
                    : []
                }
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default OrganizationLocalization;

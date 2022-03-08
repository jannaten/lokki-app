import { OrganizationLocalizationSet, SideBar } from ".";
import { Col, Row, Table } from "react-bootstrap";
import { DataLocaleContext } from "../contexts";
import React, { useContext } from "react";
import { useWindowSize } from "../hooks";

const OrganizationLocalization = () => {
  const {
    localizations,
    localeKeysValues,
    //  defaultLocaleKeysValues
  } = useContext(DataLocaleContext);
  const size = useWindowSize();
  return (
    <Row className="w-100 p-0 m-0">
      <Col
        xs={12}
        sm={6}
        md={4}
        lg={2}
        className="p-0"
        style={
          size.width > 575
            ? {
                position: "fixed",
                marginTop: "4rem",
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
        style={{ paddingLeft: "0.5rem", marginTop: "4rem", marginLeft: "auto" }}
      >
        <Table striped bordered hover>
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
              />
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default OrganizationLocalization;

import { Table } from "react-bootstrap";
import React, { useContext } from "react";
import { DataLocaleContext } from "../contexts";

const OrganizationLocalization = () => {
  const { localizations, localeKeysValues } = useContext(DataLocaleContext);
  return (
    <div>
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
          </tr>
        </thead>
        <tbody>
          {localeKeysValues.map((locale_keys) => (
            <tr key={locale_keys.id}>
              <td>{locale_keys.key}</td>
              {localizations.map((localization) => (
                <React.Fragment key={localization.id}>
                  <td>
                    {locale_keys.locale_values[localization.locale]
                      ? locale_keys.locale_values[localization.locale].value
                      : ""}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default OrganizationLocalization;

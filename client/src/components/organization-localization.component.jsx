import { OrganizationLocalizationSet } from ".";
import { DataLocaleContext } from "../contexts";
import React, { useContext } from "react";
import { Table } from "react-bootstrap";

const OrganizationLocalization = () => {
  const { localizations, localeKeysValues, defaultLocaleKeysValues } =
    useContext(DataLocaleContext);
  console.log(defaultLocaleKeysValues);
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
    </div>
  );
};

export default OrganizationLocalization;

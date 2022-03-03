import { Button } from "react-bootstrap";
import React, { useState } from "react";
import { EditValuesModal } from ".";

const OrganizationLocalizationSet = ({ locale_keys, localizations }) => {
  const [visible, setVisible] = useState(false);
  return (
    <tr>
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
      <td>
        <Button onClick={() => setVisible(!visible)}>Edit</Button>
      </td>
      <EditValuesModal
        visible={visible}
        setVisible={setVisible}
        locale_keys={locale_keys}
        localizations={localizations}
      />
    </tr>
  );
};

export default OrganizationLocalizationSet;

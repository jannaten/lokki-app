import { PencilFill } from "react-bootstrap-icons";
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
          <td
            onClick={() =>
              console.log(locale_keys.locale_values[localization.locale])
            }
          >
            {locale_keys.locale_values[localization.locale]
              ? locale_keys.locale_values[localization.locale].value
              : ""}
          </td>
        </React.Fragment>
      ))}
      <td>
        <Button
          style={{
            border: "none",
            borderRadius: "0",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          onClick={() => setVisible(!visible)}
          variant="dark"
        >
          <PencilFill className="me-2 mb-1" /> Edit
        </Button>
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

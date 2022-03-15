import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import React, { useState, useContext } from "react";
import { PencilFill } from "react-bootstrap-icons";
import { DataLocaleContext } from "../contexts";
import { Button, Form } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { EditValuesModal } from ".";

const OrganizationLocalizationSet = ({
  setEditedValueChangeList,
  editedValueChangeList,
  defaultLocaleKeys,
  enableEditAllMode,
  localizations,
  handleChange,
  locale_keys,
}) => {
  const theme = useTheme();
  const { orgId } = useParams();
  const [visible, setVisible] = useState(false);

  const { onRestoreLocaleValues } = useContext(DataLocaleContext);

  return (
    <tr>
      <td>{locale_keys.key}</td>
      {localizations.map((localization) => (
        <React.Fragment key={localization.id}>
          <td>
            {enableEditAllMode ? (
              <Form.Control
                type="text"
                defaultValue={
                  locale_keys.locale_values[localization.locale]
                    ? locale_keys.locale_values[localization.locale].value
                    : ""
                }
                onChange={(e) => {
                  handleChange({
                    value: e.target.value,
                    localeKeyId: locale_keys.id,
                    localizationId: localization.id,
                    id: locale_keys.locale_values[localization.locale]
                      ? locale_keys.locale_values[localization.locale].id
                      : null,
                  });
                }}
              />
            ) : (
              <>
                {locale_keys.locale_values[localization.locale]
                  ? locale_keys.locale_values[localization.locale].value
                  : ""}
                {locale_keys.locale_values[localization.locale] && (
                  <>
                    {orgId !== "1" &&
                    locale_keys.locale_values[localization.locale] &&
                    locale_keys.locale_values[localization.locale].id &&
                    !locale_keys.locale_values[localization.locale]
                      .fromDefault ? (
                      <OverlayTrigger
                        key="right"
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip id="button-tooltip">
                            Default value:{" "}
                            {typeof defaultLocaleKeys !== "undefined" &&
                              defaultLocaleKeys.locale_values[
                                localization.locale
                              ]?.value}
                          </Tooltip>
                        }
                      >
                        <Button
                          variant=""
                          style={{
                            border: "0",
                            borderRadius: "0",
                            marginLeft: "0.5rem",
                            color: theme.basic.bright,
                            backgroundColor: theme.secondary,
                          }}
                          onClick={() => {
                            onRestoreLocaleValues(
                              locale_keys.locale_values[localization.locale],
                              defaultLocaleKeys
                                ? defaultLocaleKeys.locale_values[
                                    localization.locale
                                  ]
                                : undefined,
                              localization
                            );
                          }}
                        >
                          Restore
                        </Button>
                      </OverlayTrigger>
                    ) : null}
                  </>
                )}
              </>
            )}
          </td>
        </React.Fragment>
      ))}
      <td
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant=""
          style={{
            border: "none",
            display: "flex",
            borderRadius: "0",
            flexDirection: "row",
            alignItems: "center",
            color: theme.basic.bright,
            justifyContent: "space-around",
            backgroundColor: theme.secondary,
          }}
          onClick={() => setVisible(!visible)}
        >
          <PencilFill className="me-2 mb-1" /> Edit
        </Button>
      </td>
      <EditValuesModal
        visible={visible}
        setVisible={setVisible}
        locale_keys={locale_keys}
        handleChange={handleChange}
        localizations={localizations}
        editedValueChangeList={editedValueChangeList}
        setEditedValueChangeList={setEditedValueChangeList}
      />
    </tr>
  );
};

export default OrganizationLocalizationSet;

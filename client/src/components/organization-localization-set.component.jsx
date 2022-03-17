import { EditValuesModal, OverlayRestoreButton, EditButton } from ".";
import React, { useState, useContext } from "react";
import { DataLocaleContext } from "../contexts";
import { useParams } from "react-router-dom";
import { FormControl } from ".";

const OrganizationLocalizationSet = ({
  setEditedValueChangeList,
  editedValueChangeList,
  defaultLocaleKeys,
  enableEditAllMode,
  localizations,
  handleChange,
  locale_keys,
}) => {
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
              <FormControl
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
                      <OverlayRestoreButton
                        text="Restore"
                        toolkit={
                          <>
                            Default value:{" "}
                            {typeof defaultLocaleKeys !== "undefined" &&
                              defaultLocaleKeys.locale_values[
                                localization.locale
                              ]?.value}
                          </>
                        }
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
                      />
                    ) : null}
                  </>
                )}
              </>
            )}
          </td>
        </React.Fragment>
      ))}
      <td className="float-end">
        <EditButton text="Edit" onClick={() => setVisible(!visible)} />
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

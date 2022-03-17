import { ToggleButton } from ".";
import { useWindowSize } from "../hooks";
import { useParams } from "react-router-dom";
import { Row, Table } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { DataLocaleContext, DataChildContext } from "../contexts";
import { OrganizationLocalizationSet, SideBar, InputGroups } from ".";
import { SideBarColHolderStyle, TableColHolderStyle } from "../styles";

const OrganizationLocalization = () => {
  const size = useWindowSize();
  const { orgId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditedValue, setShowEditedValue] = useState(false);
  const [enableEditAllMode, setEnableEditAllMode] = useState(false);
  const [editedValueChangeList, setEditedValueChangeList] = useState([]);

  const { organization } = useContext(DataChildContext);
  const { editLocalizeValues } = useContext(DataLocaleContext);
  const { onSortLocaleValue, localeKeysValues } = useContext(DataLocaleContext);
  const { localizations, defaultLocaleKeysValues } =
    useContext(DataLocaleContext);

  const { name } = organization;

  const handleChange = (value) => {
    let copy = [...editedValueChangeList];
    if (
      !copy.some(
        (el) =>
          el.localizationId === value.localizationId &&
          el.localeKeyId === value.localeKeyId
      )
    ) {
      copy = [
        ...copy,
        {
          id: value.id ? value.id : null,
          localizationId: value.localizationId,
          localeKeyId: value.localeKeyId,
          value: value.value,
        },
      ];
      setEditedValueChangeList(copy);
      return;
    }
    if (copy.some((el) => el.localizationId === value.localizationId)) {
      copy.map((el) => {
        if (
          el.localizationId === value.localizationId &&
          el.localeKeyId === value.localeKeyId
        ) {
          el.value = value.value;
        }
        return el;
      });
      setEditedValueChangeList(copy);
    }
  };

  let filteredLocaleKeyValues = [];
  filteredLocaleKeyValues = localeKeysValues.filter((el) => {
    if (el.key.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }
    for (let locale of Object.keys(el.locale_values)) {
      if (el.locale_values[locale] !== null) {
        if (!el.locale_values[locale].value) {
          continue;
        }
        if (
          el.locale_values[locale].value
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return true;
        }
      }
    }
    return false;
  });

  return (
    <Row className="w-100">
      <SideBarColHolderStyle xs={12} sm={6} md={4} lg={2} width={size.width}>
        <SideBar
          localizations={localizations}
          localeKeysValues={localeKeysValues}
        />
      </SideBarColHolderStyle>
      <TableColHolderStyle xs={12} sm={6} md={8} lg={10}>
        <h2>{name?.toUpperCase()} localization keys & values</h2>
        <InputGroups
          placeholder="Search by localization key or values"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {orgId !== "1" && (
          <ToggleButton
            toggleOff={showEditedValue}
            text={showEditedValue ? "Show All Values" : "Show Edited Values"}
            onClick={() => {
              onSortLocaleValue(!showEditedValue);
              setShowEditedValue(!showEditedValue);
            }}
          />
        )}
        <ToggleButton
          toggleOff={enableEditAllMode}
          onClick={async () => {
            if (editedValueChangeList.length > 0)
              await editLocalizeValues(editedValueChangeList);
            setEnableEditAllMode(!enableEditAllMode);
            setEditedValueChangeList([]);
          }}
          text={
            enableEditAllMode ? "Disable Edit All Mode" : "Enable Edit All Mode"
          }
        />
        <p className="h5 mt-4">
          {filteredLocaleKeyValues.length} result has found
        </p>
        <Table hover>
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
            {filteredLocaleKeyValues.map((locale_keys) => {
              return (
                <OrganizationLocalizationSet
                  setEditedValueChangeList={setEditedValueChangeList}
                  editedValueChangeList={editedValueChangeList}
                  enableEditAllMode={enableEditAllMode}
                  localizations={localizations}
                  handleChange={handleChange}
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
      </TableColHolderStyle>
    </Row>
  );
};

export default OrganizationLocalization;
// Works as well
// let filteredLocaleKeyValues = [];
// filteredLocaleKeyValues = localeKeysValues.filter((el) => {
//   if (el.key.toLowerCase().includes(searchQuery.toLowerCase())) {
//     return true;
//   }
//   for (let i = 0; i < localizations.length; i++) {
//     const locale = localizations[i].locale;
//     if (el.locale_values[locale] !== null) {
//       if (
//         el.locale_values[locale].value
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase())
//       ) {
//         return true;
//       }
//     }
//   }
//   return false;
// });

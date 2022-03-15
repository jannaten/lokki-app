import { Button } from "react-bootstrap";
import { useWindowSize } from "../hooks";
import { useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { OrganizationLocalizationSet, SideBar } from ".";
import { DataLocaleContext, DataChildContext } from "../contexts";
import { Col, FormControl, InputGroup, Row, Table } from "react-bootstrap";

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
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Search by localization key or values"
            onChange={(e) => setSearchQuery(e.target.value)}
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
          onClick={async () => {
            if (editedValueChangeList.length > 0)
              await editLocalizeValues(editedValueChangeList);
            setEnableEditAllMode(!enableEditAllMode);
            setEditedValueChangeList([]);
          }}
        >
          {!enableEditAllMode
            ? "Enable Edit All Mode"
            : "Disable Edit All Mode"}
        </Button>
        <p className="h5 mt-4">
          {filteredLocaleKeyValues.length} result has found
        </p>
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
      </Col>
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

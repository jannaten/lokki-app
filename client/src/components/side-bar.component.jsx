import { Button } from "react-bootstrap";
import { useTheme } from "styled-components";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../contexts";
import { AddLocalizationModal, AddLocaleKeyValuesModal } from ".";

function SideBar() {
  const theme = useTheme();
  const { orgId } = useParams();
  const [addLocalizationModalVisible, setAddLocalizationModalVisible] =
    useState(false);
  const [addLocaleKeyValueModalVisible, setAddLocaleKeyValueModalVisible] =
    useState(false);
  const { selectedLocale, onHideLanguage } = useContext(DataLocaleContext);
  const { sidebarLocalizations, localizations } = useContext(DataLocaleContext);
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        backgroundColor: "#f8f9fa",
        border: "0.1rem solid #e9ecef",
        padding: "2rem 0.5rem 0rem 0.5rem",
      }}
    >
      {sidebarLocalizations.map((localization) => (
        <Button
          variant=""
          style={
            selectedLocale &&
            selectedLocale.some((el) => el === localization.locale)
              ? {
                  borderRadius: "0",
                  bakgroundColor: "none",
                  color: theme.secondary,
                  border: `0.1rem solid ${theme.secondary}`,
                }
              : {
                  borderRadius: "0",
                  color: theme.basic.bright,
                  backgroundColor: theme.secondary,
                }
          }
          onClick={() => onHideLanguage(localization)}
          key={localization.id}
          className="m-1"
        >
          {localization.locale}
        </Button>
      ))}
      <Button
        variant=""
        onClick={() =>
          setAddLocalizationModalVisible(!addLocalizationModalVisible)
        }
        style={{
          marginTop: "45vh",
          borderRadius: "0",
          color: theme.basic.bright,
          backgroundColor: theme.secondary,
        }}
      >
        Add Language
      </Button>
      <AddLocalizationModal
        localizations={sidebarLocalizations}
        visible={addLocalizationModalVisible}
        setVisible={setAddLocalizationModalVisible}
      />
      {orgId === "1" && (
        <>
          <Button
            variant=""
            onClick={() =>
              setAddLocaleKeyValueModalVisible(!addLocaleKeyValueModalVisible)
            }
            style={{
              marginTop: "1vh",
              borderRadius: "0",
              color: theme.basic.bright,
              backgroundColor: theme.secondary,
            }}
          >
            Add Key values
          </Button>
          <AddLocaleKeyValuesModal
            localizations={localizations}
            visible={addLocaleKeyValueModalVisible}
            setVisible={setAddLocaleKeyValueModalVisible}
          />
        </>
      )}
    </div>
  );
}

export default SideBar;

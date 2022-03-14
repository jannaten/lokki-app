import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../contexts";
import { AddLocalizationModal, AddLocaleKeyValuesModal } from ".";

function SideBar() {
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
          style={{ borderRadius: "0" }}
          onClick={() => onHideLanguage(localization)}
          key={localization.id}
          className="m-1"
          variant={
            selectedLocale &&
            selectedLocale.some((el) => el === localization.locale)
              ? "outline-dark"
              : "dark"
          }
        >
          {localization.locale}
        </Button>
      ))}
      <Button
        variant="dark"
        onClick={() =>
          setAddLocalizationModalVisible(!addLocalizationModalVisible)
        }
        style={{ marginTop: "45vh", borderRadius: "0" }}
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
            variant="dark"
            onClick={() =>
              setAddLocaleKeyValueModalVisible(!addLocaleKeyValueModalVisible)
            }
            style={{ marginTop: "1vh", borderRadius: "0" }}
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

import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../contexts";
import { ToggleButton, CustomButton } from "./";
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
        <ToggleButton
          className="m-1"
          key={localization.id}
          text={localization.locale}
          onClick={() => onHideLanguage(localization)}
          toggleOff={
            selectedLocale &&
            selectedLocale.some((el) => el === localization.locale)
          }
        />
      ))}
      <div style={{ marginTop: "45vh" }}>
        <CustomButton
          className="m-1"
          text="Add Language"
          onClick={() =>
            setAddLocalizationModalVisible(!addLocalizationModalVisible)
          }
        />
        <AddLocalizationModal
          localizations={sidebarLocalizations}
          visible={addLocalizationModalVisible}
          setVisible={setAddLocalizationModalVisible}
        />
        {orgId === "1" && (
          <>
            <CustomButton
              className="m-1"
              text="Add Key values"
              onClick={() =>
                setAddLocaleKeyValueModalVisible(!addLocaleKeyValueModalVisible)
              }
            />
            <AddLocaleKeyValuesModal
              localizations={localizations}
              visible={addLocaleKeyValueModalVisible}
              setVisible={setAddLocaleKeyValueModalVisible}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default SideBar;

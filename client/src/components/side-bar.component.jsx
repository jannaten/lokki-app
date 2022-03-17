import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { DataLocaleContext } from "../contexts";
import { ToggleButton, CustomButton } from "./";
import { AddLocalizationModal, AddLocaleKeyValuesModal } from ".";
import { SideBarHolderStyle, SideBarButtomButtonStyle } from "../styles";

function SideBar() {
  const { orgId } = useParams();
  const [addLocalizationModalVisible, setAddLocalizationModalVisible] =
    useState(false);
  const [addLocaleKeyValueModalVisible, setAddLocaleKeyValueModalVisible] =
    useState(false);
  const { selectedLocale, onHideLanguage } = useContext(DataLocaleContext);
  const { sidebarLocalizations, localizations } = useContext(DataLocaleContext);
  return (
    <SideBarHolderStyle>
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
      <SideBarButtomButtonStyle>
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
      </SideBarButtomButtonStyle>
    </SideBarHolderStyle>
  );
}

export default SideBar;

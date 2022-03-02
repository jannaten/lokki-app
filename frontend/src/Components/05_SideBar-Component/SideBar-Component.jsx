import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { BACKEND_URL_SPRING_ } from "../../constant";
import { ssShowAddLanguageModal } from "../../redux/";
import { SquareButton } from "../Reusable-Components/";
import { SideBarContainer } from "../Reusable-Components/";
import { SideBarLocaleLabel } from "../Reusable-Components/";
import { ssLocaleKey, ssShowAddTrasKeyModal } from "../../redux/";
import { SideBarLocaleButtonHolder } from "../Reusable-Components/";
import { ToggleButton, errorToast } from "../Reusable-Components/";
import { SideBarSquareButtonHolder } from "../Reusable-Components/";
import { AddLanguageModal, AddTranslationModal } from "../Modals/";
import { setLocaleKey, handleAddLocaleKeyModal } from "../../redux/";
import { SideBarSquareButtonContainer } from "../Reusable-Components/";
import { SideBarToggleButtonContainer } from "../Reusable-Components/";
import { slvProParams, ssAbbreviation, ssLanguge } from "../../redux/";
import { successToast, BlankFieldButton } from "../Reusable-Components/";
import { handleAddLanguageModal, setLanguage, slvOrgPrams } from "../../redux/";

const SideBar = ({
  language,
  isShrink,
  orgParams,
  proParams,
  localeKey,
  setLanguage,
  setLocaleKey,
  abbreviation,
  localization,
  onBlankFeild,
  onLanguagehandle,
  onToggleLanguage,
  onTranslationRender,
  handleAddLanguageModal,
  handleAddLocaleKeyModal,
}) => {
  const handleLanguage = async (event) => {
    event.preventDefault();
    try {
      if (abbreviation !== "" && language !== "") {
        const response = await axios.post(
          `${BACKEND_URL_SPRING_}/localization?locale=${abbreviation}&name=${language}&organizationId=${orgParams}&productId=${proParams}`
        );
        await setLanguage();
        await onLanguagehandle();
        await handleAddLanguageModal();
        successToast(`${response.data.name} language has added`);
        return response;
      } else {
        errorToast("Language & abbreviation are required field");
      }
    } catch (error) {
      await setLanguage();
      console.error(error.message);
      errorToast(
        `${language} language is already exist with the same ${abbreviation} abbreviation`
      );
    }
  };

  const handleLocaleKey = (event) => {
    event.preventDefault();
    if (localeKey !== "") {
      axios
        .post(
          `${BACKEND_URL_SPRING_}/localization-key?key=${localeKey}&productId=${proParams}`
        )
        .then((respond) => {
          setLocaleKey();
          onTranslationRender();
          handleAddLocaleKeyModal();
          successToast(`${respond.data.key} key has added`);
        })
        .catch((err) => {
          setLocaleKey();
          handleAddLocaleKeyModal();
          console.error(err.message);
          errorToast("An Error Occured adding key");
        });
    } else {
      errorToast("Don't leave the key field emplty");
    }
  };

  return (
    <SideBarContainer isShrink={isShrink}>
      <SideBarLocaleButtonHolder>
        <SideBarLocaleLabel text="languages" isShrink={isShrink} />
        <SideBarToggleButtonContainer>
          {localization.map((local) => (
            <ToggleButton
              key={local.id}
              value={local.locale}
              onClick={() => {
                onToggleLanguage(local.locale);
              }}
            />
          ))}
        </SideBarToggleButtonContainer>
        <BlankFieldButton onClick={onBlankFeild} children="Only Blank Fields" />
      </SideBarLocaleButtonHolder>
      <SideBarSquareButtonContainer isShrink={isShrink}>
        {isShrink ? (
          <SideBarSquareButtonHolder>
            <SquareButton
              isShrink={isShrink}
              text="Add Translation"
              onClick={handleAddLocaleKeyModal}
            />
          </SideBarSquareButtonHolder>
        ) : (
          <SquareButton
            isShrink={isShrink}
            text="Add Translation"
            onClick={handleAddLocaleKeyModal}
          />
        )}
        <AddTranslationModal handleSubmit={handleLocaleKey} />
        <br />
        <SquareButton
          isShrink={isShrink}
          text="Add Language"
          onClick={handleAddLanguageModal}
        />
        <AddLanguageModal handleSubmit={handleLanguage} />
      </SideBarSquareButtonContainer>
    </SideBarContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  language: ssLanguge,
  orgParams: slvOrgPrams,
  proParams: slvProParams,
  localeKey: ssLocaleKey,
  abbreviation: ssAbbreviation,
  showAddTransKeyModal: ssShowAddTrasKeyModal,
  showAddLanguageModal: ssShowAddLanguageModal,
});

const mapDispatchToProps = (dispatch) => ({
  setLanguage: () => dispatch(setLanguage()),
  setLocaleKey: () => dispatch(setLocaleKey()),
  handleAddLanguageModal: () => dispatch(handleAddLanguageModal()),
  handleAddLocaleKeyModal: () => dispatch(handleAddLocaleKeyModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

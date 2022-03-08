import axios from "axios";
import { endPoints } from "../config";
import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const DataLocaleContext = createContext();

const DataLocaleContextProvider = ({ children }) => {
  const { orgId, proId } = useParams();
  const { getLocaleKeyValuePairByOrgIdProIdUrl } = endPoints;
  const { getLocalizationByOrgProUrl, editLocalizeValueUrl } = endPoints;

  const [localizations, setLocalizations] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState([]);
  const [localeKeysValues, setLocaleKeysValues] = useState([]);
  const [sidebarLocalizations, setSidebarLocalizations] = useState([]);
  const [defaultLocaleKeysValues, setDefaultLocaleKeysValues] = useState([]);

  useEffect(() => {
    getLocalizationByOrgPro();
    getLocaleKeysValuesByOrgIdProId();
    getDefalutLocaleKeysValuesByOrgIdProId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId, proId]);

  const getLocalizationByOrgPro = async () => {
    try {
      const { data } = await axios.get(
        getLocalizationByOrgProUrl(orgId, proId)
      );
      setLocalizations(data);
      setSidebarLocalizations(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getLocaleKeysValuesByOrgIdProId = async () => {
    try {
      const { data } = await axios.get(
        getLocaleKeyValuePairByOrgIdProIdUrl(orgId, proId)
      );
      setLocaleKeysValues(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getDefalutLocaleKeysValuesByOrgIdProId = async () => {
    if (Number(orgId) !== 1) {
      try {
        const { data } = await axios.get(
          getLocaleKeyValuePairByOrgIdProIdUrl(1, proId)
        );
        setDefaultLocaleKeysValues(data);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const editLocalizeValues = async (values) => {
    if (values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        try {
          const respond = await axios.put(editLocalizeValueUrl, values[i]);
          const { data } = respond;
          if (!data) return;
          const { locale } = localizations.find(
            (local) => local.id === data.localizationId
          );
          const modifiedLocalKeyValues = [...localeKeysValues].map((el) => {
            if (data.localeKeyId === el.id) {
              el.locale_values[locale] = data;
            }
            return el;
          });
          setLocaleKeysValues(modifiedLocalKeyValues);
        } catch (error) {
          console.error(error.message);
        }
      }
    }
  };

  const onHideLanguage = (localization) => {
    if (selectedLocale.some((el) => el === localization.locale)) {
      const removeLocale = [...selectedLocale].filter(
        (el) => el !== localization.locale
      );
      setSelectedLocale(removeLocale);
    } else {
      setSelectedLocale([...selectedLocale, localization.locale]);
    }
    const isLocalizationExist = localizations.some(
      (el) => el.id === localization.id
    );
    if (isLocalizationExist) {
      const nonHiddenLocalization = [...localizations].filter(
        (el) => el.id !== localization.id
      );
      setLocalizations(nonHiddenLocalization);
    } else {
      setLocalizations(
        [...localizations, localization].sort((a, b) => a.id - b.id)
      );
    }
  };

  return (
    <DataLocaleContext.Provider
      value={{
        defaultLocaleKeysValues,
        sidebarLocalizations,
        editLocalizeValues,
        localeKeysValues,
        selectedLocale,
        onHideLanguage,
        localizations,
      }}
    >
      {children}
    </DataLocaleContext.Provider>
  );
};

export default DataLocaleContextProvider;

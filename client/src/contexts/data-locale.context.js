import axios from "axios";
import { endPoints } from "../config";
import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const DataLocaleContext = createContext();

const DataLocaleContextProvider = ({ children }) => {
  const { orgId, proId } = useParams();
  const { getLocaleKeyValuePairByOrgIdProIdUrl } = endPoints;
  const { deleteLocalizeValueUrl, addLocalizationUrl } = endPoints;
  const { getLocalizationByOrgProUrl, editLocalizeValueUrl } = endPoints;

  const [localizations, setLocalizations] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState([]);
  const [localeKeysValues, setLocaleKeysValues] = useState([]);
  const [sidebarLocalizations, setSidebarLocalizations] = useState([]);
  const [defaultLocaleKeysValues, setDefaultLocaleKeysValues] = useState([]);

  useEffect(() => {
    getLocalizationByOrgPro();
    getLocaleKeysValuesByOrgIdProId();
    if (orgId !== "1") {
      getDefalutLocaleKeysValuesByOrgIdProId();
    }
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

  const onRestoreLocalevalue = async (
    locale_value,
    defaule_value,
    localization
  ) => {
    try {
      const { data } = await axios.delete(
        deleteLocalizeValueUrl(locale_value.id)
      );
      if (!data) return;
      const modifiedLocaleKeyValues = [...localeKeysValues].filter((el) => {
        if (el.id === locale_value.localeKeyId) {
          if (defaule_value) {
            el.locale_values[localization.locale] = {
              fromDefault: true,
              id: defaule_value.id,
              localeKeyId: defaule_value.localeKeyId,
              localizationId: defaule_value.localizationId,
              value: defaule_value.value,
            };
          } else {
            el.locale_values[localization.locale] = {};
          }
        }
        return el;
      });
      setLocaleKeysValues(modifiedLocaleKeyValues);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addLocalization = async (value) => {
    try {
      const { data } = await axios.post(addLocalizationUrl, {
        name: value.name,
        productId: proId,
        locale: value.locale,
        organizationId: orgId,
      });
      if (data) {
        const addedLocalization = [...localizations, data];
        const addedSidebarLocalization = [...sidebarLocalizations, data];
        setLocalizations(addedLocalization);
        setSidebarLocalizations(addedSidebarLocalization);
        const modifiedLocaleKeysValues = [...localeKeysValues].filter((el) => {
          el.locale_values[data.locale] = null;
          return el;
        });
        setLocaleKeysValues(modifiedLocaleKeysValues);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <DataLocaleContext.Provider
      value={{
        defaultLocaleKeysValues,
        sidebarLocalizations,
        onRestoreLocalevalue,
        editLocalizeValues,
        localeKeysValues,
        addLocalization,
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

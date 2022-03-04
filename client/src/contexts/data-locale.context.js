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
  const [localeKeysValues, setLocaleKeysValues] = useState([]);
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
      console.log(error.message);
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
        console.log(error.message);
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

  return (
    <DataLocaleContext.Provider
      value={{
        defaultLocaleKeysValues,
        editLocalizeValues,
        localeKeysValues,
        localizations,
      }}
    >
      {children}
    </DataLocaleContext.Provider>
  );
};

export default DataLocaleContextProvider;

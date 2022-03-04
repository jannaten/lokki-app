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

  useEffect(() => {
    getLocalizationByOrgPro();
    getLocaleKeysValuesByOrgIdProId();
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

  const editLocalizeValues = async (values) => {
    for (let i = 0; i < values.length; i++) {
      //   const respond = await axios.put(editLocalizeValueUrl, values[i]);
      //   console.log(respond.data);
      const data = values[i];
      const copyLocalization = [...localizations];
      const modifiedLocaleKeysValues = [...localeKeysValues];

      copyLocalization.map((localization) => {
        modifiedLocaleKeysValues.map((el) => {
          if (el.locale_values[localization.locale]) {
            if (el.locale_values[localization.locale].id === data.id) {
              el.locale_values[localization.locale].id = data.id;
              el.locale_values[localization.locale].value = data.value;
              el.locale_values[localization.locale].localizationId =
                data.localizationId;
              el.locale_values[localization.locale].localeKeyId =
                data.localeKeyId;
            }
          }
          if (el.id === data.localeKeyId) {
            const locale = localization.locale;
            let obj = {};
            if (el.locale_values[locale] === null) {
              obj.id = data.id;
              obj.value = data.value;
              obj.localizationId = data.localizationId;
              obj.localeKeyId = data.localeKeyId;
              el.locale_values[locale] = obj;
            }
          }
          return el;
        });
        return localization;
      });
      // console.log(modifiedLocaleKeysValues);
    }
  };

  return (
    <DataLocaleContext.Provider
      value={{
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

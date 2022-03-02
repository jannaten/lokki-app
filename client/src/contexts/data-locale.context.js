import axios from "axios";
import { endPoints } from "../config";
import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const DataLocaleContext = createContext();

const DataLocaleContextProvider = ({ children }) => {
  const { orgId, proId } = useParams();
  const { getLocalizationByOrgProUrl } = endPoints;
  const { getLocaleKeyValuePairByOrgIdProIdUrl } = endPoints;

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

  return (
    <DataLocaleContext.Provider
      value={{
        localeKeysValues,
        localizations,
      }}
    >
      {children}
    </DataLocaleContext.Provider>
  );
};

export default DataLocaleContextProvider;

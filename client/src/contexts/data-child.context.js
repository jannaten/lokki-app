import axios from "axios";
import { endPoints } from "../config";
import { errorToast } from "../components";
import { useParams } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

export const DataChildContext = createContext();

const DataChildContextProvider = ({ children }) => {
  const { orgId } = useParams();
  const { getOrganizationByParamsUrl } = endPoints;

  const [organization, setOrganization] = useState({});

  useEffect(() => {
    if (orgId) {
      getOrganizationById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orgId]);

  const getOrganizationById = async () => {
    try {
      const { data } = await axios.get(getOrganizationByParamsUrl(orgId));
      setOrganization(data);
    } catch ({ response }) {
      errorToast(response?.data?.message);
      console.error(response?.data?.message);
    }
  };

  return (
    <DataChildContext.Provider
      value={{
        organization,
      }}
    >
      {children}
    </DataChildContext.Provider>
  );
};

export default DataChildContextProvider;

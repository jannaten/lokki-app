import axios from "axios";
import { endPoints } from "../config";
import { useTheme } from "styled-components";
import { successToast, errorToast } from "../components";
import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const theme = useTheme();
  const { addOrganizationUrl } = endPoints;
  const { getOrganizationsUrl, getProductsUrl, addProductUrl } = endPoints;

  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);

  const getOrganization = async () => {
    try {
      const { data } = await axios.get(getOrganizationsUrl);
      data && setOrganizations(data);
    } catch ({ response }) {
      errorToast(response?.data?.message);
      console.error(response?.data?.message);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(getProductsUrl);
      data && setProducts(data);
    } catch ({ response }) {
      errorToast(response?.data?.message);
      console.error(response?.data?.message);
    }
  };

  useEffect(() => {
    getOrganization();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = async (org, productId) => {
    try {
      const { data } = await axios.post(addProductUrl, {
        organizationId: org.id,
        productId,
      });
      let obj = {
        id: data.id,
        organizationId: data.organizationId,
        productId: data.productId,
        product: products.find((pro) => pro.id === Number(productId)),
      };
      const modifiedOrganization = [...organizations];
      modifiedOrganization.filter((el) => {
        if (el.id === org.id) {
          el.organization_products.push(obj);
        }
        return el;
      });
      successToast(`${obj.product} product added to ${org.name}`, theme);
      setOrganizations(modifiedOrganization);
    } catch ({ response }) {
      errorToast(response?.data?.message);
      console.error(response?.data?.message);
    }
  };

  const addOrganization = async (name) => {
    try {
      const { data } = await axios.post(addOrganizationUrl, name);
      data.organization_products = [];
      const addedOrganizations = [...organizations, data];
      successToast(`${data.name} organization added`, theme);
      setOrganizations(addedOrganizations);
    } catch ({ response }) {
      errorToast(response?.data?.message);
      console.error(response?.data?.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        setOrganizations,
        addOrganization,
        organizations,
        setProducts,
        addProduct,
        products,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

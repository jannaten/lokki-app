import axios from "axios";
import { endPoints } from "../config";
import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const { addOrganizationUrl, editLocalizeValueUrl } = endPoints;
  const { getOrganizationsUrl, getProductsUrl, addProductUrl } = endPoints;

  const [organizations, setOrganizations] = useState([]);
  const [products, setProducts] = useState([]);

  const getOrganization = async () => {
    try {
      const { data } = await axios.get(getOrganizationsUrl);
      data && setOrganizations(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getProducts = async () => {
    try {
      const { data } = await axios.get(getProductsUrl);
      data && setProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOrganization();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const editLocalizeValues = async (values) => {
    for (let i = 0; i < values.length; i++) {
      const respond = await axios.put(editLocalizeValueUrl, values[i]);
      console.log(respond.data);
    }
  };

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
      setOrganizations(modifiedOrganization);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addOrganization = async (name) => {
    try {
      const { data } = await axios.post(addOrganizationUrl, name);
      data.organization_products = [];
      const addedOrganizations = [...organizations, data];
      setOrganizations(addedOrganizations);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        editLocalizeValues,
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

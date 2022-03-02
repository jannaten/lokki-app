import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BACKEND_URL_SPRING_ } from "../../constant";
toast.configure();

export const getProductUrl = `${BACKEND_URL_SPRING_}/product`;

export const getOrganizationUrl = (name) =>
  `${BACKEND_URL_SPRING_}/organization?name=${name}`;

export const getCompanyValue = (action, state) => {
  let newObj = action.value;
  let getArray = state.companyProduct.map((comPro) => {
    if (comPro.id === action.comId) {
      let obj = {};
      let newArr = [...comPro.products];
      newArr.push(newObj);
      obj.id = comPro.id;
      obj.apiKey = comPro.apiKey;
      obj.name = comPro.name;
      obj.products = newArr;
      return obj;
    }
    return comPro;
  });
  return getArray;
};

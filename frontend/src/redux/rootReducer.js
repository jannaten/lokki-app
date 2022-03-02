import { combineReducers } from "redux";
import {
  sideBarReducer,
  organizationReducer,
  authorizedUserReducer,
  localizationValueReducer,
} from "./";

export default combineReducers({
  sideBar: sideBarReducer,
  organization: organizationReducer,
  authorizedUser: authorizedUserReducer,
  localizationValue: localizationValueReducer,
});

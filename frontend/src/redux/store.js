import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import thunkMiddleWare from "redux-thunk";

let middleware = [];

if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleWare, ...middleware)
);

export default store;

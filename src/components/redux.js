import { combineReducers } from "redux";

import { appReducer, entriesReducer } from "./reducer";

const rootReducer = combineReducers({
  app: appReducer,
  entries: entriesReducer
});

export default rootReducer;

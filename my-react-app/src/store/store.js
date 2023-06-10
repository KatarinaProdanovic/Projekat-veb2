import { combineReducers, createStore } from "redux";

import { addUserReducer, addLoggedUserReducer, addIsLog } from "./user/reducers";
// glavna(inicijalna saga
const rootReducer = combineReducers({
  // svi reducer-i
  user: addUserReducer,
  loggedUser : addLoggedUserReducer,
  isLogg : addIsLog
  //
});
const store = createStore(rootReducer);
export default store;
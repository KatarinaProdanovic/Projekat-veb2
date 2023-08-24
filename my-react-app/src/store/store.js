import { combineReducers, createStore } from "redux";

import { addUserReducer, addLoggedUserReducer, addIsLog } from "./user/reducers";
import { addSellersReducer , addVerifReducer} from "./sellers/reducers";
import { addArticleReducer } from "./article/reducers";

// glavna(inicijalna saga
const rootReducer = combineReducers({
  // svi reducer-i
  user: addUserReducer,
  loggedUser : addLoggedUserReducer,
  isLogg : addIsLog,
  sellers: addSellersReducer,
  isVerif : addVerifReducer,
  articles: addArticleReducer
  //
});
const store = createStore(rootReducer);
export default store;
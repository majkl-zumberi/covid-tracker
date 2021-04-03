import { combineReducers } from "redux";
import covTotalsReducer from "./covTotals";
const rootReducer = combineReducers({
  covTotals: covTotalsReducer,
});
export default rootReducer;

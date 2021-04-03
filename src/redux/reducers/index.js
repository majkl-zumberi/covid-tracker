import { combineReducers } from "redux";
import covTotalsReducer from "./covTotals";
import globalCovReducer from "./globalCov";
const rootReducer = combineReducers({
  covTotals: covTotalsReducer,
  covGlobal: globalCovReducer,
});
export default rootReducer;

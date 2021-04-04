import { combineReducers } from "redux";
import { createSelector } from "reselect";
import covTotalsReducer from "./covTotals";
import globalCovReducer from "./globalCov";
const rootReducer = combineReducers({
  covTotals: covTotalsReducer,
  covGlobal: globalCovReducer,
});
export default rootReducer;

//selectors
export const selectCovGlobal = (state) => state.covGlobal;
export const selectCovTotals = (state) => state.covTotals;
export const selectCountries = (state) => state.covTotals.countries;

//descending
export const selectCountriesSortedByDeaths = createSelector(
  selectCountries,
  (countries) => countries.sort((a, b) => b.deaths - a.deaths)
);
//descending
export const selectCountriesSortedByCases = createSelector(
  selectCountries,
  (countries) => countries.sort((a, b) => b.cases - a.cases)
);

import { combineReducers } from "redux";
import { createSelector } from "reselect";
import coverageReducer from "./coverage";
import covTotalsReducer from "./covTotals";
import globalCovReducer from "./globalCov";
import globalCoverageReducer from "./globalCoverage";
const rootReducer = combineReducers({
  covTotals: covTotalsReducer,
  covGlobal: globalCovReducer,
  coverage: coverageReducer,
  globalCoverage: globalCoverageReducer,
});
export default rootReducer;

//selectors
export const selectCovGlobal = (state) => state.covGlobal;
export const selectCovTotals = (state) => state.covTotals;
export const selectCountries = (state) => state.covTotals.countries;
export const selectCoverage = (state) => state.coverage;
export const selectCoverageCountries = (state) =>
  state.coverage.coverageCountries;
export const selectGlobalCoverage = (state) => state.globalCoverage;
export const selectGlobalCoverageTimeline = (state) =>
  state.globalCoverage.timeline;

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

//groups all timeline administrated vaccine doses, descending
export const selectTotalCoverageGroupedByCountries = createSelector(
  selectCoverageCountries,
  selectCountries,
  (coverages, countries) => {
    // data exist
    if (Array.isArray(coverages)) {
      return coverages
        .map((coverage) => {
          const timelineArr = Object.entries(coverage.timeline);
          const country = countries.find(
            (country) => country.country == coverage.country
          );
          const countryInfo = country?.countryInfo ?? null;
          return {
            country: coverage.country,
            totalCountryCoverage: timelineArr.reduce(
              (tot, acc) => (tot += acc[1]),
              0
            ),
            countryInfo: countryInfo,
          };
        })
        .sort((a, b) => b.totalCountryCoverage - a.totalCountryCoverage);
    }
    return coverages;
  }
);

// sum all global timeline administrated vaccine doses
export const selectTotalGlobalCoverage = createSelector(
  selectGlobalCoverageTimeline,
  (timeline) => Object.entries(timeline).reduce((tot, acc) => tot + acc[1], 0)
);

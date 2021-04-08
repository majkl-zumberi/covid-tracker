import moment from "moment";
import { combineReducers } from "redux";
import { createSelector } from "reselect";
import coverageReducer from "./coverage";
import covTotalsReducer from "./covTotals";
import globalCovReducer from "./globalCov";
import globalCoverageReducer from "./globalCoverage";
import mobilityReducer from "./mobility";
moment.locale("it");
const rootReducer = combineReducers({
  covTotals: covTotalsReducer,
  covGlobal: globalCovReducer,
  coverage: coverageReducer,
  globalCoverage: globalCoverageReducer,
  mobility: mobilityReducer,
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

export const selectMobility = (state) => state.mobility;
export const selectMobilityCountries = (state) =>
  state.mobility.mobilityCountries;

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
    return coverages
      .map((coverage) => {
        const timelineArr = Object.entries(coverage.timeline);
        const country = countries.find(
          (country) => country.country == coverage.country
        );
        const countryInfo = country?.countryInfo ?? null;
        return {
          country: coverage.country,
          totalCountryCoverage: timelineArr[timelineArr.length - 1][1], // the total is provided in the last array value
          countryInfo: countryInfo,
        };
      })
      .sort((a, b) => b.totalCountryCoverage - a.totalCountryCoverage);
  }
);

// get total global timeline administrated vaccine doses by accessing last array value
export const selectTotalGlobalCoverage = createSelector(
  selectGlobalCoverageTimeline,
  (timeline) => {
    const timelineArr = Object.entries(timeline);
    return timelineArr.length > 0 ? timelineArr[timelineArr.length - 1][1] : 0;
  }
);

export const selectCoverageChart = createSelector(
  selectTotalGlobalCoverage,
  selectCoverageCountries,
  (totalGlobal, coverageCountries) => {
    moment.locale("it");
    return coverageCountries
      .map((country) => {
        const timelineArr = Object.entries(country.timeline);
        const total = timelineArr[timelineArr.length - 1][1];
        const timelineObj = timelineArr.map((time) => ({
          date: moment(time[0], "MM-DD-YY").format("DD/MM/YY"), // ex. from 3/27/21 to 27/3/2021
          [country.country]: time[1],
        }));
        return {
          ...country,
          total,
          totalPercentage: ((total / totalGlobal) * 100).toFixed(2),
          timeline: timelineObj.slice(
            timelineObj.length - 15,
            timelineObj.length
          ),
        };
      })
      .sort((a, b) => b.total - a.total);
  }
);

export const selectMobilityCountriesWithinFlag = createSelector(
  selectMobilityCountries,
  selectCountries,
  (mobilityCountries, flagCountries) => {
    return mobilityCountries.map((mobCountry) => {
      const country = flagCountries.find(
        (countryFlag) => countryFlag.country == mobCountry
      );
      const countryInfo = country?.countryInfo ?? null;
      return {
        country: mobCountry,
        countryInfo,
      };
    });
  }
);

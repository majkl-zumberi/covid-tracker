import axios from "axios";
export const fetchCovTotals = () => async (dispatch) => {
  dispatch({ type: "FETCH_COVTOTALS_REQUEST" });
  try {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/countries?sort=cases"
    );
    dispatch({ type: "FETCH_COVTOTALS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_COVTOTALS_FAILURE", error });
  }
};
export const fetchGlobalCov = () => async (dispatch) => {
  dispatch({ type: "FETCH_COVGLOBAL_REQUEST" });
  try {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/all?allowNull=false"
    );
    dispatch({ type: "FETCH_COVGLOBAL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_COVGLOBAL_FAILURE", error });
  }
};

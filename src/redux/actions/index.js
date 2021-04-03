import axios from "axios";
export const fetchCovTotals = () => {
  // eslint-disable-next-line no-unused-vars
  return async (dispatch, getState) => {
    const { data } = await axios.get(
      "https://disease.sh/v3/covid-19/countries?sort=cases"
    );
    console.log({ data });
    dispatch({
      type: "FETCH_COVTOTALS",
      payload: data,
    });
  };
};

const initialState = {
  countries: [],
  loading: false,
  error: null,
};
const covTotalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COVTOTALS_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COVTOTALS_SUCCESS":
      return {
        ...state,
        loading: false,
        countries: action.payload,
        error: null,
      };
    case "FETCH_COVTOTALS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        countries: [],
      };
    default:
      return state;
  }
};
export default covTotalsReducer;

const initialState = {
  coverageCountries: {},
  loading: false,
  error: null,
};
const coverageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COVERAGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COVERAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        coverageCountries: action.payload,
        error: null,
      };
    case "FETCH_COVERAGE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        coverageCountries: {},
      };
    default:
      return state;
  }
};
export default coverageReducer;

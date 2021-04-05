const initialState = {
  timeline: {},
  loading: false,
  error: null,
};
const globalCoverageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_GLOBALCOVERAGE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_GLOBALCOVERAGE_SUCCESS":
      return {
        ...state,
        loading: false,
        timeline: action.payload,
        error: null,
      };
    case "FETCH_GLOBALCOVERAGE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        timeline: {},
      };
    default:
      return state;
  }
};
export default globalCoverageReducer;

const initialState = {
  mobilityCountries: [],
  loading: false,
  error: null,
};
const mobilityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_MOBILITY_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_MOBILITY_SUCCESS":
      return {
        ...state,
        loading: false,
        mobilityCountries: action.payload,
        error: null,
      };
    case "FETCH_MOBILITY_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        mobilityCountries: [],
      };
    default:
      return state;
  }
};
export default mobilityReducer;

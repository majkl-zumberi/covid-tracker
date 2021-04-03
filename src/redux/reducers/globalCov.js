const initialState = {
  detail: {},
  loading: false,
  error: null,
};
const globalCovReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COVGLOBAL_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_COVGLOBAL_SUCCESS":
      return {
        ...state,
        loading: false,
        detail: action.payload,
        error: null,
      };
    case "FETCH_COVGLOBAL_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.error,
        detail: {},
      };
    default:
      return state;
  }
};
export default globalCovReducer;

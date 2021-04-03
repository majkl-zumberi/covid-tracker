const initialState = [];
const covTotalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COVTOTALS":
      return action.payload;
    default:
      return state;
  }
};
export default covTotalsReducer;

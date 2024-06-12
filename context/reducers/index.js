import cart from "./cartReducer";

const combineReducers = (slices) => (state, action) =>
  Object.keys(slices).reduce(
    (acc, prop) => ({
      ...acc,
      [prop]: slices[prop](acc[prop], action)
    }),
    state
  );

export const initialState = {
  cart: {
    items: {},
    collapsed: false
  }
};
export const rootReducer = combineReducers({
  cart
});

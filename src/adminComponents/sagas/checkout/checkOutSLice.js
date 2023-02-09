import { createSlice } from "@reduxjs/toolkit";

const checkOutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkoutCarts: [],
    orders: [],
  },
  reducers: {
    setCheckOutCart: (state, actions) => ({
      ...state,
      checkoutCarts: actions.payload,
    }),
    createOrder: () => {},
    addOrder: () => {},
  },
});

export const { setCheckOutCart, addOrder, createOrder } = checkOutSlice.actions;
export default checkOutSlice.reducer;

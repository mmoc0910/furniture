import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    listCart: [],
  },
  reducers: {
    createCart: () => {},
    getCarts: () => {},
    setCarts: (state, actions) => ({
      ...state,
      carts: actions.payload,
    }),
    updateCarts: () => {},
    addCart: () => {},
    getListCart: (state, actions) => ({
      ...state,
      listCart: actions.payload,
    }),
  },
});

export const {
  createCart,
  getCarts,
  setCarts,
  updateCarts,
  addCart,
  getListCart,
} = cartSlice.actions;
export default cartSlice.reducer;

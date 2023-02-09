import { createSlice } from "@reduxjs/toolkit";

const discountSlice = createSlice({
  name: "discount",
  initialState: {
    discount: {},
  },
  reducers: {
    setDiscount: (state, action) => ({
      ...state,
      discount: action.payload,
    }),
  },
});

export const { setDiscount } = discountSlice.actions;
export default discountSlice.reducer;

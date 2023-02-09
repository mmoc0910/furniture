import { createSlice } from "@reduxjs/toolkit";

const priviewIamgesSlice = createSlice({
  name: "priviewImages",
  initialState: {
    priviewImages: [],
  },
  reducers: {
    setPriviewImages: (state, action) => ({
      ...state,
      priviewImages: action.payload,
    }),
  },
});

export const { setPriviewImages } = priviewIamgesSlice.actions;
export default priviewIamgesSlice.reducer;

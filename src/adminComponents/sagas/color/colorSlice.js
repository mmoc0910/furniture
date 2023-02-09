import { createSlice } from "@reduxjs/toolkit";

const colorSlice = createSlice({
  name: "color",
  initialState: {
    colors: [],
    showInputAddColor: false,
  },
  reducers: {
    getColors: () => {},
    setColors: (state, actions) => ({
      ...state,
      colors: actions.payload,
    }),
    addColor: () => {},
    setShowInputAddColor: (state, actions) => ({
      ...state,
      showInputAddColor: actions.payload,
    }),
  },
});

export const { getColors, setColors, setShowInputAddColor, addColor } =
  colorSlice.actions;
export default colorSlice.reducer;

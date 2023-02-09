import { createSlice } from "@reduxjs/toolkit";

const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    showInputAddTag: false,
    errorMessage: "",
  },
  reducers: {
    getTag: () => {},
    setTag: (state, actions) => ({
      ...state,
      tags: actions.payload,
    }),
    addTag: () => {},
    updateTag: () => {},
    setShowInputAddTag: (state, actions) => ({
      ...state,
      showInputAddTag: actions.payload,
    }),
    setErrorMessage: (state, actions) => ({
      ...state,
      errorMessage: actions.payload,
    }),
  },
});

export const {
  getTag,
  setTag,
  setShowInputAddTag,
  setErrorMessage,
  addTag,
  updateTag,
} = tagSlice.actions;
export default tagSlice.reducer;

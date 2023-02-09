import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    errMessage: "",
    showInputAddCategory: false,
  },
  reducers: {
    getCategory: () => {},
    setCategory: (state, actions) => ({
      ...state,
      categories: actions.payload,
    }),
    setErrMessage: (state, actions) => ({
      ...state,
      errMessage: actions.payload,
    }),
    addCategory: () => {},
    setShowInputAddCategory: (state, actions) => ({
      ...state,
      showInputAddCategory: actions.payload,
    }),
    updateCategory: () => {},
  },
});

export const {
  getCategory,
  setCategory,
  setErrMessage,
  addCategory,
  setShowInputAddCategory,
  deleteCategory,
  updateCategory,
} = categorySlice.actions;
export default categorySlice.reducer;

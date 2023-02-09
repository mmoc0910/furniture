import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showModal: false,
  },
  reducers: {
    toogleShowModal: (state) => {
      return {
        ...state,
        showModal: !state.showModal,
      };
    },
  },
});
export const { toogleShowModal } = modalSlice.actions;
export default modalSlice.reducer;

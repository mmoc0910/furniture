import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    properties: {
      color: [],
    },
  },
  reducers: {
    setProperties: (state, action) => ({
      ...state,
      properties: {
        ...state.properties,
        [action.payload.propertyName]: action.payload.propertyValue,
      },
    }),
    setPropertiesColor: (state, action) => ({
      ...state,
      properties: {
        ...state.properties,
        color: action.payload,
      },
    }),
    updateProperties: (state, action) => ({
      ...state,
      properties: action.payload,
    }),
  },
});

export const { setProperties, setPropertiesColor, updateProperties } =
  propertySlice.actions;
export default propertySlice.reducer;

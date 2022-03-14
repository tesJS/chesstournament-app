import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  httpError: false,
  httpErrorMessage: "",
};

export const httpReducer = createSlice({
  name: "http",
  initialState,
  reducers: {
    displayError(state, action) {
      state.httpError = true;
      state.httpErrorMessage = action.payload + " !!!";
    },
    removeError(state) {
      state.httpError = false;
      state.httpErrorMessage = "No Errors !!!";
    },
  },
});

export const httpActions = httpReducer.actions;

export default httpReducer.reducer;

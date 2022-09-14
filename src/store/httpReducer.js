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
    displayUserError(state, action) {
      state.httpError = true;
      state.httpErrorMessage = ` User ${action.payload} does not exist in the database!!!`;
    },
    displayPasswordError(state) {
      state.httpError = true;
      state.httpErrorMessage = " Password does not match!!!";
    },
    removeError(state) {
      state.httpError = false;
      state.httpErrorMessage = "No System Errors !!!";
    },
    reset(state) {
      state.httpError = false;
      state.httpErrorMessage = "";
    },
  },
});

export const httpActions = httpReducer.actions;

export default httpReducer.reducer;

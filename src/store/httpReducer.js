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
      state.httpErrorMessage = ` ${action.payload??" "} does not exist in the user database!!!`;
    },
    displayPasswordError(state) {
      state.httpError = true;
      state.httpErrorMessage = " Password does not match!!!";
    },
    removeError(state) {
      state.httpError = false;
      state.httpErrorMessage = "Add players !!!";
    },
    reset(state) {
      state.httpError = false;
      state.httpErrorMessage = "";
    },
  },
});

export const httpActions = httpReducer.actions;

export default httpReducer.reducer;

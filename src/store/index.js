import { configureStore } from "@reduxjs/toolkit";
import httpReducer from "./httpReducer";
import tournamentReducer from "./tournamentReducer";

const store = configureStore({
  reducer: { http: httpReducer, tournament: tournamentReducer },
});

export default store;

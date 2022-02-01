import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import generatorReducer from "./generatorSlice";

const store = configureStore({
  reducer: {
    search: searchReducer,
    generator: generatorReducer,
  },
});

export default store;

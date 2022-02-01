import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: {
      input: "",
      CR: "",
      type: "any",
      page: 1,
    },
    selected: {},
  },
  reducers: {
    updateQuery: (state, { payload }) => {
      state.query = { ...state.query, ...payload };
    },
    updateSelected: (state, { payload }) => {
      state.selected = payload;
    },
  },
});

export const { updateQuery, updateSelected } = searchSlice.actions;
export default searchSlice.reducer;

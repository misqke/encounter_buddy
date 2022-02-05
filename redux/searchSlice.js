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
  },
  reducers: {
    updateQuery: (state, { payload }) => {
      state.query = { ...state.query, ...payload };
    },
  },
});

export const { updateQuery } = searchSlice.actions;
export default searchSlice.reducer;

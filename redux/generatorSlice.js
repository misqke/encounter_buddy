import { createSlice } from "@reduxjs/toolkit";

const generatorSlice = createSlice({
  name: "generator",
  initialState: {
    formData: {
      partySize: 1,
      partyLevel: 1,
      difficulty: "easy",
      numEnemies: "random",
      types: [],
    },
    summary: {},
    encounter: [],
  },
  reducers: {
    updateData: (state, { payload }) => {
      state.formData = { ...state.formData, ...payload };
    },
    updateEncounter: (state, { payload }) => {
      state.encounter = payload;
    },
    updateSummary: (state, { payload }) => {
      state.summary = payload;
    },
  },
});

export const { updateData, updateEncounter, updateSummary } =
  generatorSlice.actions;
export default generatorSlice.reducer;

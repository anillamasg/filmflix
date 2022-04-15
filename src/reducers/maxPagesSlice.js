import { createSlice } from "@reduxjs/toolkit";

const maxPagesSlice = createSlice({
  name: "maxPages",
  initialState: {
    value: 1,
  },
  reducers: {
    setMaxPages: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { setMaxPages } = maxPagesSlice.actions;
export default maxPagesSlice.reducer;

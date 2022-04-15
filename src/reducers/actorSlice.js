import { createSlice } from "@reduxjs/toolkit";

export const actorSlice = createSlice({
  name: "actor",
  initialState: {
    value: {},
  },
  reducers: {
    setActor: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setActor } = actorSlice.actions;
export default actorSlice.reducer;

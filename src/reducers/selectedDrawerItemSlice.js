import { createSlice } from "@reduxjs/toolkit";

const selectedDrawerItemSlice = createSlice({
  name: "selectedDrawerItem",
  initialState: {
    value: 0,
  },
  reducers: {
    setSelectedDrawerItem: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedDrawerItem } = selectedDrawerItemSlice.actions;
export default selectedDrawerItemSlice.reducer;

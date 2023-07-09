import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setSession: (state, action) => {
      state.value = action.payload;
    },
    deleteSession: (state) => {
      state.value = "";
    },
  },
});

export const { setSession, deleteSession } = userSlice.actions;
export default userSlice.reducer;

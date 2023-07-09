import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: [],
  reducers: {
    getTopics: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getTopics } = topicSlice.actions;
export default topicSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const forumSlice = createSlice({
  name: "forum",
  initialState: [],
  reducers: {
    getForumList: (state, action) => {
      return action.payload;
    },
    newForumList: (state, action) => {
      return [...state, action.payload];
    },
    deleteForum: (state, action) => {
      const forumId = action.payload;
      return state.filter((forum) => forum.id !== forumId);
    },
  },
});

export const { getForumList, newForumList, deleteForum } = forumSlice.actions;
export default forumSlice.reducer;

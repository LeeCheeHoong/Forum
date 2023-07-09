import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: { comment: [], editComment: [] },
  reducers: {
    getCommentList: (state, action) => {
      state.comment = action.payload;
    },
    newCommentList: (state, action) => {
      state.comment.push(action.payload);
    },
    deleteComment: (state, action) => {
      const commentId = action.payload;
      state.comment = state.comment.filter(
        (comment) => comment.id !== commentId
      );
    },
    editComment: (state, action) => {
      const { commentId, content } = action.payload;
      const commentIndex = state.comment.findIndex(
        (comment) => comment.id === commentId
      );
      if (commentIndex !== -1) {
        state.comment[commentIndex].content = content;
      }
    },
    newEdit: (state, action) => {
      state.editComment = action.payload;
    },
  },
});

export const {
  getCommentList,
  newCommentList,
  deleteComment,
  editComment,
  newEdit,
} = commentSlice.actions;
export default commentSlice.reducer;

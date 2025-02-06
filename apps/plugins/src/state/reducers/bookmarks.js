import { createSlice } from "@reduxjs/toolkit";

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState: {
        canvasIds: []
    },
    reducers: {
        addBookmark: (state, action) => {
            // console.log("addBookmark");
            const canvasId = action.payload.canvasId;
            if (!state.canvasIds.includes(canvasId)) {
                state.canvasIds.push(canvasId);
            }
        },
        removeBookmark: (state, action) => {
            // console.log("removeBookmark");
            const canvasId = action.payload.canvasId;
            state.canvasIds = state.canvasIds.filter(id => id !== canvasId);
        },
        setBookmarks: (state, action) => {
            // console.log("setBookmarks: ", action.payload);
            state.canvasIds = action.payload;
        }
    }
});

export const { addBookmark, removeBookmark, setBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
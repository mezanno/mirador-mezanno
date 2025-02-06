import { createSlice } from "@reduxjs/toolkit";

export const selectionSlice = createSlice({
    name: 'selection',
    initialState: {
        canvases: []
    },
    reducers: {
        setSelection: (state, action) => {
            state.canvases = action.payload;
        }
    }
});

export const { setSelection } = selectionSlice.actions;
export default selectionSlice.reducer;

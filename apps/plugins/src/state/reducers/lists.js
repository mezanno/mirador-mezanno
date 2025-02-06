import { createSlice } from "@reduxjs/toolkit";

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        values: []
    },
    reducers: {
        addList: (state, action) => {
            const newList = action.payload.newList;
            state.values.push(newList);
        },
        removeList: (state, action) => {
            const listId = action.payload.listId;
            state.values = state.values.filter(elt => elt.id !== listId);
        },
        updateList: (state, action) => {
            const updatedList = action.payload.updatedList;
            const list = state.values.find(elt => elt.id === updatedList.id);
            if (list) {
                list.name = updatedList.name;
            }
        },
        setLists: (state, action) => {
            state.values = action.payload;
        },
        addSelectionToList: (state, action) => {
            const selection = action.payload.selection;
            const listId = action.payload.listId;
            const list = state.values.find(elt => elt.id === listId);
            if (list) {
                if(!list.content) {
                    list.content = [];
                }
                list.content.push(...selection);
            }
        }
    }
});

export const { addList, removeList, updateList, setLists, addSelectionToList } = listsSlice.actions;
export default listsSlice.reducer;
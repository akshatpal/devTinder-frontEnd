import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({    
    name: "connection",
    initialState: null,
    reducers: {
        addConnection: (state, action) => {
            return action.payload;
        }
    }
});

export const { addConnection } = connection.actions;

export default connection.reducer;
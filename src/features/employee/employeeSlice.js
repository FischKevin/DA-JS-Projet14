import { createSlice } from '@reduxjs/toolkit';

// Define the employee slice with its initial state and reducers
export const employeeSlice = createSlice({
    name: 'employee', // Name of the slice, used in action types
    initialState: {
        employeesList: [], // Array to hold employee objects
        showDialog: false, // Boolean to manage dialog visibility
    },
    reducers: {
        // Reducer to add a new employee to the employeesList array
        addEmployee: (state, action) => {
            state.employeesList.push({
                id: Date.now(), // Generate a unique ID based on the current timestamp
                ...action.payload, // Spread the rest of the employee data from the action payload
            });
        },
        // Reducer to toggle dialog visibility
        toggleDialog: (state, action) => {
            if (action.payload !== undefined) {
                // If payload is provided, set showDialog to its value
                state.showDialog = action.payload;
            } else {
                // If no payload, toggle the current value of showDialog
                state.showDialog = !state.showDialog;
            }
        },
    },
});

export const { addEmployee, toggleDialog } = employeeSlice.actions;

export default employeeSlice.reducer;

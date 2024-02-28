import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeesList: [],
        showDialogl: false,
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employeesList.push({
                id: Date.now(),
                ...action.payload,
            });
        },
        toggleDialog: (state) => {
            state.showDialog = !state.showDialog;
        },
    },
});

export const { addEmployee, toggleDialog } = employeeSlice.actions;

export default employeeSlice.reducer;

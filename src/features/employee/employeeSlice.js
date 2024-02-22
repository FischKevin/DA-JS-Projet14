import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeeData: {},
        showModal: false,
    },
    reducers: {
        saveEmployeeData: (state, action) => {
            state.employeeData = action.payload;
        },
        toggleModal: (state) => {
            state.showModal = !state.showModal;
        },
    },
});

export const { saveEmployeeData, toggleModal } = employeeSlice.actions;

export default employeeSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employeesList: [],
        showModal: false,
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employeesList.push({
                id: Date.now(), // Ajouter un ID unique ici
                ...action.payload,
            });
        },
        toggleModal: (state) => {
            state.showModal = !state.showModal;
        },
    },
});

export const { addEmployee, toggleModal } = employeeSlice.actions;

export default employeeSlice.reducer;

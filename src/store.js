import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './features/employee/employeeSlice';

export const store = configureStore({
    reducer: {
        employee: employeeReducer,
    },
});

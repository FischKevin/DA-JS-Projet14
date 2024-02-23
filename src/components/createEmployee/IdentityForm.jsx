import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

function IdentityForm({ onDataChange }) {
  const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
  };

  const { employee, handleInputChange, handleDateChange } = useEmployeeForm(initialState);

  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: '350px', mx: "auto", width: '100%' }}>
        <form>
          <TextField
            label="First Name"
            name="firstName"
            value={employee.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            sx={{ 
              marginBottom: 3
          }}
          />
          <DatePicker
            label="Date of Birth"
            className='date-of-birth-picker'
            value={employee.dateOfBirth}
            onChange={(date) => handleDateChange('dateOfBirth', date)}
            textField={(params) => <TextField {...params} fullWidth />}
          />
          <DatePicker
            label="Start Date"
            className='start-date-picker'
            value={employee.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            textField={(params) => <TextField {...params} fullWidth />}
          />
        </form>
      </Box>
    </LocalizationProvider>
  );
}

IdentityForm.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default IdentityForm;

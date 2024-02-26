import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, FormHelperText } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function IdentityForm({ onDataChange, errors }) {
  const initialState = {
    firstName: '',
    lastName: '',
    startDate: null,
    department: '',
    dateOfBirth: null,
    street: '',
    city: '',
    state: '',
    zipCode: '',
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
            error={!!errors.firstName}
            helperText={errors.firstName || ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={employee.lastName}
            onChange={handleInputChange}
            error={!!errors.lastName}
            helperText={errors.lastName || ''}
            fullWidth
            margin="normal"
            sx={{ 
              marginBottom: 3
          }}
          />
          <DatePicker
            label="Date of Birth"
            className='date-of-birth-picker'
            value={employee.dateOfBirthDate}
            onChange={(date) => handleDateChange('birthDate', date)}
            slotProps={{
              textField: {
                error: !!errors.dateOfBirth,
                helperText: errors.dateOfBirth || '',
              },
            }}
          />
          <DatePicker
            label="Start Date"
            className='start-date-picker'
            value={employee.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            slotProps={{
              textField: {
                error: !!errors.startDate,
                helperText: errors.startDate || '',
              },
            }}
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

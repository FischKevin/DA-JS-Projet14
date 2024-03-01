import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Component for inputting and editing employee identity information
function IdentityForm({ onDataChange, errors }) {
  // Initial state for the form, covering all necessary identity fields
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

  // Custom hook invocation to manage form state and handle input changes
  const { employee, handleInputChange, handleDateChange } = useEmployeeForm(initialState);

  // Effect hook to communicate any changes in employee data to the parent component
  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

  return (
    // LocalizationProvider enables date handling with the specified adapter (Dayjs in this case)
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: '350px', mx: "auto", width: '100%' }}>
        <form>
          {/* Text fields for first name and last name with validation and error display */}
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
          {/* Date pickers for date of birth and start date, with error handling */}
          <DatePicker
            label="Date of Birth"
            className='date-of-birth-picker'
            value={employee.dateOfBirthDate}
            onChange={(date) => {handleDateChange('dateOfBirth', date);}}
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
  errors: PropTypes.object.isRequired,
};

export default IdentityForm;

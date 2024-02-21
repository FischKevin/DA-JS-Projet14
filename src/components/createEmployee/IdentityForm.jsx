import { TextField, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import useEmployeeForm from '../../hooks/useEmployeeForm';

function IdentityForm() {
  const initialState = {
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
  };

  const { employee, handleInputChange, handleDateChange } = useEmployeeForm(initialState);

  const styledTextField = (params) => (
    <TextField
      {...params}
      fullWidth
      margin="normal"
      sx={{ marginBottom: 3 }} // Appliquez votre style personnalisé ici
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 250, mx: "auto", width: '100%' }}>
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
              marginBottom: 1
          }}
          />
          <DatePicker
            label="Date of Birth"
            value={employee.dateOfBirth}
            onChange={(date) => handleDateChange('dateOfBirth', date)}
            slots={{ textField: styledTextField }}
          />
          <DatePicker
            label="Start Date"
            value={employee.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            textField={(params) => <TextField {...params} fullWidth margin='normal' sx={{ 
              marginBottom: 4
          }} />}
          />
        </form>
      </Box>
    </LocalizationProvider>
  );
}

export default IdentityForm;

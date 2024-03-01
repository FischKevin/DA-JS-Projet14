import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Select, FormControl, InputLabel, IconButton, MenuItem, FormHelperText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import { states } from '../../data/states';

// Define the AddressForm component with props for data handling and error display
function AddressForm({ onDataChange, errors}) {
  // Initial state for the form fields
  const initialState = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  // Destructuring methods from the custom hook to manage form state and handle changes
  const { employee, handleInputChange, handleZipChange  } = useEmployeeForm(initialState);

  // Effect to notify parent component of data changes
  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

  // Render the form
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 350, mx: "auto", width: '100%', marginTop: '20px' }}>
      <form>
          <fieldset style={{ border: '1px solid grey', padding: '0 20px 20px 20px', borderRadius: '5px' }}>
            <legend>Address</legend>
            {/* Input fields for street, city, and zip with validation and error handling */}
            <TextField
              label="Street"
              name="street"
              value={employee.street}
              onChange={handleInputChange}
              error={!!errors.street}
              helperText={errors.street || ''}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={employee.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city || ''}
              fullWidth
              margin="normal"
            />
            {/* Dropdown for state selection with dynamic options from states data */}
            <FormControl fullWidth margin="normal" error={!!errors.state}>
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state-select"
                value={employee.state}
                onChange={handleInputChange}
                name="state"
                label="State" // Ajoutez cette ligne
              >
                {states.map((state) => (
                  <MenuItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.state && <FormHelperText>{errors.state}</FormHelperText>}
            </FormControl>
            {/* Zip Code input field with increment and decrement buttons */}
            <TextField
              label="Zip Code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleInputChange}
              error={!!errors.zipCode}
              helperText={errors.zipCode || ''}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
              <Box>
                <IconButton onClick={() => handleZipChange(true)}>
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton onClick={() => handleZipChange(false)}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </Box>
                ),
              }}
            />
          </fieldset>
        </form>
      </Box>
    </LocalizationProvider>
  );
}

AddressForm.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AddressForm;

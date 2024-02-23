import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Box, Select, FormControl, InputLabel, IconButton, MenuItem } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useEmployeeForm from '../../hooks/useEmployeeForm';
import { states } from '../../data/states';

function AddressForm({ onDataChange }) {
  const initialState = {
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const { employee, handleInputChange, handleZipChange  } = useEmployeeForm(initialState);

  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 350, mx: "auto", width: '100%', marginTop: '20px' }}>
      <form>
          <fieldset style={{ border: '1px solid grey', padding: '0 20px 20px 20px', borderRadius: '5px' }}>
            <legend>Address</legend>
            <TextField
              label="Street"
              name="street"
              value={employee.street}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="City"
              name="city"
              value={employee.city}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-label">State</InputLabel>
              <Select
                labelId="state-label"
                id="state-select"
                value={employee.state}
                label="State"
                onChange={handleInputChange}
                name="state"
              >
              {states.map((state) => (
                <MenuItem key={state.abbreviation} value={state.abbreviation}>
                  {state.name}
                </MenuItem>
              ))}
              </Select>
            </FormControl>
            <TextField
              label="Zip Code"
              name="zipCode"
              value={employee.zipCode}
              onChange={handleInputChange}
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
};

export default AddressForm;

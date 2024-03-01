import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import useEmployeeForm from '../../hooks/useEmployeeForm';

// Functional component for selecting an employee's department
function DepartmentForm({ onDataChange, errors }) {
  // Initialize form state for the department field using a custom hook
  const { employee, handleInputChange } = useEmployeeForm({
    department: '', 
  });

  // Predefined list of departments
  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Resources",
    "Legal",
  ];

  // Effect hook to notify parent component of changes in the department field
  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

  // Render a dropdown list for department selection with validation error handling
  return (
    <FormControl 
      fullWidth
      margin="normal"
      sx={{ maxWidth: 350, mx: "auto", width: '100%', marginTop: '20px'}}
      error={!!errors.department}
      >
      <InputLabel id="department-label">Department</InputLabel>
      <Select
        labelId="department-label"
        id="department-select"
        value={employee.department}
        onChange={handleInputChange}
        name="department"
        label="Department"
      >
        {/* Dynamically generate menu items for each department */}
        {departments.map((department) => (
          <MenuItem key={department} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
      {/* Display error message if there is an error for the department field */}
      {!!errors.department && (
        <FormHelperText>{errors.department}</FormHelperText>
      )}
    </FormControl>
  );
}

DepartmentForm.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default DepartmentForm;

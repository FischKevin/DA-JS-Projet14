import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import useEmployeeForm from '../../hooks/useEmployeeForm';

function DepartmentForm({ onDataChange, errors }) {
  const { employee, handleInputChange } = useEmployeeForm({
    department: '', 
  });

  const departments = [
    "Sales",
    "Marketing",
    "Engineering",
    "Human Ressources",
    "Legal",
  ];

  useEffect(() => {
    onDataChange(employee);
  }, [employee, onDataChange]);

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
        {departments.map((department, index) => (
          <MenuItem key={index} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
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

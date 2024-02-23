import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useEmployeeForm from '../../hooks/useEmployeeForm';

function DepartmentForm({ onDataChange }) {
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
    <FormControl fullWidth margin="normal" sx={{ maxWidth: 350, mx: "auto", width: '100%', marginTop: '20px' }}>
      <InputLabel id="department-label">Department</InputLabel>
      <Select
        labelId="department-label"
        id="department-select"
        value={employee.department}
        label="Department"
        onChange={handleInputChange}
        name="department"
      >
        {departments.map((department, index) => (
          <MenuItem key={index} value={department}>
            {department}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

DepartmentForm.propTypes = {
  onDataChange: PropTypes.func.isRequired,
};

export default DepartmentForm;

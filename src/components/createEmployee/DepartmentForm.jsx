import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import useEmployeeForm from '../../hooks/useEmployeeForm';

function DepartmentForm() {
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

  return (
    <FormControl fullWidth margin="normal" sx={{ maxWidth: 250, mx: "auto", width: '100%', marginTop: '20px' }}>
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

export default DepartmentForm;

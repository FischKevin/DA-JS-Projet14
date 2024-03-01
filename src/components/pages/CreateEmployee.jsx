import { useState } from 'react';
import { Box } from '@mui/material';
import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDialog, addEmployee } from '../../features/employee/employeeSlice';
import Dialog from 'simplereactdialogcomponent';
import dayjs from 'dayjs';

function CreateEmployee() {
  // Initial state for form data and form errors
  const initialFormData = {
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

  // Redux hook to dispatch actions
  const dispatch = useDispatch();
  // Accessing Redux state to check if dialog should be shown
  const showDialog = useSelector((state) => state.employee.showDialog);
  // State hooks for form data, errors, and resetting form sections
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [resetKeyIdentity, setResetKeyIdentity] = useState(0);
  const [resetKeyAddress, setResetKeyAddress] = useState(0);
  const [resetKeyDepartment, setResetKeyDepartment] = useState(0);

  // Resets form data and increments keys to reset child components
  const handleReset = () => {
    setFormData(initialFormData);
    setResetKeyIdentity(prevKey => prevKey + 1);
    setResetKeyAddress(prevKey => prevKey + 1);
    setResetKeyDepartment(prevKey => prevKey + 1);
  };

  // Content for the dialog shown upon successful form submission
  const dialogContent = {
    title: 'Employee Created!',
    buttonText: 'Close',
  };
  
  // Closes dialog and resets form data
  const handleCloseDialog = () => {
    dispatch(toggleDialog(false)); 
    setFormData(initialFormData); 
  };

  // Updates form data with changes from child components
  const handleDataChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  // Handles form submission with validation and dispatches actions
  const handleSubmit = () => {
    let newErrors = {};
  
    // Validation logic
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.dateOfBirth || !dayjs(formData.dateOfBirth).isValid()) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.street) newErrors.street = 'Street is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
  
    // Set errors or proceed with form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); 
      return;
    }
  
    // Prepares payload and dispatches addEmployee action
    const payload = {
      ...formData,
      id: Date.now(),
      // Ensures dates are stored in ISO format
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
    };
  
    
    dispatch(addEmployee(payload));
    dispatch(toggleDialog(true)); // Opens dialog
    setFormData(initialFormData); // Resets form data
    setErrors({}); // Clears errors
  };
  
  // Component layout with form sections and submit button
  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm key={`identity-${resetKeyIdentity}`} onDataChange={handleDataChange} errors={errors} formData={formData} />
      <AddressForm key={`address-${resetKeyAddress}`} onDataChange={handleDataChange} errors={errors} formData={formData} />
      <DepartmentForm key={`department-${resetKeyDepartment}`} onDataChange={handleDataChange} errors={errors} formData={formData} />
      <Button onClick={handleSubmit} sx={{ margin: '0 auto', display: 'block' }}>Save</Button>
      {showDialog && <Dialog isOpen={showDialog} onClose={() => {handleCloseDialog(); handleReset();}}  content={dialogContent} />}
    </Box>
  )

}

export default CreateEmployee;
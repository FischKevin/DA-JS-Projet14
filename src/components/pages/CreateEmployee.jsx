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

  const dispatch = useDispatch();
  const showDialog = useSelector((state) => state.employee.showDialog);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  
  const [resetKeyIdentity, setResetKeyIdentity] = useState(0);
  const [resetKeyAddress, setResetKeyAddress] = useState(0);
  const [resetKeyDepartment, setResetKeyDepartment] = useState(0);

  const handleReset = () => {
    setFormData(initialFormData);
    setResetKeyIdentity(prevKey => prevKey + 1);
    setResetKeyAddress(prevKey => prevKey + 1);
    setResetKeyDepartment(prevKey => prevKey + 1);
  };

  const dialogContent = {
    title: 'Employee Created!',
    buttonText: 'Close',
  };
  
  const handleCloseDialog = () => {
    dispatch(toggleDialog(false)); // Fermer la modale
    setFormData(initialFormData); // Réinitialiser le formulaire après la fermeture de la modale
  };

  const handleDataChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const handleSubmit = () => {
    let newErrors = {};
  
    // Validation pour chaque champ requis
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
  
    // Vérifiez s'il y a des erreurs
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Mettre à jour l'état des erreurs avec les nouvelles erreurs
      return; // Empêcher la soumission si des erreurs sont détectées
    }
  
    // Préparation du payload si tous les champs sont valides
    const payload = {
      ...formData,
      id: Date.now(),
      dateOfBirth: formData.dateOfBirth ? formData.dateOfBirth.toISOString() : null,
      startDate: formData.startDate ? formData.startDate.toISOString() : null,
    };
  
    // Soumission du formulaire si aucune erreur
    dispatch(addEmployee(payload));
    dispatch(toggleDialog(true));
    setFormData(initialFormData); // Réinitialiser le formulaire
    setErrors({}); // Réinitialiser les erreurs après la soumission réussie
  };
  

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
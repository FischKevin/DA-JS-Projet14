import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../createEmployee/Header';
import IdentityForm from '../createEmployee/IdentityForm';
import AddressForm from '../createEmployee/AddressForm';
import DepartmentForm from '../createEmployee/DepartmentForm';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, addEmployee } from '../../features/employee/employeeSlice';
import Dialog from 'simplereactdialogcomponent';

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

function CreateEmployee() {
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.employee.showModal);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const dialogContent = {
    title: 'Employee Created!',
    buttonText: 'Close',
  };
  
  const handleCloseModal = () => {
    dispatch(toggleModal(false)); // Fermer la modale
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
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
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
    dispatch(toggleModal(true));
    setFormData(initialFormData); // Réinitialiser le formulaire
    setErrors({}); // Réinitialiser les erreurs après la soumission réussie
  };
  

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Header />
      <h2>Create Employee</h2>
      <IdentityForm onDataChange={handleDataChange} errors={errors} formData={formData} />
      <AddressForm onDataChange={handleDataChange} errors={errors} formData={formData} />
      <DepartmentForm onDataChange={handleDataChange} errors={errors} formData={formData} />
      <Button onClick={handleSubmit} sx={{ margin: '0 auto', display: 'block' }}>Save</Button>
      {showModal && <Dialog isOpen={showModal} onClose={handleCloseModal} content={dialogContent} />}
    </Box>
  )

}

export default CreateEmployee;
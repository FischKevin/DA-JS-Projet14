import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { addEmployee } from 'pathToYourReduxActions'; // Ajustez le chemin selon votre structure

const useEmployeeForm = (initialState) => {
  const [employee, setEmployee] = useState(initialState);
  // const [employee] = useState(initialState);
  // const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleDateChange = (name, value) => {
    setEmployee({ ...employee, [name]: value });
  };

  const handleZipChange = (increase) => {
    setEmployee(prevState => ({
      ...prevState,
      zipCode: increase 
        ? parseInt(prevState.zipCode || 0, 10) + 1 
        : Math.max(parseInt(prevState.zipCode || 0, 10) - 1, 0) // Empêche les valeurs négatives
    }));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault(); // Empêcher le rechargement de la page
  //   dispatch(addEmployee(employee));
  //   // Afficher le modal ici si nécessaire
  // };

  // return { employee, handleInputChange, handleDateChange, handleSubmit };
  return { employee, handleInputChange, handleDateChange, handleZipChange};
  // return { employee};
};

export default useEmployeeForm;

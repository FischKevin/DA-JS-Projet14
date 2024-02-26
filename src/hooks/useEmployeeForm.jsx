import { useState } from 'react';
// import { useDispatch } from 'react-redux';

const useEmployeeForm = (initialState) => {
  const [employee, setEmployee] = useState(initialState);
  // const [employee] = useState(initialState);
  // const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Restriction pour les champs firstName, lastName, et city pour n'accepter que des lettres
    if (["firstName", "lastName", "city"].includes(name) && !/^[A-Za-z]*$/.test(value)) return;
  
    // Restriction pour le champ zipCode pour n'accepter que des chiffres
    if (name === "zipCode" && !/^\d*$/.test(value)) return;

    // Restriction pour le champ street pour n'accepter que des lettres, des chiffres, des espaces, des tirets et des apostrophes
   if (name === "street" && !/^[A-Za-z0-9 \-']*$/.test(value)) return;
  
    // Mise à jour de l'état avec la nouvelle valeur
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


  // return { employee, handleInputChange, handleDateChange, handleSubmit };
  return { employee, handleInputChange, handleDateChange, handleZipChange};
  // return { employee};
};

export default useEmployeeForm;

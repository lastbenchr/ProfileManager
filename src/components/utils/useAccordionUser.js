import { useState, useCallback } from "react";

const useUserAccordion = (initialData) => {
  const [editedUser, setEditedUser] = useState({ ...initialData }); // shallow copy

  const handleInputChange = useCallback((field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  }, []);

  return {
    editedUser,
    handleInputChange,
  };
};

export default useUserAccordion;

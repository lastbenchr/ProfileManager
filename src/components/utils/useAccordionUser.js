import { useState } from "react";

const useUserAccordion = (initialData) => {
  const [editedUser, setEditedUser] = useState({ ...initialData }); // shallow copy

  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return {
    editedUser,
    handleInputChange,
  };
};

export default useUserAccordion;

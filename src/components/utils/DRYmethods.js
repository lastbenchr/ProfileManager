const calculateAge = (dob) => {
  const currentDate = new Date();
  const birthDate = new Date(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear();

  const currentMonth = currentDate.getMonth();
  const birthMonth = birthDate.getMonth();
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

export { calculateAge };

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

const calculateDob = (age) => {
  const currentDate = new Date();
  const birthYear = currentDate.getFullYear() - age;

  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const birthDate = new Date(birthYear, currentMonth, currentDay);

  return birthDate.toISOString().substr(0, 10); // Format as yyyy-mm-dd
};

export { calculateAge, calculateDob };

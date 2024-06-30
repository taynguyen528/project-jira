export const formatPhoneNumber = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");

  if (number.length === 10)
    return number.replace(/(\d{4})(\d{3})(\d{3})/, "$1.$2.$3");

  return number.replace(/(\d{5})(\d{3})(\d{3})/, "$1.$2.$3");
};

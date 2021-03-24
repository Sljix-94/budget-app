export const checkValidity = (value, validation) => {
  let isValid = true;
  if (validation.required) {
    isValid = value.trim() !== "" && isValid;
  }
  if (validation.minLength) {
    isValid = value.length >= validation.minLength && isValid;
  }
  if (validation.maxLength) {
    isValid = value.length <= validation.maxLength && isValid;
  }
  if (validation.repetCheck) {
    isValid = value.trim() === this.state.orderForm.password.value.trim();
  }
  if (validation.monkey) {
    isValid = value.includes(validation.monkey) && isValid;
  }
  if (validation.com) {
    isValid = value.includes(validation.com) && isValid;
  }
  return isValid;
};

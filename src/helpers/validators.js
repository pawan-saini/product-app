export function validateEmail(email) {
  const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
}

export const isBlank = (value) => (value ? false : true);
export const hasNumbers = (value) => (/[0-9]/.test(value) ? true : false);

export const hasAlphabets = (value) => (/[a-zA-Z]/.test(value) ? true : false);

export const hasSpecialCharacters = (value) =>
  /[`!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?~]/.test(value) ? true : false;

export function validatePAN(PAN) {
  if (PAN.length < 10 || PAN.length > 10) {
    return false;
  }
  if (!/[0-9]/.test(PAN) || !/[a-zA-Z]/.test(PAN)) {
    return false;
  }
  if (PAN.includes(" ")) {
    return false;
  }
  if (/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(PAN)) {
    return false;
  }
  if (PAN.charAt(3) === "P" || PAN.charAt(3) === "p") {
    return true;
  } else {
    return false;
  }
}

export const validatePassword = (value) =>
  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/.test(
    value
  )
    ? true
    : false;

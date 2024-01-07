// * Toast for Notification
import { toast } from "react-toastify";
// * Constants helpers
import { AUTH_TOKEN, CSRF_TOKEN } from "../constants/auth/index";
// * APIs

import jwt_decode from "jwt-decode";

// ** Auth Token Helpers
export const getToken = () => {
  let tokens = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  if (!tokens) {
    return null;
  }
  const decodedToken = jwt_decode(tokens.token);
  let currentDate = new Date();
  // JWT exp is in seconds
  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    return null;
  }
  return tokens.token;
};

export const setToken = (token) => {
  if (token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
};

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN);
};

// ** CSRF Token Helpers
export const setCSRFToken = (token) => {
  if (token) {
    localStorage.setItem(CSRF_TOKEN, token);
  }
};

export const getCSRFToken = () => {
  return localStorage.getItem(CSRF_TOKEN);
};

export const removeCSRFToken = () => {
  localStorage.removeItem(CSRF_TOKEN);
};

// * Function to validate the image
export const validateImage = (image) => {
  if (image) {
    if (
      image.type === "image/jpeg" ||
      image.type === "image/jpg" ||
      image.type === "image/png"
    ) {
      return true;
    } else {
      toast.error("Only jpeg, jpg, png formats are allowed", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
  }
};

// * Function to create the form data (Used in Add Course , Edit Course APIs)
export function multiPartData(data, type = "") {
  let multiPart = new FormData();
  for (let key in data) {
    if (type === "multiple" && key === "blogImage") {
      data[key].forEach((file) => {
        multiPart.append(key, file);
      });
    } else if (key !== "blogImage") {
      multiPart.append(key, data[key]);
    }
  }

  return multiPart;
}

// * Function to Format the data
// * 👇️👇️👇️ Format Date as yyyy-mm-dd hh:mm:ss
export function formatDate(date) {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
}

// 👇️ (Helper functions)
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }


  // helper.js

// Helper function to check if a specific permission exists in localStorage
export const hasPermission = (permission_name) => {
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
  return permissions.some(permission => permission.permission_name === permission_name);
};

export function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
    : Math.abs(Number(labelValue));
}

export function formatNumberWithCommas(number=0) {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
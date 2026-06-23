export const API_URL = "http://localhost:3000/api";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// UTC Date -> datetime-local format
export const formatDateTimeLocal = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  const offset = date.getTimezoneOffset();

  const localDate = new Date(date.getTime() - offset * 60000);

  return localDate.toISOString().slice(0, 16);
};

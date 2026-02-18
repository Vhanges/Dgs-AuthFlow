export const handleResponse = (response) => {
  if (response.data?.success === false) {
    throw new Error(response.data?.error || "Request failed");
  }
  return response.data;
};

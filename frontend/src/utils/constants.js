export const connectionSettings = {
  baseUrl: "http://localhost:4000",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};
export const authSettings = {
  baseUrl: "http://localhost:4000",
  headers: { "Content-Type": "application/json" },
};

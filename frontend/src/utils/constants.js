export const connectionSettings = {
  baseUrl: "api.starov.nomoreparties.co",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};
export const authSettings = {
  baseUrl: "api.starov.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
};

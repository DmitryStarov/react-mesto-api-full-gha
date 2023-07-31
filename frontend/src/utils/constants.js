export const connectionSettings = {
  baseUrl: "https://api.starov.nomoreparties.co",
  headers: {
    "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
};
export const authSettings = {
  baseUrl: "http://api.starov.nomoreparties.co",
  headers: { "Content-Type": "application/json" },
};

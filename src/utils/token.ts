const getAccesTokenLST = () => localStorage.getItem("accessToken") || "";
const clearAccesTokenLST = () => localStorage.removeItem("accessToken");
const setAccesTokenLST = (accessToken: string) =>
  localStorage.setItem("accessToken", accessToken);
export { getAccesTokenLST, clearAccesTokenLST, setAccesTokenLST };

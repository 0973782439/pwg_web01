// xử lý lưu , xoá access token 
const getAccesTokenLST = () => localStorage.getItem("accessToken") || "";
const clearAccesTokenLST = () => localStorage.removeItem("accessToken");
const setAccesTokenLST = (accessToken: string) =>
  localStorage.setItem("accessToken", accessToken);
// xử lý lưu info user login
const setInfoUserLocal = (user: any) =>
{
  var str_user = JSON.stringify(user);
  return localStorage.setItem("persistroot", str_user);
}
const getInfoUserLocal = () => localStorage.getItem("persistroot") || "";
const clearInfoUserLocal = () => localStorage.removeItem("persistroot");

  // export
export { getAccesTokenLST, clearAccesTokenLST, setAccesTokenLST, setInfoUserLocal, getInfoUserLocal, clearInfoUserLocal};
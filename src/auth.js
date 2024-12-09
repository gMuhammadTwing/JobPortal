import axiosInstance from "./axiosInstance";
import { handleError } from "./axiosInstance";

const login = async (credentials) => {

  try {
    const response = await axiosInstance.post("api/auth/login", credentials)
    console.log(response);
    // console.log(response.token);
    localStorage.setItem("token", response?.token);
    localStorage.setItem(
      "expires_at",
      Date.parse(response?.data?.token?.token?.expires_at)
    );
    localStorage.setItem("email", credentials?.email);
    localStorage.setItem("user_name", response?.user?.name);
    localStorage.setItem("role_id", response?.user?.role_id);
    localStorage.setItem("permissions", JSON.stringify(response?.data?.permissions));
    localStorage.setItem("user_id", response?.user?.id);
    localStorage.setItem("user_role", response?.data?.user_role);
    localStorage.setItem("login_time", Date.now());
  } catch (error) {
    handleError(error)
  }

};



// const logoutApi = async () => {
//   await axiosInstance
//     .post("/api/auth/logout")
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const logout = async () => {
  //   await logoutApi();
  localStorage.clear();
};






var auth = {
  login,
  logout
};
export default auth;

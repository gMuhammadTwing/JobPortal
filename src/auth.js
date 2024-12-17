import axiosInstance from "./axiosInstance";
import { handleError } from "./axiosInstance";

const login = async (credentials) => {

  try {
    const response = await axiosInstance.post("api/auth/login", credentials)
    console.log(response);
    localStorage.setItem("token", response?.token?.accessToken);
    localStorage.setItem(
      "expires_at",
      Date.parse(response?.data?.token?.token?.expires_at)
    );
    localStorage.setItem("email", credentials?.email);
    localStorage.setItem("payment", "true");
    localStorage.setItem("user_name", response?.user?.name);
    localStorage.setItem("role_id", response?.user?.role_id);
    localStorage.setItem("permissions", JSON.stringify(response?.data?.permissions));
    localStorage.setItem("user_id", response?.user?.id);
    localStorage.setItem("user_role", response?.data?.user_role);
    localStorage.setItem("login_time", Date.now());
    localStorage.setItem("user_image", response?.user?.user_image);
  } catch (error) {
    handleError(error)
  }

};

const logout = async () => {
  //   await logoutApi();
  localStorage.clear();
};

var auth = {
  login,
  logout
};
export default auth;

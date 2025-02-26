import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { handleError } from "./axiosInstance";

const login = async (credentials) => {

  try {
    const p = [
      { "permission_name": "veritasKWD_careers" },
      { "permission_name": "job_seeker" },
      { "permission_name": "employer" },
      { "permission_name": "user_management" },
    ]
    const response = await axiosInstance.post("api/auth/login", credentials)
    // console.log(response);

    localStorage.setItem("token", response?.token?.accessToken);
    localStorage.setItem(
      "expires_at",
      Date.parse(response?.data?.token?.token?.expires_at)
    );
    localStorage.setItem("email", credentials?.email);
    localStorage.setItem("payment", response?.user?.payment_status);
    // localStorage.setItem("payment", null)
    localStorage.setItem("user_name", response?.user?.name);
    localStorage.setItem("role_id", response?.user?.role_id);
    // localStorage.setItem("permissions", JSON.stringify(response?.user?.user_permissions)  || [] );
    const userPermissions = response?.user?.user_permissions;
    localStorage.setItem("permissions", JSON.stringify(Array.isArray(userPermissions) ? userPermissions : []));


    // localStorage.setItem("permissions",JSON.stringify(p));
    localStorage.setItem("user_id", response?.user?.id);
    localStorage.setItem("login_time", Date.now());
    localStorage.setItem("user_image", response?.user?.user_image);
    if (response?.user?.company_id) {
      localStorage.setItem("company_id", response?.user?.company_id[0]?.id);
    }
  } catch (error) {
    handleError(error)
  }
};
const logout = async () => {
  //   await logoutApi();
  localStorage.clear();
  // window.location.reload();
};
var auth = {
  login,
  logout
};
export default auth;

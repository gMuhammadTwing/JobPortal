import { Navigate, useLocation } from 'react-router-dom';

const routePermissions = {
  "/Dashboard": "view_dashboard",
  "/quarry": "view_quarry",
  "/assets": "view_asset",
  "/sales": "view_sale",
  "/expense": "view_expense",
  "/payroll": "view_payroll",
  "/employee": "view_employee",
  "/settings": "view_settings",
  "/revenue-share": "view_revenue_share",
  "/users": "view_settings",
  "/lookup": "view_settings",
  "/lookup/land-lease-type": "view_settings",
  "/lookup/asset-status": "view_settings",
  "/lookup/emp-category": "view_settings",
  "/lookup/expense-category": "view_settings",
  "/lookup/asset-category": "view_settings",
  "/lookup/product-type": "view_settings",
  "/lookup/payment-method": "view_settings",
  "/lookup/measured-in": "view_settings",
  // Add other routes and required permissions here
};

const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token'); // Check for access token
  // const permissions = JSON.parse(localStorage.getItem('permissions') || "[]");
  const location = useLocation();

  // Get required permission for the current route
  const requiredPermission = routePermissions[location.pathname];


  // const hasPermission = permissions.some(
  //   (perm) => perm.permission_name === requiredPermission
  // );


  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login if not logged in
  }
  if (requiredPermission == "view_dashboard") {
    if (!hasPermission) {
      return <Navigate to="/" replace />;
    }
  } else if (requiredPermission && !hasPermission) {
    return <Navigate to="/no-permission" replace />; // Redirect to No Permission page
  }

  return children;
};

export default ProtectedRoutes;
import { Navigate, useLocation } from 'react-router-dom';

const employerPermission = {
  "/employer/job_management": "view_employer_jobs",
  "/employer/profile": "view_employer_profile",
};

const JobSeekerPermission = {
  "/job-seeker/resume": "view-job-seeker",
  "/job-seeker/view-jobs": "view_jobs",
  "/job-seeker/applied-jobs": "view_applied_jobs",
  "/job-seeker/coursework": "view_coursework",
  "/job-seeker/profile": "view_job_seeker_profile"
};

const adminPermission = {
  "/admin/employees": "view_employees_profile",
  "/admin/job_seekers": "view_jobseekers_profile",
  "/admin/postblog": "manage_blogs",
  "/admin/instructions": "manage_instructions",
  "/admin/shortlisting": "manage_shortlisting",
  "/admin/payments": "manage_payments",
  "/admin/contacts": "view_contacts",
}

const ProtectedRoutes = ({ children }) => {
  const isLoggedIn = localStorage.getItem('token');
  const location = useLocation();

  const empRequiredPermission = employerPermission[location.pathname];
  const jobseekerRequiredPermission = JobSeekerPermission[location.pathname];
  const adminRequiredPermissions = adminPermission[location.pathname];
  if (!isLoggedIn) {
    return <Navigate to="/home" replace />;
  }
  if (localStorage.role_id == 3) {
    if (!empRequiredPermission) {
      return <Navigate to="/no-permission" replace />;
    }
  }
  if (localStorage.role_id == 2) {
    if (!jobseekerRequiredPermission) {
      return <Navigate to="/no-permission" replace />;
    }
  }
  if (localStorage.role_id == 1) {
    if (!adminRequiredPermissions) {
      return <Navigate to="/no-permission" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
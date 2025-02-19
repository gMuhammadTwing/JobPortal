import { Navigate, useLocation, useParams } from 'react-router-dom';


const ProtectedRoutes = ({ children }) => {
  const id = useParams();

  const employerPermission = {
    "/employer/job_management": "view_employer_jobs",
    "/employer/profile": "view_employer_profile",
    "/employer/veritas_shortlisting": "view_veritas_shortlisting",
    "/employer/resume_bank": "view_resume_bank",
    // "/employer/resume_bank/view-applicant":"view_applicant",
  };

  const JobSeekerPermission = {
    "/job-seeker/resume": "view-job-seeker",
    "/job-seeker/view_job_list": "view_jobs",
    "/job-seeker/applied_job_list": "view_applied_jobs",
    // "/job-seeker/coursework": "view_coursework",
    "/job-seeker/coursework/all": "view_coursework_all",
    "/job-seeker/profile": "view_job_seeker_profile"
  };

  const adminPermission = {
    "/admin/employees": "employer",
    "/admin/job_seekers": "job_seeker",
    "/admin/agencies_list": "employment_agency",
    "/admin/postblog": "blogs",
    "/admin/instructions": "instructions_for_payment",
    "/admin/shortlisting": "jobs_&_applicants",
    "/admin/payments": "payment",
    "/admin/contacts": "contact_us",
    "/admin/list_job": "jobs_list",
    "/admin/job_management": "manage_jobs",
    "/admin/idea_incubator_form": "veritasKWD_idea_incubator_form",
    "/admin/admin_opportunity": "veritasKWD_opportunity",
    "/admin/about": "about_us",
    "/admin/admin_projects": "veritasKWD_projects",
    "/admin/admin_investors": "veritasKWD_investors",
    "/admin/admin_charities": "veritasKWD_charities",
    "/admin/admin_idea_incubators": "veritasKWD_idea_incubators",
    "/admin/admin_volunteers": "veritasKWD_volunteers",
    "/admin/admin_careers": "veritasKWD_careers",
    "/admin/job_report": "job_reports",
    "/admin/user_management": "user_management",
    "/admin/user_management/create_user": "user_management",
  }
  const addJobSeekerDynamicRoute = (basePath, id, permission) => {
    const dynamicPath = `${basePath}/${id}`;
    JobSeekerPermission[dynamicPath] = permission;
  };
  const addEmployerDynamicRoute = (basePath, id, permission) => {
    const dynamicPath = `${basePath}/${id}`;
    employerPermission[dynamicPath] = permission;
  };

  const addAdminDynamicRoute = (basePath, id, permission) => {
    const dynamicPath = `${basePath}/${id}`;
    adminPermission[dynamicPath] = permission;
  };

  addJobSeekerDynamicRoute("/job-seeker/coursework", id?.id, "view_coursework");

  addEmployerDynamicRoute("/employer/resume_bank/view-applicant", id?.id, "view_applicant");
  addEmployerDynamicRoute("/employer/veritas_shortlisting/view-applicant", id?.id, "view_applicant");

  addAdminDynamicRoute("/admin/employees/view-employer", id?.id, "employer");
  addAdminDynamicRoute("/admin/employees/edit-employer", id?.id, "employer");
  addAdminDynamicRoute("/admin/job_seekers/view-applicant", id?.id, "job_seeker");
  addAdminDynamicRoute("/admin/job_seekers/edit-applicant", id?.id, "job_seeker");
  addAdminDynamicRoute("/admin/agencies_list/view-agency", id?.id, "employment_agency");
  addAdminDynamicRoute("/admin/agencies_list/edit-agency", id?.id, "employment_agency");
  addAdminDynamicRoute("/admin/shortlisting/view-applicant", id?.id, "jobs_&_applicants");
  addAdminDynamicRoute("/admin/list_job/job_details", id?.id, "jobs_list");
  addAdminDynamicRoute("/admin/job_report/view_job", id?.id, "job_reports");


  const isLoggedIn = localStorage.getItem('token');
  const storedPermissions = localStorage.getItem("permissions");

  const permissions = (storedPermissions && storedPermissions !== "undefined")
    ? JSON.parse(storedPermissions)
    : [];
  // const permissions = JSON.parse(localStorage.getItem('permissions') || "[]");
  const location = useLocation();
  const empRequiredPermission = employerPermission[location.pathname];
  const jobseekerRequiredPermission = JobSeekerPermission[location.pathname];
  const adminRequiredPermissions = adminPermission[location.pathname];
  const hasPermission = permissions.some(
    (perm) => perm.permission_name == adminRequiredPermissions
  );

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
  if (localStorage.role_id == 1 || localStorage.role_id == 5) {
    if (!hasPermission) {
      return <Navigate to="/no-permission" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
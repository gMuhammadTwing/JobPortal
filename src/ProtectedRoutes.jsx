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
    "/admin/employees": "list_employees_profile",
    "/admin/job_seekers": "list_jobseekers_profile",
    "/admin/agencies_list": "list_employer_agency",
    "/admin/postblog": "manage_blogs",
    "/admin/instructions": "manage_instructions",
    "/admin/shortlisting": "manage_shortlisting",
    "/admin/payments": "manage_payments",
    "/admin/contacts": "view_contacts",
    "/admin/list_job": "jobs_list",
    "/admin/job_management": "manage_jobs",
    "/admin/idea_incubator_form": "idea_incubator_form",
    "/admin/admin_opportunity": "admin_opportunity",
    "/admin/admin_projects": "admin_projects",
    "/admin/admin_investors": "admin_investors",
    "/admin/admin_charities": "admin_charities",
    "/admin/admin_idea_incubators": "admin_idea_incubators",
    "/admin/admin_volunteers": "admin_volunteers",
    "/admin/admin_careers": "admin_careers",
    "/admin/job_report": "job_report",
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

  addAdminDynamicRoute("/admin/employees/view-employer", id?.id, "view_employer_profile");
  addAdminDynamicRoute("/admin/employees/edit-employer", id?.id, "edit_employer_profile");
  addAdminDynamicRoute("/admin/job_seekers/view-applicant", id?.id, "view_applicant_profile");
  addAdminDynamicRoute("/admin/job_seekers/edit-applicant", id?.id, "edit_applicant_profile");
  addAdminDynamicRoute("/admin/agencies_list/view-agency", id?.id, "view_agency_profile");
  addAdminDynamicRoute("/admin/agencies_list/edit-agency", id?.id, "edit_agency_profile");
  addAdminDynamicRoute("/admin/shortlisting/view-applicant", id?.id, "view_shortlisted_applicant");
  addAdminDynamicRoute("/admin/list_job/job_details", id?.id, "job_details");
  addAdminDynamicRoute("/admin/job_report/view_job", id?.id, "view_job");


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
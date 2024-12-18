import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Login from './Pages/Login';
import CreateAccount from './Pages/CreateAccount';
import JobSeekerSignup from './Pages/JobSeekerSignup';
import EmployerSignup from './Pages/EmployerSignup';
import ProfileIndex from './Pages/JobSeeker/Profile/ProfileIndex';
import JobsApplied from './Pages/JobSeeker/AppliedJobs/JobsApplied';
import Resume from './Pages/JobSeeker/Resume/Resume';
import ViewJobs from './Pages/JobSeeker/ViewJobs/ViewJobs';
import EmployerProfile from './Pages/Employer/EmployerProfile';
import ManageJobs from './Pages/Employer/ManageJobs';
import DashboardMain from './Pages/DashboardMain';
import PublicIndex from './Pages/Public/Index';
import PublicDashboard from './Pages/PublicDashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AboutUs from './Pages/Public/AboutUs';
import Teams from './Pages/Public/Teams';
import Projects from './Pages/Public/Projects';
import Blogs from './Pages/Public/Blogs';
import ContactUs from './Pages/Public/ContactUs';
import { DropdownProvider } from './DropdownProvider';
import ProtectedRoutes from './ProtectedRoutes';
import CourseWork from './Pages/JobSeeker/Coursework/Index';
import NoPermission from './Pages/NoPermission/NoPermission';
import PaymentAlert from './Pages/PaymentAlert';
import EmployeesIndex from './Pages/Admin/Employees/Index';
import JobSeekersIndex from './Pages/Admin/JobSeekers/Index';
import BlogIndex from './Pages/Admin/Blog/Index';
import ShortlistingIndex from './Pages/Admin/Shortlisting/Index';
import InstructionsIndex from './Pages/Admin/Instructions/Index';
function App() {
  return (
    <DropdownProvider>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicDashboard />}>
            <Route path="home" element={<PublicIndex />} />
            <Route path="payment-alert" element={<PaymentAlert />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="teams" element={<Teams />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="create-account/signup-jobseeker" element={<JobSeekerSignup />} />
            <Route path="create-account/signup-employee" element={<EmployerSignup />} />


            {/* Job Seeker Routes */}
            <Route path="job-seeker" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="profile" element={<ProtectedRoutes><ProfileIndex /></ProtectedRoutes>} />
              <Route path="applied-jobs" element={<ProtectedRoutes><JobsApplied /></ProtectedRoutes>} />
              <Route path="resume" element={<Resume />} />
              <Route path="view-jobs" element={<ProtectedRoutes><ViewJobs /></ProtectedRoutes>} />
              <Route path="coursework" element={<ProtectedRoutes><CourseWork /></ProtectedRoutes>} />
            </Route>

            {/* Employer Routes */}
            <Route path="employer" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="profile" element={<ProtectedRoutes><EmployerProfile /></ProtectedRoutes>} />
              <Route path="manage-jobs" element={<ProtectedRoutes><ManageJobs /></ProtectedRoutes>} />
            </Route>

            {/* Admin Routes */}
            <Route path="admin" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="employees" element={<ProtectedRoutes><EmployeesIndex /></ProtectedRoutes>} />
              <Route path="jobseekers" element={<ProtectedRoutes><JobSeekersIndex /></ProtectedRoutes>} />
              <Route path="blogs" element={<ProtectedRoutes><BlogIndex /></ProtectedRoutes>} />
              <Route path="shortlisting" element={<ProtectedRoutes><ShortlistingIndex /></ProtectedRoutes>} />
              <Route path="instructions" element={<ProtectedRoutes><InstructionsIndex /></ProtectedRoutes>} />
            </Route>

            {/* No Permission Route */}
            <Route path="/no-permission" element={<NoPermission />} />

          </Route>



          {/* Catch-All Route for Undefined Paths */}
          <Route path="*" element={<NoPermission />} />
        </Routes>
      </HashRouter>
    </DropdownProvider>
  );
}

export default App;

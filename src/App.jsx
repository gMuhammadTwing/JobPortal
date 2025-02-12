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
// import Projects from './Pages/Public/Projects';
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
import PaymentIndex from './Pages/Admin/Payment/PaymentIndex';
import '@fortawesome/fontawesome-free/css/all.min.css';
import BlogDetails from './Pages/Public/BlogDetails';
import Jobs from './Pages/Public/Jobs';
import AdminContactUs from './Pages/Admin/Contacts/Index';
import PaymentApprovalPending from './Pages/PaymentApprovalPending';
import ResumeBank from './Pages/Employer/ResumeBank';
import VertiasShortlisting from './Pages/Employer/VeritasShortlisting';
import EmployerAgencyList from './Pages/Admin/Agency/Index'
import ViewEmployer from './Pages/Admin/ViewEmployer';
import ViewAgency from './Pages/Admin/ViewAgency';
import ViewApplicant from './Pages/Admin/ViewApplicant';
import ViewJobDetails from './Pages/Public/ViewJobDetails';
import OurVision from './Pages/Public/OurVision';
import OurMission from './Pages/Public/OurMission';
import OurValues from './Pages/Public/OurValues';
import Opportunity from './Pages/Public/Opportunity';
import Projects from './Pages/Public/Projects';
import Investors from './Pages/Public/Investors';
import Charities from './Pages/Public/Charities';
import Incubators from './Pages/Public/Incubators';
import Volunteers from './Pages/Public/Volunteers';
import Careers from './Pages/Public/Careers';
import PostJob from './Pages/Public/PostJob';
import ResumeBankPublic from './Pages/Public/ResumeBank';
import VeritasShortlistingPublic from './Pages/Public/VeritasShortlisting';
import FindCandidates from './Pages/Public/FindCandidates';
import Subscribe from './Pages/Public/Subscribe';
import SubmitResume from './Pages/Public/SubmitResume';
import WhySubscribe from './Pages/Public/WhySubscribe';
import TermsConditions from './Pages/Public/TermsConditions';
import Disclaimer from './Pages/Public/Disclaimer';
import PrivacyPolicy from './Pages/Public/PrivacyPolicy';
import RefundPolicy from './Pages/Public/RefundPolicy';
import ServiceGuarantee from './Pages/Public/ServiceGuarantee';
import ForgotPassword from './Pages/ForgotPassword';
import JoinCommunity from './Pages/Public/JoinCommunity';
import AdminJobs from './Pages/Admin/Jobs/Index'
import EditEmployer from './Pages/Admin/EditEmployer';
import EditApplicant from './Pages/Admin/JobSeekers/EditApplicant/Index';
import EditAgency from './Pages/EditAgency';
import AdminOpportunity from './Pages/Admin/About Us/Opportunity';
import AdminCareers from './Pages/Admin/About Us/Careers';
import AdminVolunteers from './Pages/Admin/About Us/Volunteers';
import AdminIncubators from './Pages/Admin/About Us/Incubators';
import AdminProjects from './Pages/Admin/About Us/Projects';
import AdminInvestors from './Pages/Admin/About Us/Investors';
import AdminCharities from './Pages/Admin/About Us/Charities';
import Index from './Pages/Admin/IdeaIncubatorForm/Index';
import JobReport from './Pages/Admin/Report Job/JobReport';
import JobDetails from './Pages/Admin/Jobs/JobDetails';
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
            <Route path="vision" element={<OurVision />} />
            <Route path="mission" element={<OurMission />} />
            <Route path="our-values" element={<OurValues />} />
            <Route path="opportunity" element={<Opportunity />} />
            <Route path="projects" element={<Projects />} />
            <Route path="investors" element={<Investors />} />
            <Route path="charities" element={<Charities />} />
            <Route path="incubators" element={<Incubators />} />
            <Route path="volunteers" element={<Volunteers />} />
            <Route path="careers" element={<Careers />} />
            <Route path="post_job" element={<PostJob />} />
            <Route path="resume_bank" element={<ResumeBankPublic />} />
            <Route path="veritas_shortlisting" element={<VeritasShortlistingPublic />} />
            <Route path="find_candidates" element={<FindCandidates />} />
            <Route path="subscribe" element={<Subscribe />} />
            <Route path="submit_resume" element={<SubmitResume />} />
            <Route path="why_subscribe" element={<WhySubscribe />} />
            <Route path="terms" element={<TermsConditions />} />
            <Route path="disclaimer" element={<Disclaimer />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="service-guarantee" element={<ServiceGuarantee />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="join_community" element={<JoinCommunity />} />

            <Route path="teams" element={<Teams />} />
            {/* <Route path="projects" element={<Projects />} /> */}
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:title" element={<Jobs />} />
            <Route path="jobs_type/:job_type" element={<Jobs />} />
            <Route path="view-job-details/:id" element={<ViewJobDetails />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blog/blog_details/:id" element={<BlogDetails />} />
            <Route path="login" element={<Login />} />
            <Route path="create-account" element={<CreateAccount />} />
            <Route path="create-account/signup_job_seeker" element={<JobSeekerSignup />} />
            <Route path="create-account/signup-employee" element={<EmployerSignup />} />


            {/* Job Seeker Routes */}
            <Route path="job-seeker" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="profile" element={<ProtectedRoutes><ProfileIndex /></ProtectedRoutes>} />
              <Route path="applied_job_list" element={<ProtectedRoutes><JobsApplied /></ProtectedRoutes>} />
              <Route path="resume" element={<Resume />} />
              <Route path="view_job_list" element={<ProtectedRoutes><ViewJobs /></ProtectedRoutes>} />
              <Route path="coursework/:id" element={<ProtectedRoutes><CourseWork /></ProtectedRoutes>} />
              <Route path="coursework/:id" element={<ProtectedRoutes><CourseWork /></ProtectedRoutes>} />
            </Route>

            {/* Employer Routes */}
            <Route path="employer" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="profile" element={<ProtectedRoutes><EmployerProfile /></ProtectedRoutes>} />
              <Route path="job_management" element={<ProtectedRoutes><ManageJobs /></ProtectedRoutes>} />
              <Route path="resume_bank" element={<ProtectedRoutes><ResumeBank /></ProtectedRoutes>} />
              <Route path="veritas_shortlisting" element={<ProtectedRoutes><VertiasShortlisting /></ProtectedRoutes>} />
              <Route path="resume_bank/view-applicant/:id" element={<ViewApplicant />} />
              <Route path="veritas_shortlisting/view-applicant/:id" element={<ViewApplicant />} />
            </Route>

            {/* Admin Routes */}
            <Route path="admin" element={<ProtectedRoutes><DashboardMain /></ProtectedRoutes>}>
              <Route path="employees" element={<ProtectedRoutes><EmployeesIndex /></ProtectedRoutes>} />
              {/* <Route path="job_management" element={<ProtectedRoutes><ManageJobs /></ProtectedRoutes>} /> */}
              <Route path="job_seekers" element={<ProtectedRoutes><JobSeekersIndex /></ProtectedRoutes>} />
              <Route path="postblog" element={<ProtectedRoutes><BlogIndex /></ProtectedRoutes>} />
              <Route path="shortlisting" element={<ProtectedRoutes><ShortlistingIndex /></ProtectedRoutes>} />
              <Route path="instructions" element={<ProtectedRoutes><InstructionsIndex /></ProtectedRoutes>} />
              <Route path="payments" element={<ProtectedRoutes><PaymentIndex /></ProtectedRoutes>} />
              <Route path="contacts" element={<ProtectedRoutes><AdminContactUs /></ProtectedRoutes>} />
              <Route path="agencies_list" element={<ProtectedRoutes><EmployerAgencyList /></ProtectedRoutes>} />
              <Route path="employees/view-employer/:id" element={<ViewEmployer />} />
              <Route path="employees/edit-employer/:id" element={<EditEmployer />} />
              <Route path="job_seekers/view-applicant/:id" element={<ViewApplicant />} />
              <Route path="job_seekers/edit-applicant/:id" element={<EditApplicant />} />
              <Route path="shortlisting/view-applicant/:id" element={<ViewApplicant />} />
              <Route path="agencies_list/view-agency/:id" element={<ViewAgency />} />
              <Route path="agencies_list/edit-agency/:id" element={<EditAgency />} />
              <Route path="list_job" element={<AdminJobs />} />
              <Route path="admin_opportunity" element={<AdminOpportunity/>} />
              <Route path="admin_careers" element={<AdminCareers/>} />
              <Route path="admin_volunteers" element={<AdminVolunteers/>} />
              <Route path="admin_idea_incubators" element={<AdminIncubators/>} />
              <Route path="admin_charities" element={<AdminCharities/>} />
              <Route path="admin_investors" element={<AdminInvestors/>} />
              <Route path="admin_projects" element={<AdminProjects/>} />
              <Route path="idea_incubator_form" element={<Index/>} />
              <Route path="job_report" element={<JobReport/>} />
              <Route path="list_job/job_details/:id" element={<JobDetails/>} />
            </Route>

            {/* No Permission Route */}
            <Route path="/no-permission" element={<NoPermission />} />
            <Route path="/payment-pending" element={<PaymentApprovalPending />} />

          </Route>



          {/* Catch-All Route for Undefined Paths */}
          <Route path="*" element={<NoPermission />} />
        </Routes>
      </HashRouter>
    </DropdownProvider>
  );
}

export default App;

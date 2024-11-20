import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Dashboard from './Pages/Dashboard'
import Testing from './Pages/Testing'
import Login from './Pages/Login'
import CreateAccount from './Pages/CreateAccount'
import JobSeekerSignup from './Pages/JobSeekerSignup'
import EmployerSignup from './Pages/EmployerSignup'
import Profile from './Pages/JobSeeker/Profile'
import JobsApplied from './Pages/JobSeeker/JobsApplied'
import Resume from './Pages/JobSeeker/Resume'
import ViewJobs from './Pages/JobSeeker/ViewJobs'
import Payment from './Pages/JobSeeker/Payment'
import EmployerProfile from './Pages/Employer/EmployerProfile'
import ManageJobs from './Pages/Employer/ManageJobs'
import EmployerPayment from './Pages/Employer/Payment'
import Shortlisting from './Pages/Shortlisting'
import Coursework from './Pages/Coursework/Index'
import BlogIndex from './Pages/Blog/Index'
function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="create-account" element={<CreateAccount />} />
          <Route path="signup-jobseeker" element={<JobSeekerSignup />} />
          <Route path="signup-employer" element={<EmployerSignup />} />
          <Route
            path="/*"
            element={
              <Dashboard />
            }
          >
            <Route path="home" element={<Profile />} />
            <Route path="applied-jobs" element={<JobsApplied />} />
            <Route path="resume" element={<Resume />} />
            <Route path="view-jobs" element={<ViewJobs />} />
            <Route path="subscription" element={<Payment />} />

            <Route path="employer-profile" element={<EmployerProfile />} />
            <Route path="manage-jobs" element={<ManageJobs />} />
            <Route path="employer-payment" element={<EmployerPayment />} />
            <Route path="shortlisting" element={<Shortlisting />} />
            <Route path="coursework" element={<Coursework />} />
            <Route path="blog" element={<BlogIndex />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  )
}

export default App

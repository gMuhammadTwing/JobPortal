import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

function App() {
  return (
    <>
      <BrowserRouter>
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

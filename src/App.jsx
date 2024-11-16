import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Dashboard from './Pages/Dashboard'
import Testing from './Pages/Testing'
import Login from './Pages/Login'
import CreateAccount from './Pages/CreateAccount'
import JobSeekerSignup from './Pages/JobSeekerSignup'
import EmployerSignup from './Pages/EmployerSignup'
import Profile from './Pages/Employer/Profile'
import JobsApplied from './Pages/Employer/JobsApplied'
import Resume from './Pages/Employer/Resume'
import ViewJobs from './Pages/Employer/ViewJobs'

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

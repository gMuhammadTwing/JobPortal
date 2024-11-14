import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

import Dashboard from './Pages/Dashboard'
import Testing from './Pages/Testing'
import Login from './Pages/Login'
import CreateAccount from './Pages/CreateAccount'
import JobSeekerSignup from './Pages/JobSeekerSignup'
import EmployerSignup from './Pages/EmployerSignup'
import Profile from './Pages/Employer/Profile'

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router'
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import ForgotPassword from './components/auth/ForgotPassword'
import VerifyEmail from './components/auth/VerifyEmail'
import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import Profile from '../pages/dashboard/Profile'
import Settings from '../pages/dashboard/Settings'
import Notifications from '../pages/dashboard/Notification'
import ResetPassword from './components/auth/ResetPassword'


export default function App() {
  return (
    <div>

      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/verify-email' element= {<VerifyEmail/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>

        <Route path='/dashboard' element={<DashboardLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='settings' element={<Settings/>}/>
          <Route path='notifications' element={<Notifications/>}/>
        
        </Route>
        



      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

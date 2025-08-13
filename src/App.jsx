import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AdminDashbord, AllRequestDetail, AppointmentSlip, Calculatepage, ContactPage, LandingPage, Login, LonaRequest, NewPassword, Register, UserDashboard, UserLoanReq, VeiwAppointSlips } from './Pages'


function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/calculate' element={<Calculatepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/newPassword' element={<NewPassword />} />
        <Route path='/loanRequest' element={<LonaRequest />} />
        <Route path='/UserDashboard' element={<UserDashboard />} />
        <Route path='/UserloanReq' element={<UserLoanReq />} />
        <Route path='/appointmentSlip' element={<AppointmentSlip />} />

        {/* Admin */}
        <Route path='/admin' element={<AdminDashbord />} />
        <Route path='/admin/:id' element={<AllRequestDetail />} />
        <Route path='/ViweAppointmentSlip' element={<VeiwAppointSlips />} />
      </Routes>
    </>
  )
}

export default App

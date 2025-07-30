import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import OTPLogin from './Pages/OTPLogin';
import ReferralPage from './Pages/ReferralPage';
import Profile from './Pages/Profile';
import AddServices from './Pages/AddServices';
import Cart from './Pages/Cart';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AdminLogin from './Pages/AdminLogin';
import AdminDashboard from './Pages/AdminDashboard';
import BeauticianLogin from './Pages/BeauticianLogin';
import BeauticianDashboard from './Pages/BeauticianDashboard';
import OTPVerify from './Pages/OTPVerify';
import Gromming from './Pages/Gromming';
import Medical from './Pages/MedicalSupport';
import Massage from './Pages/Massage';
import MentalCare from './Pages/MentalCare';
import MakeYourPackage from './Pages/Mobility';
import AdminPrivateRoute from './utils/AdminPrivateRoute';
import BeauticianPrivateRoute from './utils/BeauticianPrivateRoute';
import BookingPage from './Pages/MyBooking';
import SpecializedServices from './Pages/BookService';
import AboutUs from './Pages/AboutUs';
const App = () => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '80vh' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/bookings' element={<BookingPage />} />
          <Route path='/referral' element={<ReferralPage />} />
          <Route path='/add-services' element={<AddServices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/otp-login' element={<OTPLogin />} />
          <Route path='/otp-verify' element={<OTPVerify />} />
          <Route path='/salon-at-home' element={<Gromming />} />
          <Route path='/book-service' element={<SpecializedServices />} />
          <Route path='/about' element={<AboutUs />} />


          <Route path='/makeup-at-home' element={<Medical />} />
          <Route path='/pre-bridal' element={<Massage />} />
          <Route path='/hair-studio' element={<MentalCare />} />
          <Route path='/make-your-package' element={<MakeYourPackage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
           <Route path="/admin/dashboard" element={
          <AdminPrivateRoute>
            <AdminDashboard />
          </AdminPrivateRoute>
        }
      />
          <Route path="/beautician/login" element={<BeauticianLogin />} />
         <Route
        path="/beautician/dashboard"
        element={
          <BeauticianPrivateRoute>
            <BeauticianDashboard />
          </BeauticianPrivateRoute>
        }
      />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

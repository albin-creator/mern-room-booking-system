import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/common/LoginPage';
import UserRegisterPage from '../pages/user/UserRegisterPage';
import AdminRegisterPage from '../pages/admin/AdminRegisterPage';
import UserHomePage from '../pages/user/UserHomePage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import NotFound from '../pages/common/NotFound';
import { useAuth } from '../context/AuthContext';
import RoomFormPage from '../pages/admin/RoomFormPage';
import RoomDetailsPage from '../pages/user/RoomDetailsPage';
import BookingPage from '../pages/user/BookingPage';
import MyBooking from '../pages/user/MyBooking';
import RoomBookingListPage from '../pages/admin/RoomBookingListPage';
import RoomListPage from '../pages/admin/RoomListPage';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/user/register" element={<UserRegisterPage />} />
      <Route path="/admin/register" element={<AdminRegisterPage />} />
      <Route path="/admin" element={<AdminHomePage />} />
      <Route path="/admin/room/create" element={<RoomFormPage />} /> 

      {user?.role === 'user' && <Route path="/user/home" element={<UserHomePage />} />}
      {user?.role === 'admin' && <Route path="/admin/home" element={<AdminHomePage />} />}

      <Route path="*" element={<NotFound />} />
      <Route path="/room/:id" element={<RoomDetailsPage />} />
      <Route path="/room/:id/book" element={<BookingPage />} />
      <Route path="/user/mybookings" element={<MyBooking />} />
      <Route path="/admin/bookings" element={<RoomBookingListPage />} />
      <Route path="/admin/room/update/:id" element={<RoomFormPage />} />
      <Route path="/admin/room/list" element={<RoomListPage />} />

    </Routes>
  );
};

export default AppRoutes;

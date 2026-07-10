import { Routes } from 'react-router';
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import { Route } from 'react-router';
import UserLayout from './pages/UserLayout/UserLayout';
import BookPage from './pages/Books/BookPage';
import Myloans from './pages/Myloans/MyLoans';
import MyReservations from './pages/MyReservation/MyReservation';
import MyFines from './pages/Myfine/MyFine';
import Subscriptions from './pages/Subscription/Subscriptions';
import Wishlist from './pages/Wishlist/Wishlist';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

function App() {
  

  return (
    <>
      
      <Routes>
        {/* userr routes */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Dashboard />} / > 
          <Route path="/books" element={<BookPage />} />
          <Route path="/my-loans" element={<Myloans />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route path="/my-fines" element={<MyFines />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

import './App.css';
import Navbar from './components/header/Navbar';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewService from './components/service/NewService';
import Products from './components/products/Products';
import User from './components/user/User';
import NewUser from './components/user/NewUser';
import Vendors from './components/vendor/Vendors';
import NewVendor from './components/vendor/NewVendor';
import ChangePassword from './components/user/ChangePassword';
import UserLogin from './components/user/UserLogin';
import VendorClients from './components/vendor/VendorClients';
import { useEffect } from 'react';
import { getUserDetails } from './action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from './route/ProtectedRoute';
import ServiceDetails from './components/service/ServiceDetails';
import Report from './components/report/Report';
import Pending from './components/report/Pending';
import UpdatePayment from './components/service/UpdatePayment';
import NewDevice from './components/service/NewDevice';
import Sidebar from './components/sidebar/Sidebar';
import WebFont from 'webfontloader'


function App() {

  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => state.user)

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    dispatch(getUserDetails())
  }, [])

  return (
    <BrowserRouter>
      <>
        {isAuthenticated && <Navbar />}
        {/* <div style={{ display: "flex" }}> */}
          {/* {isAuthenticated && <Sidebar />} */}
          <div className="App">
            <Routes>
              <Route exact path='/' element={<UserLogin />} />
              <Route exact path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route exact path='/dashboard/service/create' element={<ProtectedRoute><NewService /></ProtectedRoute>} />
              <Route exact path='/dashboard/service/newDevice' element={<ProtectedRoute><NewDevice /></ProtectedRoute>} />
              <Route exact path='/dashboard/service/updateDevice/:id' element={<ProtectedRoute><NewDevice /></ProtectedRoute>} />
              <Route exact path='/dashboard/service/:id' element={<ProtectedRoute><ServiceDetails /></ProtectedRoute>} />
              <Route exact path='/dashboard/product/list/:id' element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route exact path='/dashboard/product/list' element={<ProtectedRoute><Products /></ProtectedRoute>} />
              <Route exact path='/dashboard/list/user' element={<ProtectedRoute><User /></ProtectedRoute>} />
              <Route exact path='/dashboard/create/user' element={<ProtectedRoute><NewUser /></ProtectedRoute>} />
              <Route exact path='/dashboard/vendor' element={<ProtectedRoute><Vendors /></ProtectedRoute>} />
              <Route exact path='/dashboard/vendor/add' element={<ProtectedRoute><NewVendor /></ProtectedRoute>} />
              <Route exact path='/dashboard/vendor/update/:id' element={<ProtectedRoute><NewVendor /></ProtectedRoute>} />
              <Route exact path='/dashboard/vendor/clients/:name' element={<ProtectedRoute><VendorClients /></ProtectedRoute>} />
              <Route exact path='/dashboard/change-password' element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
              <Route exact path='/dashboard/report' element={<ProtectedRoute><Report /></ProtectedRoute>} />
              <Route exact path='/dashboard/report/pending' element={<ProtectedRoute><Pending /></ProtectedRoute>} />
              <Route exact path='/dashboard/service/update/payment/:id' element={<ProtectedRoute><UpdatePayment /></ProtectedRoute>} />
            </Routes>
          {/* </div> */}
        </div>
      </>
    </BrowserRouter>
  );
}


export default App;

import './App.css';
import Navbar from './components/header/Navbar';
import Home from './components/home/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
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
import { useDispatch } from 'react-redux';
import ProtectedRoute from './route/ProtectedRoute';
import ServiceDetails from './components/service/ServiceDetails';
import Report from './components/report/Report';
import Pending from './components/report/Pending';
import UpdatePayment from './components/service/UpdatePayment';
import NewDevice from './components/service/NewDevice';


function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
      dispatch(getUserDetails())
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<UserLogin />} />
          <Route exact path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route exact path='/dashboard/service/create' element={<NewService />} />
          <Route exact path='/dashboard/service/newDevice' element={<NewDevice />} />
          <Route exact path='/dashboard/service/:id' element={<ServiceDetails />} />
          <Route exact path='/dashboard/product/list/:id' element={<Products />} />
          <Route exact path='/dashboard/product/list' element={<Products />} />
          <Route exact path='/dashboard/list/user' element={<User />} />
          <Route exact path='/dashboard/create/user' element={<NewUser />} />
          <Route exact path='/dashboard/vendor' element={<Vendors />} />
          <Route exact path='/dashboard/vendor/add' element={<NewVendor />} />
          <Route exact path='/dashboard/vendor/update/:id' element={<NewVendor />} />
          <Route exact path='/dashboard/vendor/clients/:name' element={<VendorClients />} />
          <Route exact path='/dashboard/change-password' element={<ChangePassword />} />
          <Route exact path='/dashboard/report' element={<Report />} />
          <Route exact path='/dashboard/report/pending' element={<Pending />} />
          <Route exact path='/dashboard/service/update/payment/:id' element={<UpdatePayment />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;

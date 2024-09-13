import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Login from './auth/Login';
import Layout from './components/common/Layout'
import ChangePassword from "./auth/ChangePassword";
import Dashboard from './components/common/Dashboard';

import UserRegistration from './userreg/UserRegistration';

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Login/>} />
                  <Route path="changepassword" element={<ChangePassword />} />
              </Route>
              <Route path="/dashboard" element={<Dashboard />}>
              </Route>
              <Route path="/userregistration" element={<UserRegistration />}>
              </Route>
          </Routes>   
      </BrowserRouter>

  );

}

export default App;

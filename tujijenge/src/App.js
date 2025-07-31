import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventsProvider } from './context/useEvents';
import CatalogueScreen from './Catalogue';
import RecentOrders from './RecentOrders';
import GroupOrders from './GroupOrders';
import SupplierLayout from './sharedComponents/SupplierLayouts';
import DashboardLayout from './sharedComponents/GainLayouts'; 
import Dashboard from './Dashboard';           
import TrainingCalendar from './TrainingCalendar'; 
import SignIn from './Onboarding/SignIn';
import Splash from './Onboarding/Splash/index.js' 
import SupplyChain from './Onboarding/SupplyChain/index.js';
import Training from './Onboarding/Training/index.js';
import Orders from './Onboarding/Orders/index.js';
import Verification from './Onboarding/Verification/index.js';
import Welcome from './Onboarding/Home/index.js';

function getRole() {
  return localStorage.getItem('role'); 
}

function App() {
  const role = getRole();

  return (
    <EventsProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/supplychain" element={<SupplyChain />} />
        <Route path="/training" element={<Training />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/home" element={<Welcome />} />
        <Route path="/SignIn" element={<SignIn />} />

          {/* {role === 'supplier' && (
            <>
              <Route element={<SupplierLayout />}>
                <Route path="/Catalogue" element={<CatalogueScreen />} />
                <Route path="/orders" element={<RecentOrders />} />
              </Route>
              <Route path="/group-orders/:groupId" element={<GroupOrders />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}

          {role === 'trainer' && (
            <>
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/training-calendar" element={<TrainingCalendar />} />
              </Route>
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </>
          )}

          {!role && (
            <>
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<Navigate to="/Catalogue" replace />} />
            </>
          )} */}
          <Route path="/Catalogue" element={<CatalogueScreen />} />        </Routes>
      </Router>
    </EventsProvider>
  );
}

export default App;

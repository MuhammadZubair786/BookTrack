import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import SellCar from "../pages/SellCar";
import Settings from "../pages/Settings";
import UserManagement from "../pages/users";
import StaffDashboard from "../pages/Staffs";
import DriverWalletManagementDashboard from "../pages/DriverWalletMangemnet";
import BannerManagement from "../pages/BannerMangement";
import PromoCodeManagement from "../pages/PromoCodeMangement";
import NotificationManagement from "../pages/NotificationMangement";
import CarsDashboard from "../pages/carsList";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" element={<Dashboard />} />}
      />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/staff" element={<StaffDashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/cars" element={<CarsDashboard />} />

      <Route
        path="/driver-wallet"
        element={<DriverWalletManagementDashboard />}
      />
      <Route path="/banner-management" element={<BannerManagement />} />
      <Route path="/promo-code" element={<PromoCodeManagement />} />
      <Route path="/notifications" element={<NotificationManagement />} />

      <Route path="/sell-car" element={<SellCar />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Router;

import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileCharts";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import UserStaffChart from "../charts/UserStaff";
import axios from "axios";

const carObj = {
  title: "Total Cars",
  totalNumber: 750,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Daily Trips",
  totalNumber: 1697,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Clients Annually",
  totalNumber: "85k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 2167,
  icon: "ri-timer-flash-line",
};

const API_URL =
  "https://vmcarapp-4a377bf5c0d0.herokuapp.com/api/admin/dashboard-data";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDRiZDdlODQwYWU4OGE3N2RhYTUxNCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyNjUwMDE3LCJleHAiOjE3MzUyNDIwMTd9.YL-JmAiQMWrIpoY_y9olmDoV7DoPHGDkJLytAA9bX9A`, // Use your actual token
        },
      });
      setDashboardData([response.data.data]);

      console.log(response.data.data.totalUsers);
      // setUsers(response.data.data.rideList); // Adjust based on the API response structure
      // setTotalRides(response.data.pagination.totalRides); // Total number of items
      // setTotalPages(response.data.pagination.totalPages); // Total pages
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          {dashboardData.length > 0 ? (
            <>
              <SingleCard
                item={{
                  title: "Total Cars",
                  totalNumber: dashboardData[0].totalCars,
                  icon: "ri-police-car-line",
                }}
              />
              <SingleCard
                item={{
                  title: "Daily Trips",
                  totalNumber: dashboardData[0].totalRides,
                  icon: "ri-steering-2-line",
                }}
              />
              <SingleCard
                item={{
                  title: "Total Users",
                  totalNumber: dashboardData[0].totalUsers,
                  icon: "ri-user-line",
                }}
              />
              <SingleCard
                item={{
                  title: "Requests",
                  totalNumber: dashboardData[0].totalRequest,
                  icon: "ri-timer-flash-line",
                }}
              />
            </>
          ) : null}
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="statics">
          <div className="stats2">
            <h3 className="stats__title">Users and Staff Statistics</h3>
            <UserStaffChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

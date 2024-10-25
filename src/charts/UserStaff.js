import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import userStaffData from "../assets/dummy-data/userStaffData"; // Import your data

// Flatten the data for both users and staff across months
const pieData = userStaffData.reduce((acc, curr) => {
  acc.push({ name: `${curr.name} Users`, value: curr.users });
  acc.push({ name: `${curr.name} Staff`, value: curr.staff });
  return acc;
}, []);

const COLORS = [
  "#4f8ef7",
  "#f7744f",
  "#5adbbf",
  "#ffc658",
  "#b0d0f7",
  "#ffa500",
  "#c0392b",
  "#8e44ad",
  "#3498db",
  "#27ae60",
  "#f1c40f",
  "#9b59b6",
]; // Different colors for each slice

const UserStaffPieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default UserStaffPieChart;

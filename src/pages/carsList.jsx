import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import ShimmerTable from "./loder";

const API_URL = "https://vmcarapp-4a377bf5c0d0.herokuapp.com/api/admin/get-all-cars";

const CarsDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRides, setTotalRides] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCars(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const fetchCars = async (currentPage, limit) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          page: currentPage + 1, // API pages are 1-based, not 0-based
          limit,
        },
        headers: {
          "token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDRiZDdlODQwYWU4OGE3N2RhYTUxNCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyNjUwMDE3LCJleHAiOjE3MzUyNDIwMTd9.YL-JmAiQMWrIpoY_y9olmDoV7DoPHGDkJLytAA9bX9A`, // Use your actual token
        },
      });

      console.log(response.data.data)
      setUsers(response.data.data.carList
); // Adjust based on the API response structure
      setTotalRides(response.data.data.pagination.totalCars); // Total number of items
      setTotalPages(response.data.data.pagination.totalPages); // Total pages
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: "20px", backgroundColor: "transparent" }}>
       <div
        style={{
          marginTop: "100px",
          marginLeft: "20px",
          backgroundColor: "#181b3a",
          color: "white",
        }}
      ></div>
      <AppBar
        position="static"
        style={{
          marginLeft: "15px",
          width: "98%",
          marginRight: "15px",
          backgroundColor: "#020337",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
      >
        <Toolbar>
        <Typography variant="h6" style={{color:"white",fontSize:25,fontFamily: "Bungee Spice",}}>
            BOOKINGS LIST
          </Typography>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}    style={{
          margin: "16px",
          width: "98%",
          backgroundColor: "#020337",
          border: "1px solid #8b8b93",
          color: "#333333",
          boxShadow: "10px 10px 16px rgba(0, 0, 0, 0.1)",
        }}>
           {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
     <ShimmerTable row={5} col={5} color="#020337" />;
      </div>
        ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Registration ID</TableCell>
              <TableCell style={{ color: "white" }}>Driver Name</TableCell>
              <TableCell style={{ color: "white" }}>Driver Email</TableCell>

            
              <TableCell style={{ color: "white" }}>Car Type</TableCell>
              <TableCell style={{ color: "white" }}>Car Model</TableCell>
              <TableCell style={{ color: "white" }}>Total Seats</TableCell>


              <TableCell style={{ color: "white" }}>Car Year</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((car,index) => (
              <TableRow key={car._id}>
                <TableCell style={{ color: "white" }}>{car.registrationNumber}</TableCell>
                <TableCell style={{ color: "white" }}>{car.userId.fullName}</TableCell>
                <TableCell style={{ color: "white" }}>{car.userId.email}</TableCell>
                

                <TableCell style={{ color: "white" }}>{car.carType}</TableCell>
                <TableCell style={{ color: "white" }}>{car.carModel}</TableCell>
                <TableCell style={{ color: "white" }}>{car.numberOfSeats}</TableCell>
                <TableCell style={{ color: "white" }}>{car.carYear}</TableCell>
                
                <TableCell style={{ color: "white" }}>{car.createdAt.toString().substring(0,10)}</TableCell>
               

                <TableCell>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>)}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRides}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }}
      />
    </div>
  );
};

export default CarsDashboard;

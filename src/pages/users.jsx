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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import Shimmer from "./loder";
import ShimmerTable from "./loder";
import { fetchUsersList } from "../services/ApiServices";

const UserDashboard = () => {
  const [users, setUsers] = useState([]); // User data from API
  const [loading, setLoading] = useState(false); // Loading state
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Rows per page
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const API_URL =
    "https://vmcarapp-4a377bf5c0d0.herokuapp.com/api/admin/get-all-users";

  // Fetch data from the API
  const fetchUsers = async (currentPage, limit) => {
    setLoading(true);
    try {
      const response = await fetchUsersList(currentPage + 1, limit);
      setUsers(response.data); // Adjust if API response structure differs
      setTotalUsers(response.pagination.totalUsers); // Adjust according to total count in the API
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    fetchUsers(newPage, rowsPerPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to the first page
    fetchUsers(0, newRowsPerPage);
  };

  // Fetch data on initial render and when pagination changes
  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, []);

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
          <Typography
            variant="h6"
            style={{
              color: "white !important",
              fontSize: 25,
              fontFamily: "Bungee Spice",
            }}
          >
            USERS LIST
          </Typography>
        </Toolbar>
      </AppBar>

      <TableContainer
        component={Paper}
        style={{
          margin: "16px",
          width: "98%",
          backgroundColor: "#020337",
          border: "1px solid #8b8b93",
          color: "#333333",
          boxShadow: "10px 10px 16px rgba(0, 0, 0, 0.1)",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
            <ShimmerTable row={5} col={5} color="red" />;
          </div>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Email
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Status
                </TableCell>
                <TableCell style={{ color: "white", fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ color: "white" }}>
                    {user.fullName}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>{user.email}</TableCell>
                  <TableCell style={{ color: "white" }}>
                    {user.online == true ? "Online" : "Offline"}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => setOpenEditDialog(true)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => setOpenDeleteDialog(true)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalUsers}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "#01d293" }}
      />
    </div>
  );
};

export default UserDashboard;

import React, { useState } from "react";
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
  TextField,
  TablePagination, // Import TablePagination
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Staff" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Staff" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Staff" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Staff" },
  { id: 1, name: "John Doe", email: "john@example.com", role: "Staff" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Staff" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Staff" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Staff" },
  { id: 1, name: "John Doe", email: "john@example.com", role: "Staff" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Staff" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Staff" },
  { id: 4, name: "Bob Brown", email: "bob@example.com", role: "Staff" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Staff" },
  // Add more users as needed
];

const StaffDashboard = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setOpenEditDialog(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleEditConfirm = () => {
    // Handle the edit logic here
    handleCloseDialog();
  };

  const handleDeleteConfirm = () => {
    // Handle the delete logic here
    handleCloseDialog();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ margin: "2px", backgroundColor: "#181b3a" }}>
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
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
      >
        <Toolbar>
          <Typography variant="h6">Staff Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <TableContainer
        component={Paper}
        style={{
          margin: "16px",
          width: "98%",
          backgroundColor: "#181b3a",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Email</TableCell>
              <TableCell style={{ color: "white" }}>Role</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ color: "white" }}>{user.name}</TableCell>
                  <TableCell style={{ color: "white" }}>{user.email}</TableCell>
                  <TableCell style={{ color: "white" }}>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(user)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(user)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]} // Options for rows per page
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }} // Set pagination color to white
      />

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Role"
            type="text"
            fullWidth
            variant="outlined"
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {selectedUser?.name}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StaffDashboard;

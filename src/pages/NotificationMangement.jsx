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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  TablePagination,
  Checkbox,
} from "@mui/material";

const initialUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com" },
  { id: 2, name: "Bob Smith", email: "bob@example.com" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com" },
  // ... other users
];

const initialStaff = [
  { id: 1, name: "David Wilson", email: "david@example.com" },
  { id: 2, name: "Eve Davis", email: "eve@example.com" },
  // ... other staff
];

const initialNotifications = [];

const NotificationManagement = () => {
  const [users] = useState(initialUsers);
  const [staff] = useState(initialStaff);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [pageUser, setPageUser] = useState(0);
  const [pageStaff, setPageStaff] = useState(0);
  const [rowsPerPageUser, setRowsPerPageUser] = useState(5);
  const [rowsPerPageStaff, setRowsPerPageStaff] = useState(5);
  const [viewedNotification, setViewedNotification] = useState(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUsers([]);
    setSelectedStaff([]);
    setNewMessage("");
  };

  const handleSendNotification = () => {
    const allSelected = [...selectedUsers, ...selectedStaff];
    if (allSelected.length > 0) {
      const newNotification = {
        id: notifications.length + 1,
        recipients: allSelected,
        message: newMessage,
        date: new Date().toLocaleDateString(),
      };
      setNotifications((prev) => [...prev, newNotification]);
      setSnackbarOpen(true);
    }
    handleCloseDialog();
  };

  const handleViewNotification = (notification) => {
    setViewedNotification(notification);
  };

  const handleChangePageUser = (event, newPage) => {
    setPageUser(newPage);
  };

  const handleChangePageStaff = (event, newPage) => {
    setPageStaff(newPage);
  };

  const handleChangeRowsPerPageUser = (event) => {
    setRowsPerPageUser(parseInt(event.target.value, 10));
    setPageUser(0);
  };

  const handleChangeRowsPerPageStaff = (event) => {
    setRowsPerPageStaff(parseInt(event.target.value, 10));
    setPageStaff(0);
  };

  const handleSelectUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleSelectStaff = (id) => {
    setSelectedStaff((prev) =>
      prev.includes(id)
        ? prev.filter((staffId) => staffId !== id)
        : [...prev, id]
    );
  };

  return (
    <div style={{ margin: "20px" }}>
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
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
      >
        <Toolbar>
          <Typography variant="h6">Notification Management</Typography>
        </Toolbar>
      </AppBar>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenDialog}
        style={{
          margin: "20px 0",
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
      >
        Send Notification
      </Button>
      <Typography variant="h6" style={{ color: "white" }}>
        Notification History
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Message</TableCell>
              <TableCell style={{ color: "white" }}>Recipients</TableCell>
              <TableCell style={{ color: "white" }}>Sending Date</TableCell>
              <TableCell style={{ color: "white" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications.map((notification) => (
              <TableRow key={notification.id}>
                <TableCell style={{ color: "white" }}>
                  {notification.message}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {notification.recipients.length}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {notification.date}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleViewNotification(notification)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" style={{ color: "white", marginTop: "20px" }}>
        Users
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>
                <Checkbox
                  style={{ color: "white" }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(users.map((user) => user.id));
                    } else {
                      setSelectedUsers([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(
                pageUser * rowsPerPageUser,
                pageUser * rowsPerPageUser + rowsPerPageUser
              )
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      style={{ color: "white" }}
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </TableCell>
                  <TableCell style={{ color: "white" }}>{user.name}</TableCell>
                  <TableCell style={{ color: "white" }}>{user.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPageUser}
          page={pageUser}
          onPageChange={handleChangePageUser}
          onRowsPerPageChange={handleChangeRowsPerPageUser}
          sx={{
            color: "white", // Text color
            "& .MuiTablePagination-actions .MuiButtonBase-root": {
              color: "lightblue", // Change icon color
            },
          }}
        />
      </TableContainer>
      <Typography variant="h6" style={{ color: "white", marginTop: "20px" }}>
        Staff
      </Typography>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>
                <Checkbox
                  style={{ color: "white" }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStaff(staff.map((member) => member.id));
                    } else {
                      setSelectedStaff([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staff
              .slice(
                pageStaff * rowsPerPageStaff,
                pageStaff * rowsPerPageStaff + rowsPerPageStaff
              )
              .map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <Checkbox
                      style={{ color: "white" }}
                      checked={selectedStaff.includes(member.id)}
                      onChange={() => handleSelectStaff(member.id)}
                    />
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {member.name}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {member.email}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={staff.length}
          rowsPerPage={rowsPerPageStaff}
          page={pageStaff}
          onPageChange={handleChangePageStaff}
          onRowsPerPageChange={handleChangeRowsPerPageStaff}
          sx={{
            color: "white", // Text color
            "& .MuiTablePagination-actions .MuiButtonBase-root": {
              color: "lightblue", // Change icon color
            },
          }}
        />
      </TableContainer>
      {/* Notification Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Notification Message"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSendNotification} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Notification sent successfully"
      />
      {/* View Notification Details */}
      {viewedNotification && (
        <Dialog
          open={Boolean(viewedNotification)}
          onClose={() => setViewedNotification(null)}
          maxWidth="sm" // Limit the width for a more compact look
          fullWidth // Make the dialog full-width
        >
          <DialogTitle
            style={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}
          >
            Notification Details
          </DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Message
            </Typography>
            <Typography variant="body1" style={{ marginBottom: "20px" }}>
              {viewedNotification.message}
            </Typography>

            <Typography variant="h6" gutterBottom>
              Sent To
            </Typography>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              {viewedNotification.recipients.map((id) => {
                const recipient = [...users, ...staff].find(
                  (user) => user.id === id
                );
                return (
                  <li key={id} style={{ marginBottom: "10px" }}>
                    {recipient ? (
                      <Typography variant="body1">
                        {recipient.name}{" "}
                        <span style={{ color: "#888" }}>
                          ({recipient.email})
                        </span>
                      </Typography>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setViewedNotification(null)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default NotificationManagement;

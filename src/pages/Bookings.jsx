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
  TablePagination,
} from "@mui/material";
import { Edit, Delete, Info } from "@mui/icons-material";

// Sample data for bookings with tracking info
const bookings = [
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-10-23",
    status: "Pending",
    tracking: "TRK456",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-10-23",
    status: "Pending",
    tracking: "TRK456",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-10-23",
    status: "Pending",
    tracking: "TRK456",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-10-23",
    status: "Pending",
    tracking: "TRK456",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  {
    id: 2,
    customer: "Jane Smith",
    date: "2024-10-23",
    status: "Pending",
    tracking: "TRK456",
  },
  {
    id: 1,
    customer: "John Doe",
    date: "2024-10-24",
    status: "Confirmed",
    tracking: "TRK123",
  },
  // ... more bookings
];

const BookingDashboard = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openTrackDialog, setOpenTrackDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editCustomer, setEditCustomer] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editStatus, setEditStatus] = useState("");

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEditClick = (booking) => {
    setSelectedBooking(booking);
    setEditCustomer(booking.customer);
    setEditDate(booking.date);
    setEditStatus(booking.status);
    setOpenEditDialog(true);
  };

  const handleTrackClick = (booking) => {
    setSelectedBooking(booking);
    setOpenTrackDialog(true);
  };

  const handleDeleteClick = (booking) => {
    setSelectedBooking(booking);
    setOpenDeleteDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenEditDialog(false);
    setOpenDeleteDialog(false);
    setOpenTrackDialog(false);
    setSelectedBooking(null);
  };

  const handleEditConfirm = () => {
    // Handle edit logic here
    handleCloseDialog();
  };

  const handleDeleteConfirm = () => {
    // Handle delete logic here
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
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
      >
        <Toolbar>
          <Typography variant="h6">Booking Dashboard</Typography>
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
              <TableCell style={{ color: "white" }}>Booking ID</TableCell>
              <TableCell style={{ color: "white" }}>Customer Name</TableCell>
              <TableCell style={{ color: "white" }}>Date</TableCell>
              <TableCell style={{ color: "white" }}>Status</TableCell>
              <TableCell style={{ color: "white" }}>Tracking</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell style={{ color: "white" }}>{booking.id}</TableCell>
                  <TableCell style={{ color: "white" }}>
                    {booking.customer}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {booking.date}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {booking.status}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {booking.tracking}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(booking)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteClick(booking)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      style={{ color: "white" }}
                      onClick={() => handleTrackClick(booking)}
                    >
                      <Info />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={bookings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }}
      />

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Customer Name"
            fullWidth
            value={editCustomer}
            onChange={(e) => setEditCustomer(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Status"
            fullWidth
            value={editStatus}
            onChange={(e) => setEditStatus(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditConfirm}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this booking?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Tracking Dialog */}
      <Dialog open={openTrackDialog} onClose={handleCloseDialog}>
        <DialogTitle>Tracking Information</DialogTitle>
        <DialogContent>
          {selectedBooking && (
            <>
              <Typography variant="body1">
                Tracking Number: {selectedBooking.tracking}
              </Typography>
              <Typography variant="body1">
                Status: {selectedBooking.status}
              </Typography>
              {/* Add more tracking details as necessary */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookingDashboard;

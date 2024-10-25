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
  Snackbar,
  TablePagination,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const initialPromoCodes = [
  {
    id: 1,
    code: "SUMMER2024",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    maxUses: 100,
    usesLeft: 75,
    isValid: true,
  },
  {
    id: 2,
    code: "WINTER2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    maxUses: 50,
    usesLeft: 20,
    isValid: false,
  },
  {
    id: 1,
    code: "SUMMER2024",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    maxUses: 100,
    usesLeft: 75,
    isValid: true,
  },
  {
    id: 2,
    code: "WINTER2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    maxUses: 50,
    usesLeft: 20,
    isValid: false,
  },
  {
    id: 1,
    code: "SUMMER2024",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    maxUses: 100,
    usesLeft: 75,
    isValid: true,
  },
  {
    id: 2,
    code: "WINTER2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    maxUses: 50,
    usesLeft: 20,
    isValid: false,
  },
  {
    id: 1,
    code: "SUMMER2024",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    maxUses: 100,
    usesLeft: 75,
    isValid: true,
  },
  {
    id: 2,
    code: "WINTER2024",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    maxUses: 50,
    usesLeft: 20,
    isValid: false,
  },
  // Add more initial promo codes as needed
];

const PromoCodeManagement = () => {
  const [promoCodes, setPromoCodes] = useState(initialPromoCodes);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPromoCode, setSelectedPromoCode] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenDialog = (promoCode) => {
    setSelectedPromoCode(promoCode);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPromoCode(null);
  };

  const handleSavePromoCode = () => {
    if (selectedPromoCode) {
      setPromoCodes((prev) =>
        prev.map((promoCode) =>
          promoCode.id === selectedPromoCode.id ? selectedPromoCode : promoCode
        )
      );
    } else {
      const newPromoCode = {
        id: promoCodes.length + 1,
        code: "NEWCODE",
        startDate: "",
        endDate: "",
        maxUses: 0,
        usesLeft: 0,
        isValid: true,
      };
      setPromoCodes((prev) => [...prev, newPromoCode]);
    }
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleDeletePromoCode = (id) => {
    setPromoCodes((prev) => prev.filter((promoCode) => promoCode.id !== id));
    setSnackbarOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          <Typography variant="h6">Promo Code Management</Typography>
        </Toolbar>
      </AppBar>

      <Button
        variant="contained"
        startIcon={<Add />}
        style={{
          margin: "20px 0",
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
        onClick={() => handleOpenDialog(null)}
      >
        Add Promo Code
      </Button>

      <TableContainer
        component={Paper}
        style={{
          marginTop: "20px",
          backgroundColor: "#181b3a",
          color: "white",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Code</TableCell>
              <TableCell style={{ color: "white" }}>Start Date</TableCell>
              <TableCell style={{ color: "white" }}>End Date</TableCell>
              <TableCell style={{ color: "white" }}>Max Uses</TableCell>
              <TableCell style={{ color: "white" }}>Uses Left</TableCell>
              <TableCell style={{ color: "white" }}>Valid</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promoCodes
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((promoCode) => (
                <TableRow key={promoCode.id}>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.code}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.startDate}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.endDate}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.maxUses}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.usesLeft}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    {promoCode.isValid ? "Yes" : "No"}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <IconButton onClick={() => handleOpenDialog(promoCode)}>
                      <Edit color="success" />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeletePromoCode(promoCode.id)}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={promoCodes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }}
      />

      {/* Promo Code Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedPromoCode ? "Edit Promo Code" : "Add Promo Code"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Promo Code"
            fullWidth
            value={selectedPromoCode ? selectedPromoCode.code : ""}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                code: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            value={selectedPromoCode ? selectedPromoCode.startDate : ""}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                startDate: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            value={selectedPromoCode ? selectedPromoCode.endDate : ""}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                endDate: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Max Uses"
            type="number"
            fullWidth
            value={selectedPromoCode ? selectedPromoCode.maxUses : ""}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                maxUses: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Uses Left"
            type="number"
            fullWidth
            value={selectedPromoCode ? selectedPromoCode.usesLeft : ""}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                usesLeft: parseInt(e.target.value),
              })
            }
          />
          <TextField
            margin="dense"
            label="Valid"
            type="checkbox"
            checked={selectedPromoCode ? selectedPromoCode.isValid : false}
            onChange={(e) =>
              setSelectedPromoCode({
                ...selectedPromoCode,
                isValid: e.target.checked,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSavePromoCode}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Operation completed successfully"
      />
    </div>
  );
};

export default PromoCodeManagement;

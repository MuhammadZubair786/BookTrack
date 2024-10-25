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
  Snackbar,
} from "@mui/material";
import { Edit, Delete, MonetizationOn, Info } from "@mui/icons-material";

// Sample data for drivers with wallet info (use the updated drivers array here)
const drivers = [
  // ... the full drivers array from above ...
];

const DriverWalletManagementDashboard = () => {
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [openDepositDialog, setOpenDepositDialog] = useState(false);
  const [openWithdrawDialog, setOpenWithdrawDialog] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const drivers = [
    {
      id: 1,
      name: "Alice Johnson",
      balance: 150.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 100.0, date: "2024-10-01" },
        { id: 2, type: "Withdrawal", amount: 50.0, date: "2024-10-15" },
      ],
    },
    {
      id: 2,
      name: "Bob Smith",
      balance: 75.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 75.0, date: "2024-10-10" },
      ],
    },
    {
      id: 3,
      name: "Charlie Brown",
      balance: 200.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 200.0, date: "2024-10-05" },
      ],
    },
    {
      id: 4,
      name: "Diana Prince",
      balance: 120.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 150.0, date: "2024-10-02" },
        { id: 2, type: "Withdrawal", amount: 30.0, date: "2024-10-20" },
      ],
    },
    {
      id: 5,
      name: "Edward Elric",
      balance: 90.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 100.0, date: "2024-10-03" },
        { id: 2, type: "Withdrawal", amount: 10.0, date: "2024-10-18" },
      ],
    },
    {
      id: 6,
      name: "Fiona Glenanne",
      balance: 180.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 180.0, date: "2024-10-08" },
      ],
    },
    {
      id: 7,
      name: "George Bailey",
      balance: 60.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 60.0, date: "2024-10-09" },
        { id: 2, type: "Withdrawal", amount: 10.0, date: "2024-10-16" },
      ],
    },
    {
      id: 8,
      name: "Hannah Montana",
      balance: 150.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 150.0, date: "2024-10-07" },
      ],
    },
    {
      id: 9,
      name: "Isaac Newton",
      balance: 50.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 50.0, date: "2024-10-04" },
      ],
    },
    {
      id: 10,
      name: "Jack Sparrow",
      balance: 120.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 120.0, date: "2024-10-06" },
      ],
    },
    {
      id: 11,
      name: "Luna Lovegood",
      balance: 200.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 200.0, date: "2024-10-12" },
      ],
    },
    {
      id: 12,
      name: "Mickey Mouse",
      balance: 90.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 90.0, date: "2024-10-11" },
      ],
    },
    {
      id: 13,
      name: "Nina Williams",
      balance: 80.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 80.0, date: "2024-10-09" },
        { id: 2, type: "Withdrawal", amount: 10.0, date: "2024-10-17" },
      ],
    },
    {
      id: 14,
      name: "Owen Wilson",
      balance: 110.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 110.0, date: "2024-10-08" },
      ],
    },
    {
      id: 15,
      name: "Penny Lane",
      balance: 135.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 135.0, date: "2024-10-05" },
      ],
    },
    {
      id: 16,
      name: "Quinn Fabray",
      balance: 95.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 95.0, date: "2024-10-03" },
      ],
    },
    {
      id: 17,
      name: "Ron Weasley",
      balance: 125.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 125.0, date: "2024-10-12" },
      ],
    },
    {
      id: 18,
      name: "Steve Rogers",
      balance: 140.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 140.0, date: "2024-10-10" },
      ],
    },
    {
      id: 19,
      name: "Tina Belcher",
      balance: 55.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 55.0, date: "2024-10-07" },
      ],
    },
    {
      id: 20,
      name: "Ursula K. Le Guin",
      balance: 160.0,
      transactions: [
        { id: 1, type: "Deposit", amount: 160.0, date: "2024-10-06" },
      ],
    },
  ];

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDepositClick = (driver) => {
    setSelectedDriver(driver);
    setOpenDepositDialog(true);
  };

  const handleWithdrawClick = (driver) => {
    setSelectedDriver(driver);
    setOpenWithdrawDialog(true);
  };

  const handleViewTransactionsClick = (driver) => {
    setSelectedDriver(driver);
    setOpenTransactionDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDepositDialog(false);
    setOpenWithdrawDialog(false);
    setOpenTransactionDialog(false);
    setSelectedDriver(null);
  };

  const handleDepositConfirm = () => {
    if (selectedDriver) {
      selectedDriver.balance += parseFloat(depositAmount);
      selectedDriver.transactions.push({
        id: selectedDriver.transactions.length + 1,
        type: "Deposit",
        amount: parseFloat(depositAmount),
        date: new Date().toLocaleDateString(),
      });
    }
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleWithdrawConfirm = () => {
    if (selectedDriver) {
      selectedDriver.balance -= parseFloat(withdrawAmount);
      selectedDriver.transactions.push({
        id: selectedDriver.transactions.length + 1,
        type: "Withdrawal",
        amount: parseFloat(withdrawAmount),
        date: new Date().toLocaleDateString(),
      });
    }
    setSnackbarOpen(true);
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
          <Typography variant="h6">
            Driver Wallet Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <TableContainer
        component={Paper}
        style={{
          margin: "20px 0",
          backgroundColor: "transparent",
          boxShadow: "0 2px 10px #111b6a",
          border: "1px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Driver ID
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Driver Name
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Wallet Balance
              </TableCell>
              <TableCell style={{ fontWeight: "bold", color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drivers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell style={{ color: "white" }}>{driver.id}</TableCell>
                  <TableCell style={{ color: "white" }}>
                    {driver.name}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    ${driver.balance.toFixed(2)}
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleDepositClick(driver)}
                    >
                      <MonetizationOn />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleWithdrawClick(driver)}
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => handleViewTransactionsClick(driver)}
                      style={{ color: "yellow" }}
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
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={drivers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        style={{ color: "white" }}
      />

      {/* Dialogs and Snackbar remain unchanged */}
      {/* Deposit Dialog */}
      <Dialog open={openDepositDialog} onClose={handleCloseDialog}>
        <DialogTitle>Deposit Amount</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Deposit Amount"
            type="number"
            fullWidth
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleDepositConfirm}>Deposit</Button>
        </DialogActions>
      </Dialog>

      {/* Withdraw Dialog */}
      <Dialog open={openWithdrawDialog} onClose={handleCloseDialog}>
        <DialogTitle>Withdraw Amount</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Withdraw Amount"
            type="number"
            fullWidth
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleWithdrawConfirm}>Withdraw</Button>
        </DialogActions>
      </Dialog>

      {/* Transaction History Dialog */}
      <Dialog open={openTransactionDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          Transaction History for {selectedDriver?.name}
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedDriver &&
                selectedDriver.transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Transaction completed successfully"
      />
    </div>
  );
};

export default DriverWalletManagementDashboard;

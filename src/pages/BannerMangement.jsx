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
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";

const initialBanners = [
  {
    id: 1,
    name: "Summer Sale",
    type: "Promotion",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAy20Otr9SwnGSvjEFiI20tXUgxk6EDQEvlA&s",
    description: "Big discounts on summer clothing!",
    isVisible: true,
  },
  {
    id: 2,
    name: "New Arrivals",
    type: "New Products",
    image:
      "https://img.freepik.com/free-vector/abstract-website-banner-with-modern-shapes_1361-1738.jpg",
    description: "Check out the latest arrivals in our store.",
    isVisible: false,
  },
  // Add more initial banners as needed
];

const BannerManagement = () => {
  const [banners, setBanners] = useState(initialBanners);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpenDialog = (banner) => {
    setSelectedBanner(banner);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBanner(null);
  };

  const handleSaveBanner = () => {
    if (selectedBanner) {
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === selectedBanner.id ? selectedBanner : banner
        )
      );
    } else {
      const newBanner = {
        id: banners.length + 1,
        name: "New Banner",
        type: "Type",
        image: "",
        description: "",
        isVisible: true,
      };
      setBanners((prev) => [...prev, newBanner]);
    }
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleDeleteBanner = (id) => {
    setBanners((prev) => prev.filter((banner) => banner.id !== id));
    setSnackbarOpen(true);
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
          <Typography variant="h6">Banner Management</Typography>
        </Toolbar>
      </AppBar>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        style={{
          margin: "20px 0",
          backgroundColor: "transparent",
          boxShadow: "1px 2px 10px rgba(1, 210, 147, 0.5)",
        }}
        onClick={() => handleOpenDialog(null)}
      >
        Add Banner
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
              <TableCell style={{ color: "white" }}>Name</TableCell>
              <TableCell style={{ color: "white" }}>Type</TableCell>
              <TableCell style={{ color: "white" }}>Image</TableCell>
              <TableCell style={{ color: "white" }}>Description</TableCell>
              <TableCell style={{ color: "white" }}>Visible</TableCell>
              <TableCell style={{ color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell style={{ color: "white" }}>{banner.name}</TableCell>
                <TableCell style={{ color: "white" }}>{banner.type}</TableCell>
                <TableCell>
                  <div
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: "50%",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid #ccc",
                    }}
                  >
                    <img
                      src={banner.image}
                      alt={banner.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </TableCell>

                <TableCell style={{ color: "white" }}>
                  {banner.description}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  {banner.isVisible ? "Yes" : "No"}
                </TableCell>
                <TableCell style={{ color: "white" }}>
                  <IconButton onClick={() => handleOpenDialog(banner)}>
                    <Edit color="success" />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteBanner(banner.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Banner Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {selectedBanner ? "Edit Banner" : "Add Banner"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Banner Name"
            fullWidth
            value={selectedBanner ? selectedBanner.name : ""}
            onChange={(e) =>
              setSelectedBanner({ ...selectedBanner, name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Banner Type"
            fullWidth
            value={selectedBanner ? selectedBanner.type : ""}
            onChange={(e) =>
              setSelectedBanner({ ...selectedBanner, type: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Banner Image URL"
            fullWidth
            value={selectedBanner ? selectedBanner.image : ""}
            onChange={(e) =>
              setSelectedBanner({ ...selectedBanner, image: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={selectedBanner ? selectedBanner.description : ""}
            onChange={(e) =>
              setSelectedBanner({
                ...selectedBanner,
                description: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            label="Visible"
            type="checkbox"
            checked={selectedBanner ? selectedBanner.isVisible : false}
            onChange={(e) =>
              setSelectedBanner({
                ...selectedBanner,
                isVisible: e.target.checked,
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveBanner}>Save</Button>
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

export default BannerManagement;

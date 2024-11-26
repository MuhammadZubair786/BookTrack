import axios from 'axios';

const API_URL = "https://vmcarapp-4a377bf5c0d0.herokuapp.com/api/admin/get-all-users";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDRiZDdlODQwYWU4OGE3N2RhYTUxNCIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMyNjUwMDE3LCJleHAiOjE3MzUyNDIwMTd9.YL-JmAiQMWrIpoY_y9olmDoV7DoPHGDkJLytAA9bX9A"
// Function to fetch users with pagination
const fetchUsersList = async (currentPage, limit) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        page: currentPage + 1, // API pages are 1-based, not 0-based
        limit,
      },
      headers: {
        "token": token, // Authorization token passed as a parameter
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// Function to get total users (if needed separately)


export { fetchUsersList, };

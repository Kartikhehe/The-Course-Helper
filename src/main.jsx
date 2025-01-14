import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, redirect } from "react-router-dom";
import "./index.css";
import Bar from "./appBar.jsx";
import Card from "./cards.jsx";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LoginPage from "./LoginPage/login.jsx";
import AddButton from "./addButton.jsx";
import LottiePlayer from "./Loading.jsx"
import RegisterPage from "./RegisterPage/register.jsx"
import { Navigate } from "react-router-dom";
import Copyright from "./copyright.jsx";
import CourseSearchBar from "./searchBar.jsx"

// Protected Route Wrapper
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Check if token exists
  return token ? children : <Navigate to="/login" />;
}

// Function to render cards for courses
function createCard(course, handleDelete, handleUpdate, fetchCourses) {
  return (
    <Card
      id={course.id}
      CourseName={course.name}
      CourseCode={course.code}
      Credits={course.credit}
      Description={course.description}
      ImageURL={course.image}
      handleDelete={handleDelete}
      handleUpdate={handleUpdate}
      fetchCourses = {fetchCourses}
    />
  );
}


  // Handle course update
  const handleUpdate = (id, updatedCourse) => {
    // Find the course in the state and update it
    setFilteredCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id ? { ...updatedCourse } : course
      )
    );

    handleClose();

    
  };

 
  
// Homepage component
function Homepage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses


  // Function to fetch courses from the backend
  const fetchCourses = () => {
    setLoading(true);
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
  
    fetch("http://localhost:1050/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error("Unauthorized. Please log in.");
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setFilteredCourses(data); // Set filtered courses to initial data
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  
   // Handle course deletion
   const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch(`http://localhost:1050/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include token here
        },
      });
  
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          alert("Unauthorized. Please log in to delete courses.");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
          throw new Error("Unauthorized. Please log in.");
        }
        throw new Error(`Failed to delete course. Status: ${response.status}`);
      }
  
      // Immediately update the state after successful deletion
      setFilteredCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));

  
      alert("Course deleted successfully!");
      // Optionally, refresh courses from the backend if necessary
      fetchCourses();
  
    } catch (error) {
      console.error("Error deleting course:", error);
      const errorMessage = error.message || JSON.stringify(error); // Convert error to string if it's an object
      alert(`Failed to delete course. Error: ${errorMessage}`);
    }
    
  };
  

  useEffect(() => {
    fetchCourses(); // Fetch courses on initial render
  }, []);

  // const handleDelete = (id) => {
  //   fetch(`http://localhost:1050/courses/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         fetchCourses(); // Re-fetch courses after successful deletion
  //       } else {
  //         console.error("Failed to delete course");
  //       }
  //     })
  //     .catch((error) => console.error("Error deleting course:", error));
  // };

  const handleUpdate = (id, updatedCourse) => {
    fetch(`http://localhost:1050/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => response.json())
      .then(() => {
        fetchCourses(); // Re-fetch courses after successful update
      })
      .catch((error) => {
        if (error.message.includes("Unauthorized")) {
          localStorage.removeItem("token"); // Remove invalid token
          window.location.href = "/login";  // Redirect to login page
        } else {
          console.error(error.message);
        }
      });
      
  };

  const addCourse = async (newCourse) => {
    const token = localStorage.getItem("token");
  
    try {
      const response = await fetch("http://localhost:1050/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCourse),
      });
  
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          alert("Unauthorized. Please log in to add courses.");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
          return;
        }
        throw new Error(`Failed to add course. Status: ${response.status}`);
      }
  
      const addedCourse = await response.json();
  
      // Update courses state (optimistic update)
      setFilteredCourses((prevCourses) => [...prevCourses, addedCourse]);

  
      alert("Course added successfully!");
    } catch (error) {
      console.error("Error adding course:", error.message);
      alert("Failed to add course. Please try again.");
    }
  };
  

  if (loading) {
    return <div className="Loading"><LottiePlayer/></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  
  return (
    <>
      <Bar />
      <CourseSearchBar
        courses={courses}
        onSearch={setFilteredCourses} // Pass filteredCourses setter to search bar
      />
      <Box sx={{ flexGrow: 1, padding: "16px", overflow:"auto" }}>
        <Grid container spacing={3}>
          {filteredCourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} key={course.id}>
              <Card
                id={course.id}
                CourseName={course.name}
                CourseCode={course.code}
                Credits={course.credit}
                Description={course.description}
                ImageURL={course.image}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
          <Copyright></Copyright>

      <AddButton onAdd={addCourse} />
      
    </>
  );
}



// Render the application
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LoginPage />
    </div>} />
        <Route path="/courses" element={ <Homepage />} />
        <Route path="/" element={ <Homepage />} />
        <Route path="/register" element={<div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <RegisterPage />
    </div>}></Route>
      </Routes>
    </Router>
  </StrictMode>
);

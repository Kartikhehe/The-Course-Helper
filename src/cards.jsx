import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "15px",
  p: 4,
};

export default function ActionAreaCard({ id, CourseName, CourseCode, Credits, Description, ImageURL, handleDelete, handleUpdate, fetchCourses }) {
  const [open, setOpen] = React.useState(false);
  const [updatedCourse, setUpdatedCourse] = React.useState({
    name: CourseName,
    code: CourseCode,
    credit: Credits,
    image: ImageURL,
    description: Description,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);





  //handle submit
  const handleSubmit = () => {
    const token = localStorage.getItem("token");
  
    fetch(`http://localhost:1050/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token here
      },
      body: JSON.stringify(updatedCourse),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert("Please login to edit courses!");
            window.location.href = "/login";
            throw new Error("Unauthorized. Please log in.");
            
          }
          throw new Error(`Failed to update course: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        handleUpdate(id, data); // Call parent update function
        fetchCourses();
        handleClose();
      })
      .catch((error) => console.error("Error updating course:", error));
  };
  





  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ margin: 5 }}>
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="140"
            image={ImageURL}
            alt={CourseName}
          />
          <CardContent>
            <p><strong>Course : </strong>{CourseName}</p>
            <p><strong>Course Code : </strong>{CourseCode}</p>
            <p><strong>Credits : </strong>{Credits}</p>
            <p><strong>Description : </strong>{Description}</p>
          </CardContent>
        </CardActionArea>
        
        <Button sx={{ margin: 1 }} size='small' variant='contained' color='error' onClick={() => handleDelete(id)}>Delete</Button>
      </Card>

      {/* Modal for editing course */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h1 className='centerAlign'>Edit Course Details</h1>
          <TextField
            sx={{ margin: 2 }}
            required
            fullWidth
            label="Course Name"
            value={updatedCourse.name}
            onChange={(e) => setUpdatedCourse({ ...updatedCourse, name: e.target.value })}
          />
          <TextField
            sx={{ margin: 2 }}
            required
            label="Course Code"
            value={updatedCourse.code}
            onChange={(e) => setUpdatedCourse({ ...updatedCourse, code: e.target.value })}
          />
          <TextField
            sx={{ margin: 2 }}
            required
            label="Credits"
            value={updatedCourse.credit}
            onChange={(e) => setUpdatedCourse({ ...updatedCourse, credit: e.target.value })}
          />
          <TextField
            sx={{ margin: 2 }}
            required
            fullWidth
            label="Image URL"
            value={updatedCourse.image}
            onChange={(e) => setUpdatedCourse({ ...updatedCourse, image: e.target.value })}
          />
          <TextField
            sx={{ margin: 2 }}
            label="Description"
            rows={4}
            multiline
            fullWidth
            value={updatedCourse.description}
            onChange={(e) => setUpdatedCourse({ ...updatedCourse, description: e.target.value })}
          />
          <Button sx={{ margin: 1 }} size="medium" variant="contained" onClick={handleSubmit}>Submit</Button>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>

        </Box>
      </Modal>
    </Grid>
  );
}

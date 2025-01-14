import * as React from 'react';
import { Button, Modal, Box, TextField } from '@mui/material';

const addButtonStyle = {
    borderRadius: 5,
    fontSize: 18,
    position: "fixed",
    bottom: "5%",
    right: "4%",
    padding: 2
};

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

function AddButton({ onAdd }) {//our onAdd prop here is a json object
    const [open, setOpen] = React.useState(false);
    const [courseName, setCourseName] = React.useState('');
    const [courseCode, setCourseCode] = React.useState('');
    const [credits, setCredits] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [description, setDescription] = React.useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        // Clear input fields
        setCourseName('');
        setCourseCode('');
        setCredits('');
        setImageURL('');
        setDescription('');
    };

    const handleSubmit = () => {
        if (!courseName || !courseCode || !credits || !imageURL || !description) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        const newCourse = { name: courseName, code: courseCode, credit: credits, image: imageURL, description };
        onAdd(newCourse);
        handleClose();

    };

    return (
        <div>
            <Button sx={addButtonStyle} onClick={handleOpen} variant="contained">+ Add Course</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className='centerAlign'>Course Details</h1>
                    <TextField
                        sx={{ margin: 2 }}
                        required
                        fullWidth
                        label="Course Name"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: 2 }}
                        required
                        label="Course Code"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: 2 }}
                        required
                        label="Credits"
                        value={credits}
                        onChange={(e) => setCredits(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: 2 }}
                        required
                        fullWidth
                        label="Image URL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                    <TextField
                        sx={{ margin: 2 }}
                        label="Description"
                        rows={4}
                        multiline
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br />
                    <Button sx={{ margin: 1 }} size='medium' variant="contained" onClick={handleSubmit}>Submit</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default AddButton;

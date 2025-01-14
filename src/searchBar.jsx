import React, { useState } from "react";
import { Box, TextField, styled } from "@mui/material";
import { BiSearch } from "react-icons/bi";

const StyledSearchBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  paddingBottom: theme.spacing(0),
  backgroundColor: "#f5f5f5",
  borderRadius: theme.spacing(1),
}));

const CourseSearchBar = ({ courses, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    // Filter courses dynamically
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        course.code.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Update the filtered courses in the parent component
    onSearch(filtered);
  };

  return (
    <StyledSearchBox>
      <TextField
        fullWidth
        placeholder="Search courses by name or code..."
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <BiSearch size={24} style={{ marginRight: 8 }} />,
        }}
        variant="outlined"
      />
    </StyledSearchBox>
  );
};

export default CourseSearchBar;

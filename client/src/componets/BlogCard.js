import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Box, Typography } from '@mui/material'

import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { ModeEdit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// import { DndContext, closestCorners } from "@dnd-kit/core";
// import axios from "axios";




export default function BlogCard({
  title,
  description,
  image,
  // key,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  }
  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        // navigate("/my-blogs");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(image)
  return (
    
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover:": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display={"flex"}>
            <IconButton onClick={handleEdit} sx={{ marginLeft: 'auto' }}>
              <EditIcon color="info" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {username}
            </Avatar>
          }
          title={username}
          subheader={time}
        />
        {/* <img src="https://source.unsplash.com/random"
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
        alt="hero" /> */}
        <CardMedia
          component="img"
          height="240"
          image="https://source.unsplash.com/random"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" color="text.secondary">
            Title : {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description : {description}
          </Typography>
        </CardContent>
      </Card>
  );
}
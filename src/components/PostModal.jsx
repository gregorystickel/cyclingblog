import React, { useState } from "react";
import { Modal, Box, TextField, Grid, Typography, TextareaAutosize, Button } from "@mui/material";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { useSelector, useDispatch } from "react-redux"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

const PostModal = () => {
    const dispatch = useDispatch();
    const modalOpen = useSelector((state) => state.modalOpen)
    

    const firebaseConfig = {
        databaseURL: "https://test-66ad6-default-rtdb.firebaseio.com"
      }  
    
      const app = initializeApp(firebaseConfig);
      const database = getDatabase(app)
        
      function writeUserData(userPost) {
        set(ref(database, 'Posts'), {
          userPost
          
        });
      }

    const defaultValues = {
        imageURL: "",
        post: ""
        
      };

  const [formValues, setFormValues] = useState(defaultValues);
  const [userPost, setUserPost ] = useState([]);  
    
  const handleClose = () => {
    console.log("Add Post Clicked")
    dispatch({
        type: "SETMODALOPEN",
        payload: {
          modalOpen: false        
          
        },
      })
    console.log(modalOpen)
    // window.location.reload();  
};

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    setUserPost(userPost => [...userPost, formValues]);
    console.log("userPost", userPost)
    localStorage.setItem("userPost", JSON.stringify(userPost))
    writeUserData(userPost)
    handleClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };    

  return (
    <div>
     
    <Modal open={Boolean(modalOpen)} onClose={handleClose} onBackdropClick={handleClose}>
      <Box sx={style}>
      <Typography  component="span" sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
      Add Post  
      </Typography>
      <Grid item>  
      <Typography  component="span" sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
      <TextField
        id="imageURL-input"
        name="imageURL"
        label="Add Image URL"
        type="text"
        value={formValues.imageURL}
        onChange={handleInputChange}

        
      />
      </Typography>
      </Grid>
      <Grid item>
      <Typography  component="span" sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
      <TextareaAutosize
        id="post-input"
        name="post"
        label="post"
        type="text"
        value={formValues.post}
        onChange={handleInputChange}
        style={{ width: 400, height: 400 }}
      />
      </Typography>  
      </Grid>
      <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
       
      </Box>
    </Modal>
    
    </div>
  )
};




export default PostModal;

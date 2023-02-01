import React, { useEffect, useState } from "react";
import { Paper, Stack, CardMedia, CardContent, Typography, CardActions, Rating  } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import db from '../components/firebase';
import { onValue, ref } from 'firebase/database';


const MainScreen = () => {
  const [ratingValue, setRatingValue] = React.useState(2);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("Posts").onSnapshot((snapshot) => {
      const updatedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(updatedPosts);
    });

    return () => unsubscribe();
  }, []);
 
  console.log(posts)
  
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      alignItems="center"
    >
      <Paper
        variant="elevation"
        sx={{ padding: 2, width: 300, height: 400, marginTop: 5 }}
      >
        
        <CardMedia
        component="img"
        height="194"
        image="https://media.istockphoto.com/id/973722408/photo/silhouette-of-cyclist-on-the-background-of-beautiful-sunset.jpg?s=612x612&w=0&k=20&c=WiFWuNZkBHEY_7wdUMAxfTbonIFlR1z64QQhB5jZOQ8="
        alt="Cycling Image"
      />
        
        <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      
      
      <CardActions sx={{ padding: 5 }}>
        <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          setRatingValue(newValue);
        }}
      />
           
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        
      </CardActions>
      </Paper>
      
    </Stack>
  );
};
export default MainScreen;

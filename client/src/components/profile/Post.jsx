import React, { useEffect, useState } from 'react'
import "./post.css"
import axios from 'axios';
import { Button, Card, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Post = () => {
  const [posts, setPosts] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/posts", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPosts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (deletedID) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== deletedID));
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {posts?.map((oneproperty) => (
        <Property key={oneproperty._id} oneproperty={oneproperty} onDelete={handleDelete} />
      ))}
    </div>
  );
};

// export default Post;

export function Property({ oneproperty, onDelete }) {
  const navigate = useNavigate();
  const type = oneproperty.type || "";
  const description = oneproperty.description || "";
  const price = oneproperty.price || "";
  const location = oneproperty.location || "";
  const imageLink = oneproperty.imageLink || "";

  const handleDeletePost = async (ID) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://localhost:8000/user/deletepost/${ID}`, {
        headers: headers,
      });
      console.log("deleted");
      onDelete(ID);
    } catch (err) {
      console.log("error deleting the post", err);
    }
  };

  

  return (
    <div
      className="bg-card text-card-foreground w-full max-w-sm rounded-xl border shadow-sm overflow-hidden m-2.5"
      data-v0-t="card"
    >
      <div className="aspect-16/9">
        <img
          src={imageLink}
          width={400}
          height={225}
          alt="Property"
          style={{ aspectRatio: "400/225", objectFit: "cover" }}
        />
      </div>
      <div className="p-6">
        <h2 className="text-lg font-medium">{oneproperty.location}</h2>
        <div className="flex items-center space-x-4 text-2xl font-semibold mt-4">
          <div>{oneproperty.price} per month</div>
          <div className="text-base font-normal ml-auto">{oneproperty.type}</div>
        </div>
        <p className="text-sm leading-none text-gray-500 mt-2">
          {oneproperty.description}
        </p>
      </div>
      <div className="flex items-center p-4">
      <button
            className="inline-block w-full py-2 px-4 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 rounded-md mx-1.5"
            onClick={()=>{
                    navigate('/posts/'+ oneproperty._id);
                  }}
          >
            Edit          </button>
      <button
            className="inline-block w-full py-2 px-4 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 rounded-md"
            onClick={() => handleDeletePost(oneproperty._id)}
          >
            Delete
          </button>
      </div>
    </div>

   
  );

  // return (
  //   <Card style={{ margin: 10, width: 300, minHeight: 200, padding: 20 }}>
  //     <Grid container spacing={2}>
  //       <Grid item xs={12}>
  //         <Paper>
  //           <Typography textAlign={'center'} variant="h5">
  //             {type}
  //           </Typography>
  //           <Typography textAlign={'center'} variant="h5">
  //             {description}
  //           </Typography>
  //           <Typography textAlign={'center'} variant="h5">
  //             {price}
  //           </Typography>
  //           <Typography textAlign={'center'} variant="h5">
  //             {location}
  //           </Typography>
  //         </Paper>
  //       </Grid>
  //     </Grid>
  //     <Button onClick={() => handleDeletePost(oneproperty._id)}>
  //       Delete
  //     </Button>
  //     <Button
  //     onClick={()=>{
  //       navigate('/posts/'+ oneproperty._id);
  //     }}
  //     >
  //       Edit
  //     </Button>
  //   </Card>
  // );
}

// export default Property;
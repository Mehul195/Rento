
const jwt = require("jsonwebtoken");
const express = require('express');
const { User, Property, Bookmark, Post, Purchased } = require("../db");
const { authenticateJwt, SECRET } = require("../middleware/"); 

const router = express.Router();

router.post("/properties", authenticateJwt,async (req, res) => {
  const userid = req.user.id;
  console.log(userid);
  const qt = await User.findById(userid);
  console.log(qt.phoneno);

    try{  
    const property = new Property({
            type: req.body.type,
            description: req.body.description, 
            price: req.body.price, 
            imageLink: req.body.imageLink, 
            location: req.body.location, 
            shortlink: req.body.shortlink, 
            avialability: req.body.avialability, 
            author: req.user.id,
            authorno : qt.phoneno
    });
    await property.save();
    res.status(200).send({
        success: true,
        message: "property created"
      });console.log(property);
    }catch (error) {
        console.error('An error occurred in /property route:', error);
        res.status(500).json({ message: 'An internal server error occurred' });
      }
  });

  router.get("/me", authenticateJwt, async (req, res) => {
    const user = await User.findOne({ user: req.user.username });
    if (!user) {
      res.status(403).json({msg: "Admin doesnt exist"})
      return
    }
    res.json({
        email: user.email
    })
});

router.get('/properties/:Id' , async(req , res)=>{
  try{
    const {Id} = req.params;
    res.json(await Property.findById(Id));
  }
  catch(err){
    console.log("there is error fecthing the specific property" , err);
  }
})

router.put('/posts/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const updatedData = req.body; 

    const updatedNote = await Property.findByIdAndUpdate(postId, updatedData, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(updatedNote);
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getpostdata/:postId', async (req, res) => {
  try {
      const postId = req.params.postId;
      const postdata = await Property.findOne({ _id: postId });

      if (!postdata) {
          return res.json({
              message: "Note not found for this postId",
          });
      }

      res.json({
          message: "success",
          postdata,
      });
  } catch (error) {
      console.error('An error occurred:', error);
      res.json({
          message: "An error occurred",
      });
  }
});

// router.get("/posts", authenticateJwt, async (req, res) => {
//   try {
//     const posts = await Property.find({
//       author: req.user.id, 
//     }).select('-author'); // Exclude the author field

//     res.json(posts);
//   } catch (error) {
//     console.error('An error occurred in /posts route:', error);
//     res.status(500).json({ message: 'An internal server error occurred' });
//   }
// });

  router.get("/posts", authenticateJwt, async (req, res) => {
    try {
      // const user = req.user;
      const posts = await Property.find({
        author: req.user.id, 
      });
      // console.log(req.user.id);
      res.json(posts);
    } catch (error) {
      console.error('An error occurred in /posts route:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  });

  router.get("/getallposts", authenticateJwt, async (req, res) => {
    try {
      const posts = await Property.find({
        avialability: true, 
      });
      res.json(posts);
    } catch (error) {
      console.error('An error occurred in /posts route:', error);
      res.status(500).json({ message: 'An internal server error occurred' });
    }
  });

  router.post('/add', authenticateJwt, async (req, res) => {
    try {

      const { user, property } = req.body;
      const newBookmark = await Bookmark.create({ user, property });
      res.status(201).json(newBookmark);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
  
  router.get('/bookmarks', authenticateJwt, async (req, res) => {
    try {
      const Email = req.user.email;
      console.log(Email);
  
      // Find the user based on their username
      const user = await User.find({ email : Email});
  
      if (!user) {
        return res.status(404).json({ message: "User not found", user_detail: user });
      }
  
      // Find bookmarks and populate the 'author' field with user data
      const bookmarksOfUser = await Bookmark.find({ author: user._id }).populate('author');
      const property = bookmarksOfUser.map((p) => {
        p.url;
        
      })
      console.log(property);
      if (bookmarksOfUser.length === 0) {
        return res.status(404).json({ message: "User has no bookmarks" });
      }
  
      res.status(200).json(bookmarksOfUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Error fetching bookmarks: ${err.message}` });
    }
  });

  router.delete('/deletepost/:id' ,async(req , res)=>{
    try {
      const { id } = req.params;
      await Property.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error deleting the post' });
    }
  })
  
  router.delete('/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await Bookmark.findByIdAndDelete(id);
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Error deleting bookmark' });
    }
  });

  router.get('/getuserid', authenticateJwt, async (req, res) => {
    try {
      const email = req.user.email;
      if (!email) {
        return res.status(400).json({ error: 'Username not provided' });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        success: true,
        message: 'User ID retrieved successfully',
        user,
      });
    } catch (e) {
      console.error('Error:', e);
      res.status(500).json({
        error: 'An error occurred while processing the request',
      });
    }
  });
  
  //search
 router.get("/search",async(req , res) =>{
  const {query} = req.query;
  try{
    const properties = await Property.find({ name: { $regex: new RegExp(query, 'i') } });
    res.json(properties);
  }
  catch(err){
    console.log("error searching the product" , err);
  }

 })
  

 //testing api
 router.get('/property/:propertyId/user', async (req, res) => {
  try {
    const propertyId = req.params.propertyId;
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const user = await User.findById(property.author);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

  module.exports = router;
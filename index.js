const express = require("express");

const {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
  putPost,
} = require("./blog.controller.js");

const app = express();

app.use(express.json());
app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", postPost);
app.put("/posts/:id", putPost);
app.delete("/posts/:id", deletePost);

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});

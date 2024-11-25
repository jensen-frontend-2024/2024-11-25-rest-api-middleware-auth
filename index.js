const express = require("express");
const { logRequest } = require("./middleware.js");

const {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
  putPost,
} = require("./blog.controller.js");

const app = express();

// global middleware som alla request passerar igenom. Parsar och lägger till body på req-objektet om det finns existerande data.
app.use(express.json());

app.use(logRequest);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", postPost);
app.put("/posts/:id", putPost);
app.delete("/posts/:id", deletePost);

app.get("/test", (req, res) => {
  res.send("Det här är ett svar där förfrågan passerade igenom en middleware.");
});

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});

const express = require("express");
const { logRequest, hashPassword } = require("./middleware.js");

const {
  deletePost,
  getAllPosts,
  getPostById,
  postPost,
  postUser,
  putPost,
} = require("./blog.controller.js");

const app = express();

// global middlewares som alla request passerar igenom. Parsar och lägger till body på req-objektet om det finns existerande data.
app.use(express.json());
app.use(logRequest);

app.get("/posts", getAllPosts);
app.get("/posts/:id", getPostById);
app.post("/posts", postPost);
app.put("/posts/:id", putPost);
app.delete("/posts/:id", deletePost);

// Lokal middleware som bara körs på denna endpoint. Sådana definieras i en array som andra-argument till endpointen.
app.post("/users", [hashPassword], postUser);

app.listen(3000, () => {
  console.log("Server is listening to port 3000");
});

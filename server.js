const express = require("express");
const { accessControl, defaultMiddleware } = require("./middleware");
const users = [
  { id: 1, name: "Mustafa Yol", place: "Hamburg" },
  { id: 2, name: "ali baba ", place: "İstanbul" },
  { id: 5, name: "İbrahim abi ", place: "ortaköy" },
  { id: 7, name: "ahmet bey ", place: "kars" },
];

const app = express();
const PORT = 5000;

app.use(express.json());
// app.use(accessControl); //Uygulama kapsamında kullanma
// Get Request
// localhost:5000/users
app.get("/users", (req, res, next) => {
  res.json({
    success: true,
    data: users,
  });
});

app.post("/users", (req, res, next) => {
  console.log(req.body);
  const user = req.body;
  users.push(user);
  res.json({
    success: true,
    data: users,
  });
});
// users/1
app.put("/users/:id", (req, res, next) => {
  const id = Number(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i] = {
        ...users[i],
        ...req.body,
      };
    }
  }
  res.json({
    success: true,
    data: users,
  });
});

app.delete("/users/:id", (req, res, next) => {
  const id = Number(req.params.id);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users.splice(i, 1);
    }
  }

  res.json({
    success: true,
    data: users,
  });
});

app.listen(PORT, () => {
  console.log("Server Started at port " + PORT);
});

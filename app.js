const express = require("express");
const morgan = require("morgan");
const app = express();
const { db, Page, User } = require("./models");
const wikiRouter = require("./routes/users");
const usersRouter = require("./routes/users");

app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //changes way things are returned
app.use("/wiki", wikiRouter);
app.use("/users", usersRouter);

app.get("/", async (req, res) => {
  res.send("hello world");
});

db.authenticate().then(() => {
  console.log("connected to the database");
});

module.exports = app;

const init = async () => {
  await db.sync({ force: true });
  const port = 3000;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
};

init();

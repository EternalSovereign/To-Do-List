import express from "express";
import bodyParser from "body-parser";
import jQuery from "jquery";
const app = express();
const port = 3000;

app.set("view engine", "ejs");
let toDoList = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { list: toDoList, complete: complete });
});
app.post("/add", (req, res) => {
  const newTask = req.body["newTask"];
  toDoList.push(newTask);
  res.redirect("/");
});
app.post("/complete", (req, res) => {
  const completeTask = req.body["check"];
  toDoList = toDoList.filter((task) => task !== completeTask);
  res.redirect("/");
});
//the completed task array with initial placeholders for removed task
var complete = ["finish jquery"];
app.post("/removetask", function (req, res) {
  var completeTask = req.body.check;
  if (typeof completeTask === "string") {
    complete.push(completeTask);
    toDoList.splice(toDoList.indexOf(completeTask), 1);
  } else if (typeof completeTask === "object") {
    for (var i = 0; i < completeTask.length; i++) {
      complete.push(completeTask[i]);
      toDoList.splice(toDoList.indexOf(completeTask[i]), 1);
    }
  }
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

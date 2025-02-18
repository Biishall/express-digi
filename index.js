import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); //to accept data from front end

let teaData = [];
let nextId = 1;

//when u want to save the data in database use post
//add a new tea
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//get all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//get a tea with ID
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not Found");
  }
  res.status(200).send(tea);
});

//update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not Found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("tea not found");
  }
  teaData.splice(index, 1);
  return res.status(204).send("deleted");
});

// app.get("/", (req,res) => {
//   res.send("Hello from Bishal")
// })

// app.get("/about-us", (req,res) => {
//   res.send("Hello from Bishal about-us")
// })

// app.get("/twitter", (req,res) => {
//   res.send("Hello from Bishal twitter")
// })

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});

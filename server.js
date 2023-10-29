const { default: axios } = require("axios");
const express = require("express");
const client = require("./index");
const app = express();
const port = 3000;

//store api data in redis cache
app.get("/", async (req, res) => {
  let cache = await client.get("todos");
  if (cache) return res.json(JSON.parse(cache));
  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );
  await client.set("todos", JSON.stringify(data));
  await client.expire("todo", 10);
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

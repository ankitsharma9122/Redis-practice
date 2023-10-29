const client = require("./index");
async function init() {
  //   await client.set("user:4", "Aman");
  await client.expire("user:4", 10);
  const result = await client.get("user:4");
  console.log(result);
}
init();

const fs = require("fs");
const crypto = require("crypto");
const aes256 = require("aes256");
const encrypt = fs.readFileSync("./table.txt", "utf-8");
const decrypt = aes256.decrypt("sandeep", encrypt);

fs.writeFile("table_decr.obj", decrypt, (err) => {
  if (err) console.log(err);
  else console.log("suuuuuuuuucse");
});

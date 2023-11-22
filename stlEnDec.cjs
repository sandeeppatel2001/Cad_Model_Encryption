const fs = require("fs");
const crypto = require("crypto");
const aes256 = require("aes256");
//console.log(crypto.getCurves());
const alice = crypto.createECDH("secp256k1");
const bob = crypto.createECDH("secp256k1");
alice.generateKeys();
bob.generateKeys();
const alicepublickeybase64 = alice.getPublicKey().toString("base64");
const bobpublickeybase64 = bob.getPublicKey().toString("base64");
const alicesharekey = alice.computeSecret(bobpublickeybase64, "base64", "hex");
const bobsharekey = bob.computeSecret(alicepublickeybase64, "base64", "hex");
console.log(alicesharekey == bobsharekey);
console.log(bobsharekey);
console.log(alicesharekey);
// console.log(alicesharekey.length);
const msg = "this is demo";
const f = fs.readFileSync("./table.obj", "utf-8");
// console.log("ddddddddddd", f);
// fs.writeFile("books.stl", f, (err) => {
//   if (err) console.log(err);
//   else console.log("suuuuuuuuucse");
// });
const encrypt = aes256.encrypt("sandeep", f);
// const decrypt = aes256.decrypt(bobsharekey, encrypt);
// console.log("ddddddddddddd", decrypt);
fs.writeFile("table.txt", encrypt, (err) => {
  if (err) console.log(err);
  else console.log("suuuuuuuuucse");
});
// console.log(decrypt);
// const fe = fs.readFileSync("./books_en.stl", "utf-8");
// const fdecrypt = aes256.decrypt(bobsharekey, fe);

// fs.writeFile("decr.stl", decrypt, (err) => {
//   if (err) console.log(err);
//   else console.log("suuuuuuuuucse");
// });

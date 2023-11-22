// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const aes256 = require("aes256");
const app = express();
const port = 3000 || process.env.PORT;

// Multer configuration to handle file uploads
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      // file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      file.fieldname + ".txt"
    );
  },
});

const upload = multer({ storage: storage });

// Serve static files from the "public" directory
app.use(express.static("./"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "index");
});
app.post("/encrypt", upload.single("file"), (req, res) => {
  const password = req.body.password;
  const filePath = req.file.path;
  console.log(password);
  const f = fs.readFileSync("./uploads/file.txt", "utf-8");
  const encryptedContent = aes256.encrypt(password, f);
  // Send the encrypted content as a response
  res.setHeader("Content-Disposition", "attachment; filename=file.txt");
  res.setHeader("Content-Type", "text/plain");
  res.send(encryptedContent);
});

app.post("/decrypt", upload.single("file"), (req, res) => {
  const password = req.body.password;
  const filePath = req.file.path;
  console.log("decrpt: ", password);
  const f = fs.readFileSync("./uploads/file.txt", "utf-8");
  const decryptedContent = aes256.decrypt(password, f);
  // const encryptedContent = aes256.encrypt(password, f);
  // Send the encrypted content as a response
  res.setHeader("Content-Disposition", "attachment; filename=file.txt");
  res.setHeader("Content-Type", "text/plain");
  res.send(decryptedContent);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

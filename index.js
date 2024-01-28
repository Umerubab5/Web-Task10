//i worked with potsman testing data and worked with mongo db


import express from "express";
import bodyParser from "body-parser"; // Import bodyParser
import usersRoutes from "./routes/users.js";
const app = express();
const PORT = 3100;

// Use bodyParser middleware
app.use(bodyParser.json());
app.use('/users',usersRoutes);

app.get('/',(req,res)=>res.send("Hello welcome to Homepage"))
app.listen(PORT, () => {
    console.log(`Server Running on port: http://localhost:${PORT}`); // Fixed the typo here, added a colon after localhost
});

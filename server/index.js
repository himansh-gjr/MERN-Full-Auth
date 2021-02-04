const express = require("express");

const connectDB = require("./config/db");

const userRoutes = require("./routes/users");

const app = express();
app.use(express.json());

connectDB();

app.use("/api/", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

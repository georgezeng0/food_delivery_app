const express = require('express');

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/api", (req, res) => {
    res.json({message:"Server responding"})
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
})
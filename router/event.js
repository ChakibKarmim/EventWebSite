const express = require("express");
const router = express.Router();

router.get("/api/events", (req, res) => {
    res.send(events);
});

router.post("/", (req, res) => {
    res.send(events);
});

router.delete("/:id", (req, res) => {
    res.send(events);
});

app.listen(3000, () => {
    console.log("Server on !!");
})

module.exports = {
    eventRouter:router,
    events
}
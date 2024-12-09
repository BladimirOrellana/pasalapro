const router = require("express").Router();
const players = require("./playerRoutes");

// Add other API routes here
router.use("/players", players);

module.exports = router;

const router = require("express").Router();
const players = require("./playerRoutes");
const users = require("./userRoutes");
// Add other API routes here
router.use("/players", players);
router.use("/users", users);

module.exports = router;

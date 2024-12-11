const router = require("express").Router();
const players = require("./playerRoutes");
const users = require("./userRoutes");
const sponsors = require("./sponsor");
// Add other API routes here

router.use("/players", players);
router.use("/users", users);
router.use("/sponsors", sponsors);

module.exports = router;

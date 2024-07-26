// user routes

const users = require("../controllers/users.controller");
const router = require("express").Router();
const { checkJwt } = require("../middleware/auth.middleware");

router.get("/", checkJwt, users.listUsers);
router.get("/:sub", checkJwt, users.getUserById);
router.post("/", checkJwt, users.createUser);
router.put("/:sub", checkJwt, users.updateUser);
router.delete("/:sub", checkJwt, users.deleteUser);

module.exports = router;
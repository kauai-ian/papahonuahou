// user routes

const users = require("../controllers/users.controller");
const router = require("express").Router();
const { checkJwt } = require("../middleware/auth.middleware");

router.get("/", checkJwt, users.listUsers);
router.post("/", checkJwt, users.createUser);
router.get("/:sub", checkJwt, users.getUserById);
router.put("/:sub", checkJwt, users.updateUser);
router.delete("/:sub", checkJwt, users.deleteUser);

module.exports = router;
// TODO testing postman route, got the error 'WWW-authenticate': 'Bearer realm="api", error="invalid_token", error_description="Invalid compact JWS"'
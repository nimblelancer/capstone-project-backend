const express = require("express");
const router = express.Router();
const userController = require("../controllers/User");

router.get("/", userController.findAllUsers);
router.get("/:id", userController.findUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUserById);

module.exports = router;

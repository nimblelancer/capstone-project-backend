module.exports = (app) => {
  const userController = require("../controllers/User");

  var router = require("express").Router();

  router.get("/signout", userController.logout); // Define signout route first
  router.get("/", userController.findAllUsers);
  router.get("/:id", userController.findUserById);
  router.post("/", userController.createUser);
  router.put("/:id", userController.updateUser);
  router.delete("/:id", userController.deleteUserById);
  router.post("/signup", userController.signup);
  router.post("/signin", userController.signin);

  app.use("/api/user", router);
};

module.exports = (app) => {
    const userController = require("../controllers/User");
  
    var router = require("express").Router();
  
    router.get("/", userController.findAllUsers);
    router.get("/:id", userController.findUserById);
    router.post("/", userController.createUser);
    router.put("/:id", userController.updateUser);
    router.delete("/:id", userController.deleteUserById);
  
    app.use("/api/user", router);
  };


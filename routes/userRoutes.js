module.exports = app => {
  const userResource = require("../controllers/UserController");

  app.route("/listUsers").get(userResource.readAllUsers);

  app.route("/addUser").post(userResource.createNewUser);

  app.route("/deleteUser/:id").delete(userResource.deleteUser);

  app.route("/:id").get(userResource.readOneUser);
};

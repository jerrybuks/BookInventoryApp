const router = require("express").Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleWares/auth");
const bookValidation = require("../middleWares/bookValidation");

module.exports = function() {
  //var userCtl = new userController();
  var bookCtl = new bookController();

  //call up your bookrRoutes here
  router.get("/", auth, bookCtl.getAllUserBooks);
  router.post("/", [bookValidation , auth], bookCtl.addBook);
  router.put("/:id", [bookValidation , auth], bookCtl.editBook);
  router.delete("/:id", auth, bookCtl.deleteBook )
  
  return router;
};

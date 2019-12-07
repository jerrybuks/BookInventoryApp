const router = require("express").Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const auth = require("../middleWares/auth");
const {
  signUpValidation,
  loginValidation
} = require("../middleWares/userValidation");

module.exports = function() {
  var userCtl = new userController();
  var authCtl = new authController();

  //call up your userRoutes here
   
  router.post("/signup", signUpValidation, authCtl.signUp);
  router.post("/login", loginValidation, authCtl.login);
  router.get("/login", auth, authCtl.getLoggedInUser);
  
  return router;
};

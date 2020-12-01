const { Router } = require("express");
// const { checkRegistration  } = require('../middleware/checkUser');
const {
  register,
  getAllUsers,
  createNewUser,
  login,
  logout,
  updateUser,
  deleteUser,
  getSingleUser,
} = require("../Controller/userController");
const { checkValidation } = require("../middleware/validate");
const { authorization } = require("../middleware/authorization");
const { validationResult, check } = require("express-validator");

const router = Router();

router.post("/api/v1/register", checkValidation("USER_REGISTRATION"), register);
router.post("/api/v1/login", checkValidation("USER_LOGIN"), login);
router.delete("/api/v1/logout", authorization, logout);
router.post(
  "/api/v1/user",
  [checkValidation("USER_REGISTRATION"), authorization],
  createNewUser
);
router.delete("/api/v1/user/:id", authorization, deleteUser);
router.patch(
  "/api/v1/user/:id",
  [checkValidation("UPDATE_USER"), authorization],
  updateUser
);
router.get("/api/v1/getAllUsers", authorization, getAllUsers);
router.get("/api/v1/getSingleUser/:id", authorization, getSingleUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user.controller");

// Create a new user
router.post("/", createUser);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user by ID
router.put("/:id", updateUserById);

// Delete user by ID
router.delete("/:id", deleteUserById);

module.exports = router;

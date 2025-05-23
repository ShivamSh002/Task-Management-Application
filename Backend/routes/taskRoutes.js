const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const {
  createTask,
  getTasks,
  updateStatus,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

router.post("/", auth, createTask);
router.get("/", auth, getTasks);
router.put("/:id/complete", auth, updateStatus);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);

module.exports = router;

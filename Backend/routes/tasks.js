const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const taskController = require("../controllers/taskControllers");


router.get("/", auth, taskController.getTasks);


router.post(
  "/",
  auth,
  [ check("title", "Title is required").notEmpty() ],
  taskController.createTask
);


router.get("/:id", auth, taskController.getTask);


router.put("/:id", auth, taskController.updateTask);


router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;

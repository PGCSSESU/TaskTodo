const { validationResult } = require("express-validator");
const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, dueDate, } = req.body;
    const task = new Task({
      title,
      dueDate,
      user: req.user.id
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getTasks = async (req, res) => {
  try {

    const { completed, priority, search, page = 1, limit = 20, sort = "-createdAt" } = req.query;
    const filter = { user: req.user.id };
    if (completed !== undefined) filter.completed = completed === "true";
    if (priority) filter.priority = priority;
    if (search) filter.title = { $regex: search, $options: "i" };

    const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const tasks = await Task.find(filter).sort(sort).skip(skip).limit(parseInt(limit));
    const total = await Task.countDocuments(filter);
    res.json({ tasks, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Task not found" });
    res.status(500).send("Server error");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updates = (({ title, completed, dueDate, }) => 
      ({ title, completed, dueDate,  }))(req.body);

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Task not found" });
    res.status(500).send("Server error");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") return res.status(404).json({ msg: "Task not found" });
    res.status(500).send("Server error");
  }
};

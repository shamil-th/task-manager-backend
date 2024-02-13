const mongoose = require("mongoose");
const TaskList = require("../model/model");

exports.create = async (req, res) => {
  try {
    const { list, pin } = req.body;

    const newTaskList = new TaskList({
      list,
      pin,
    });

    await newTaskList.save();

    res.status(201).json(newTaskList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.find = async (req, res) => {
  TaskList.find()
    .then((task) => {
      res.send(task);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "error occured while retriving data",
      });
    });
};

exports.findTask = async (req, res) => {
  const id = req.params.id;
  TaskList.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `cannot find task with id` + id });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal server error" + err });
    });
};

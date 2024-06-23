const express = require("express");
const router = express.Router();
const { User } = require("../db");
const mongoose = require("mongoose");
const { z } = require("zod");

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const parsedBody = userSchema.parse(req.body);
    const user = new User(parsedBody);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

// Read all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const parsedBody = userSchema.partial().parse(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, parsedBody, {
      new: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

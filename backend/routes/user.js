const express = require("express");
const router = express.Router();
const { User } = require("../db");
const { z } = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("./authMiddleware");

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/register", async (req, res) => {
  try {
    const parsedBody = userSchema.parse(req.body);

    const existingUser = await User.findOne({ email: parsedBody.email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(parsedBody.password, 10);
    const user = new User({
      name: parsedBody.name,
      email: parsedBody.email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: "User registered successfully." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h', 
    });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
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

router.delete("/:id", authMiddleware, async (req, res) => {
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

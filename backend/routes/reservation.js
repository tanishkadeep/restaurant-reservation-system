const express = require("express");
const router = express.Router();
const { Reservation, User, Restaurant } = require("../db");
const { z } = require("zod");
const mongoose = require("mongoose");
const authMiddleware = require("./authMiddleware");

const reservationSchema = z.object({
  userName: z.string(),
  restaurantName: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  time: z.string(),
  guests: z.number().min(1, { message: "Guests must be at least 1" }),
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const parsedBody = reservationSchema.parse(req.body);
    const user = await User.findOne({ name: parsedBody.userName });
    const restaurant = await Restaurant.findOne({ name: parsedBody.restaurantName });

    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }
    if (!restaurant) {
      return res.status(400).send({ message: "Restaurant not found." });
    }

    const reservation = new Reservation({
      user: user._id,
      restaurant: restaurant._id,
      date: parsedBody.date,
      time: parsedBody.time,
      guests: parsedBody.guests,
    });
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find({})
      .populate("restaurant")
      .populate("user");
    res.send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate("restaurant")
      .populate("user");
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const parsedBody = reservationSchema.partial().parse(req.body);
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      parsedBody,
      { new: true }
    ).populate("restaurant").populate("user");
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
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
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

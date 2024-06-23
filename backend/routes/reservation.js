const express = require("express");
const router = express.Router();
const { Reservation } = require("../db");
const { z } = require("zod");
const mongoose = require("mongoose");

const reservationSchema = z.object({
  user: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid user ID",
  }),
  restaurant: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid restaurant ID",
  }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  time: z.string(),
  guests: z.number().min(1, { message: "Guests must be at least 1" }),
});

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const parsedBody = reservationSchema.parse(req.body);
    const reservation = new Reservation(parsedBody);
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

// Read all reservations
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

// Update a reservation by ID
router.put("/:id", async (req, res) => {
  try {
    const parsedBody = reservationSchema.partial().parse(req.body);
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      parsedBody,
      { new: true }
    );
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

// Delete a reservation by ID
router.delete("/:id", async (req, res) => {
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

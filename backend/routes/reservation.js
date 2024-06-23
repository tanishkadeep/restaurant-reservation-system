const express = require("express");
const router = express.Router();
const { Reservation } = require("../db");

// Create a new reservation
router.post("/", async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
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
    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!reservation) {
      return res.status(404).send();
    }
    res.send(reservation);
  } catch (error) {
    res.status(400).send(error);
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

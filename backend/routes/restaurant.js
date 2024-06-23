const express = require("express");
const router = express.Router();
const { Restaurant } = require("../db");
const mongoose = require("mongoose");
const { z } = require("zod");

const availabilitySchema = z.record(z.boolean());

const restaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  capacity: z.number().int().positive(),
  availability: availabilitySchema.optional(),
});

// Create a new restaurant
router.post("/", async (req, res) => {
  try {
    const parsedBody = restaurantSchema.parse(req.body);
    const restaurant = new Restaurant(parsedBody);
    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

// Read all restaurants
router.get("/", async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.send(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a restaurant by ID
router.put("/:id", async (req, res) => {
  try {
    const parsedBody = restaurantSchema.partial().parse(req.body);
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      parsedBody,
      { new: true }
    );
    if (!restaurant) {
      return res.status(404).send();
    }
    res.send(restaurant);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).send(error.errors);
    } else {
      res.status(400).send(error);
    }
  }
});

// Delete a restaurant by ID
router.delete("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).send();
    }
    res.send(restaurant);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

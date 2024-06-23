const express = require("express");
const userRouter = require("./user");
const reservationRouter = require("./reservation");
const restaurantRouter = require("./restaurant");

const router = express.Router();

router.use("/users", userRouter);
router.use("/reservations", reservationRouter);
router.use("/restaurants", restaurantRouter);

module.exports = router;
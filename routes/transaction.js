const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");
const auth = require("../middleware/auth");

router.get("/daily", auth('user'), TransactionController.getDaily);
router.get("/monthly", auth('user'), TransactionController.getMonthly);
router.get("/film", auth('user'), TransactionController.getFilm);
router.get("/revenue", auth('user'), TransactionController.getRevenueMonthly);

module.exports = router;

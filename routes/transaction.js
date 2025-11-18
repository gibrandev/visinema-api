const express = require("express");
const router = express.Router();
const TransactionController = require("../controllers/transactionController");

router.get("/daily", TransactionController.getDaily);
router.get("/monthly", TransactionController.getMonthly);
router.get("/film", TransactionController.getFilm);
router.get("/revenue", TransactionController.getRevenueMonthly);

module.exports = router;

// Import the required modules
const express = require("express")
const router = express.Router()

const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
  directEnroll,
} = require("../controllers/Payments")

const {
  auth,
  isInstructor,
  isStudent,
  isAdmin,
} = require("../middlewares/auth")

router.post("/capturePayment", auth, isStudent, capturePayment)

// Agar chaho to verifyPayment route rehne do
router.post("/verifyPayment", auth, isStudent, verifyPayment)

router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)

// NAYA ROUTE
router.post(
  "/directEnroll",
  auth,
  directEnroll
)

module.exports = router
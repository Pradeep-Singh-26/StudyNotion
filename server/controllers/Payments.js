const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0

  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled?.some((student) => student.equals(uid))) {
        return res
          .status(200)
          .json({ success: false, message: "You are already enrolled in this course" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

exports.directEnroll = async (req, res) => {
  try {
    const { courses } = req.body
    const userId = req.user.id

    if (!courses?.length) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one course",
      })
    }

    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check if already enrolled
    for (const courseId of courses) {
      const course = await Course.findById(courseId)

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        })
      }

      const alreadyInCourse = course.studentsEnrolled?.some(
        (student) => student.toString() === userId.toString()
      )
      const alreadyInUser = user.courses?.some(
        (id) => id.toString() === courseId.toString()
      )

      if (alreadyInCourse || alreadyInUser) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this course",
        })
      }
    }

    // Enroll student
    await enrollStudents(courses, userId, res)

    if (res.headersSent) {
      return
    }
    // console.log("students =", course.studentsEnrolled)
    console.log("userId =", userId)
    return res.status(200).json({
      success: true,
      message: "Enrolled Successfully",
    })
  } catch (error) {
    console.log(error)

    if (res.headersSent) {
      return
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      const course = await Course.findById(courseId)
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" })
      }

      const user = await User.findById(userId)
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" })
      }

      const alreadyInCourse = course.studentsEnrolled?.some(
        (student) => student.toString() === userId.toString()
      )
      const alreadyInUser = user.courses?.some(
        (id) => id.toString() === courseId.toString()
      )

      if (alreadyInCourse || alreadyInUser) {
        return res.status(400).json({
          success: false,
          message: "You are already enrolled in this course",
        })
      }

      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $addToSet: { studentsEnrolled: userId } },
        { new: true }
      )

      console.log("Updated course: ", enrolledCourse)

      let courseProgress = await CourseProgress.findOne({
        courseID: courseId,
        userId,
      })
      if (!courseProgress) {
        courseProgress = await CourseProgress.create({
          courseID: courseId,
          userId,
          completedVideos: [],
        })
      }

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )

      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      // Send email (don't fail enrollment if email fails)
      try {
        const emailResponse = await mailSender(
          enrolledStudent.email,
          `Successfully Enrolled into ${enrolledCourse.courseName}`,
          courseEnrollmentEmail(
            enrolledCourse.courseName,
            `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
          )
        )
      } catch (err) {
        console.log("Email sending failed:", err.message)
      }
      
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}
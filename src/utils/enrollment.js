export function isEnrolledInCourse(course, userId) {
  if (!course?.studentsEnrolled?.length || !userId) return false

  return course.studentsEnrolled.some(
    (studentId) => studentId?.toString() === userId?.toString()
  )
}

import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { resetCart } from "../../slices/cartSlice";

const { DIRECT_ENROLL_API } = studentEndpoints;
export async function buyCourse(
    token,
    courses,
    userDetails,
    navigate,
    dispatch
) {
    console.log("TOKEN =", token)
    const confirmed = window.confirm(
    "Are you sure you want to buy this course?"
  );

  if (!confirmed) return;

  const toastId = toast.loading("Enrolling...");

  try {
    const response = await apiConnector(
      "POST",
      DIRECT_ENROLL_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Course Purchased Successfully");

    dispatch(resetCart());

    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("ENROLLMENT ERROR:", error);
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Enrollment Failed";
    toast.error(message);
  }

  toast.dismiss(toastId);
}
import { toast } from "react-hot-toast"

import { apiConnector } from "../apiconnector"
import { categories } from "../apis"

const { CATEGORIES_API, CREATE_CATEGORY_API } = categories

export const fetchAllCategories = async () => {
  let result = []
  try {
    const response = await apiConnector("GET", CATEGORIES_API)
    if (!response?.data?.success) {
      throw new Error("Could not fetch categories")
    }
    result = response?.data?.data
  } catch (error) {
    console.log("FETCH CATEGORIES API ERROR............", error)
    toast.error(error.message)
  }
  return result
}

export const createCategory = async (name, description, token) => {
  let result = false
  const toastId = toast.loading("Creating category...")
  try {
    const response = await apiConnector(
      "POST",
      CREATE_CATEGORY_API,
      { name, description },
      { Authorization: `Bearer ${token}` }
    )
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Could not create category")
    }
    toast.success("Category created successfully")
    result = true
  } catch (error) {
    console.log("CREATE CATEGORY API ERROR............", error)
    toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

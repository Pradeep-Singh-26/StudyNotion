import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import {
  createCategory,
  fetchAllCategories,
} from "../../../../services/operations/categoryAPI"

export default function CreateCategory() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [formData, setFormData] = useState({ name: "", description: "" })
  const [categoryList, setCategoryList] = useState([])
  const [loading, setLoading] = useState(false)

  const loadCategories = async () => {
    const categories = await fetchAllCategories()
    setCategoryList(categories || [])
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setLoading(true)
    const success = await createCategory(
      formData.name.trim(),
      formData.description.trim(),
      token
    )
    setLoading(false)

    if (success) {
      setFormData({ name: "", description: "" })
      loadCategories()
    }
  }

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-medium text-richblack-5">
          Admin Dashboard
        </h1>
        <p className="text-richblack-200">
          Welcome, {user?.firstName}. Create and manage course categories here.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-10 space-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
      >
        <h2 className="text-xl font-semibold text-richblack-5">
          Create Category
        </h2>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="name">
            Category Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            className="form-style w-full"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm text-richblack-5" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of this category"
            className="form-style min-h-[100px] w-full resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-yellow-50 px-5 py-2 font-semibold text-richblack-900 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>

      <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <h2 className="mb-4 text-xl font-semibold text-richblack-5">
          All Categories ({categoryList.length})
        </h2>
        {categoryList.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-richblack-300">
              <thead className="border-b border-richblack-600 text-richblack-100">
                <tr>
                  <th className="py-3 pr-4">Name</th>
                  <th className="py-3 pr-4">Description</th>
                  <th className="py-3">Courses</th>
                </tr>
              </thead>
              <tbody>
                {categoryList.map((category) => (
                  <tr
                    key={category._id}
                    className="border-b border-richblack-700"
                  >
                    <td className="py-3 pr-4 font-medium text-richblack-5">
                      {category.name}
                    </td>
                    <td className="py-3 pr-4">
                      {category.description || "—"}
                    </td>
                    <td className="py-3">
                      {category.courses?.length || 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-richblack-300">No categories created yet.</p>
        )}
      </div>
    </div>
  )
}

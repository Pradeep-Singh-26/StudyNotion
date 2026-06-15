import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { VscAdd } from "react-icons/vsc"
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import IconBtn from '../components/common/IconBtn'
import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from '../utils/constants'
import Error from "./Error"

const Catalog = () => {

    const { loading, user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categoryNotFound, setCategoryNotFound] = useState(false);

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            try {
              const res = await apiConnector("GET", categories.CATEGORIES_API);
              const matchedCategory = res?.data?.data?.find(
                (ct) =>
                  ct.name.split(" ").join("-").toLowerCase() === catalogName
              );

              if (matchedCategory) {
                setCategoryId(matchedCategory._id);
                setCategoryNotFound(false);
              } else {
                setCategoryNotFound(true);
              }
            } catch (error) {
              console.log(error);
              setCategoryNotFound(true);
            }
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || (!catalogPageData && !categoryNotFound)) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      if (categoryNotFound || (!loading && catalogPageData && !catalogPageData.success)) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          <div className=" box-content bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
              {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && categoryId && (
                <IconBtn
                  text="Create Course"
                  onclick={() =>
                    navigate(`/dashboard/add-course?categoryId=${categoryId}`)
                  }
                  customClasses="mt-2 w-fit"
                >
                  <VscAdd />
                </IconBtn>
              )}
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Courses to get you started</div>
            <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div>
            <div>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>
          {/* Section 2 */}
          {catalogPageData?.data?.differentCategory && (
            <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
              <div className="section_heading">
                Top courses in {catalogPageData?.data?.differentCategory?.name}
              </div>
              <div className="py-8">
                <CourseSlider
                  Courses={catalogPageData?.data?.differentCategory?.courses}
                />
              </div>
            </div>
          )}
    
          {/* Section 3 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              {catalogPageData?.data?.mostSellingCourses?.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {catalogPageData?.data?.mostSellingCourses
                    ?.slice(0, 4)
                    .map((course, i) => (
                      <Course_Card course={course} key={i} Height={"h-[400px]"} />
                    ))}
                </div>
              ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
              )}
            </div>
          </div>
    
          <Footer />
        </>
      )
    }
    
    export default Catalog

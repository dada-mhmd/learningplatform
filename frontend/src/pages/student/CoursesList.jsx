import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SearchBar from '../../components/student/SearchBar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../components/student/CourseCard';
import { assets } from '../../assets/assets';
import Footer from '../../components/student/Footer';

const CoursesList = () => {
  const [filteredCourse, setfilteredCourse] = useState([]);

  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();
      input
        ? setfilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setfilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        {/* breadcrumb */}
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>
              Course List
            </h1>
            <p className='text-gray-500 space-x-2'>
              <span
                onClick={() => navigate('/')}
                className='text-blue-600 cursor-pointer'
              >
                Home
              </span>
              <span>/ Course List</span>
            </p>
          </div>

          <SearchBar data={input} />
        </div>

        {input && (
          <div className='inline-flex w-96 justify-between items-center gap-2 px-4 py-2 border mt-8 -mb-8 text-gray-600'>
            <p className='text-black text-lg'>
              Showing results for:
              <span className='text-blue-600 capitalize'> {input}</span>
            </p>
            <img
              src={assets.cross_icon}
              alt='cross_icon'
              className='cursor-pointer'
              onClick={() => navigate('/course-list')}
            />
          </div>
        )}

        <div className='grid md:grid-cols-3 grid-cols-1 gap-8 mt-20'>
          {filteredCourse?.map((course, i) => (
            <CourseCard key={i} course={course} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CoursesList;

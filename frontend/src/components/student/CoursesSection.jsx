import { Link } from 'react-router-dom';
import CourseCard from './CourseCard';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8'>
      <h2 className='text-3xl font-medium text-gray-800'>
        Learn from the best
      </h2>
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover our top rated courses and unlock your learning potential. Our
        courses are designed to provide <br /> you with the knowledge and skills
        you need to succeed.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10'>
        {allCourses?.slice(0, 4).map((course, i) => (
          <CourseCard key={i} course={course} />
        ))}
      </div>

      <Link
        to={'/course-list'}
        onClick={() => window.scrollTo(0, 0)}
        className='text-gray-800 border border-gray-500 px-10 py-3 rounded font-semibold hover:bg-gray-200'
      >
        Show all courses
      </Link>
    </div>
  );
};

export default CoursesSection;

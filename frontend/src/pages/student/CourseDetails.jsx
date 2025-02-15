import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Youtube from 'react-youtube';
import humanizeDuration from 'humanize-duration';

import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

import Loading from '../../components/student/Loading';
import Footer from '../../components/student/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const {
    calculateRating,
    allCourses,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLectures,
  } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  // Find the course with the matching id
  const fetchCourseData = async () => {
    const course = allCourses.find((course) => course._id === id);
    setCourseData(course);
  };

  const toggleSection = (i) => {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-32 pt-20 text-left'>
        {/* gradient */}
        <div className='absolute top-0 left-0 w-full z-1 bg-gradient-to-b from-cyan-100/70 h-[500px]'></div>

        {/* left */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-3xl text-lg font-semibold text-gray-800'>
            {courseData?.courseTitle}
          </h1>
          <p
            className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{
              __html: courseData?.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* review and rating */}
          <div className='flex mt-2'>
            {[...Array(5)].map((_, i) => (
              <>
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt='star'
                  className='size-3.5'
                />
              </>
            ))}
            <p className='-mt-1 px-2'>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length === 1
                ? ' student enrolled '
                : ' students enrolled '}
            </p>
          </div>
          <p className='text-sm'>
            Course by <span className='text-blue-600 underline'>Samir</span>
          </p>

          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            <div className='pt-5'>
              {courseData.courseContent.map((chapter, i) => (
                <div
                  key={i}
                  className='border border-gray-300 bg-white mb-2 rounded'
                >
                  <div
                    onClick={() => toggleSection(i)}
                    className='flex items-center justify-between px-3 py-4 cursor-pointer select-none'
                  >
                    <div className='flex items-center gap-2'>
                      <img
                        className={openSections[i] ? 'rotate-180' : ''}
                        src={assets.down_arrow_icon}
                        alt='down_arrow_icon'
                      />
                      <p className='font-medium md:text-base text-sm'>
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className='text-sm md:text-base'>
                      {chapter.chapterContent.length} lectures - &nbsp;
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${openSections[i] ? 'max-h-96' : 'max-h-0'} `}
                  >
                    <ul className='list-disc md:pl-10 pl-4 pr-2 text-gray-600 border-t border-gray-300'>
                      {chapter?.chapterContent.map((lecture, i) => (
                        <li key={i} className='flex items-start gap-2 py-1'>
                          <img
                            src={assets.play_icon}
                            alt='play_icon'
                            className='size-4 mt-1'
                          />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-base'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split('/')
                                        .pop(),
                                    })
                                  }
                                  className='text-blue-500 cursor-pointer'
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ['h', 'm'] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='py-20 text-sm md:text-base'>
            <h3 className='text-xl font-semibold text-gray-800'>
              Course Description
            </h3>
            <p
              className='pt-3 rich-text'
              dangerouslySetInnerHTML={{
                __html: courseData?.courseDescription,
              }}
            ></p>
          </div>
        </div>
        {/* right */}
        <div className='max-w-[424px] shadow-md z-10 rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]'>
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName='w-full aspect-video'
            />
          ) : (
            <img src={courseData?.courseThumbnail} alt='course_thumbnail' />
          )}
          <div className='p-5'>
            <div className='flex items-center gap-2'>
              <img
                src={assets.time_left_clock_icon}
                alt='time_icon'
                className='w-3.5'
              />
              <p className='text-red-500'>
                <span className='font-medium'>5 days</span> left at this price
              </p>
            </div>
            <div className='flex gap-3 items-center pt-2'>
              <p className='text-gray-800 md:text-3xl text-2xl font-semibold'>
                $
                {(
                  courseData?.coursePrice -
                  (courseData?.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className='md:text-lg text-gray-500 line-through'>
                ${courseData?.coursePrice}
              </p>
              <p className='md:text-lg text-gray-500'>
                {courseData.discount}% off
              </p>
            </div>

            <div className='flex items-center text-sm md:text-base gap-4 pt-2 md:pt-4 text-gray-500'>
              <div className='flex items-center gap-1'>
                <img src={assets.star} alt='star_icon' />
                <p>{calculateRating(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'></div>
              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon} alt='clock_icon' />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'></div>

              <div className='flex items-center gap-1'>
                <img src={assets.lesson_icon} alt='star_icon' />
                <p>{calculateNumberOfLectures(courseData)} lessons</p>
              </div>
            </div>
            <button className='md:mt-6 mt-4 w-full py-3 rounded bg-blue-600 text-white font-medium cursor-pointer'>
              {isEnrolled ? 'Already Enrolled' : 'Enroll Now'}
            </button>

            <div className='pt-6'>
              <p className='md:text-xl text-lg font-medium text-gray-800'>
                What&apos;s in the course
              </p>
              <ul className='ml-4 pt-2 text-sm md:text-base list-disc text-gray-500'>
                <li>Lifetime access to all lessons</li>
                <li>Step-by-step project guidance</li>
                <li>Certification on successful completion</li>
                <li>Downloadable course materials</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;

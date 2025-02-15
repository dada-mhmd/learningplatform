import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';

import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';

const Player = () => {
  const { enrolledCourses, calculateChapterTime } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  const toggleSection = (i) => {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);

  return (
    <>
      <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>
        {/* left */}
        <div className='text-gray-800'>
          <h2 className='text-xl font-semibold'>Course Structure</h2>
          <div className='pt-5'>
            {courseData &&
              courseData.courseContent.map((chapter, i) => (
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
                            src={
                              false ? assets.blue_tick_icon : assets.play_icon
                            }
                            alt='play_icon'
                            className='size-4 mt-1'
                          />
                          <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-base'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: i + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className='text-blue-500 cursor-pointer'
                                >
                                  Watch
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

          <div className='flex items-center gap-2 py-3 mt-10'>
            <h1 className='text-xl font-bold'>Rate this course</h1>
            <Rating initialRating={0} />
          </div>
        </div>
        {/* right */}
        <div>
          {playerData ? (
            <div className='md:mt-10'>
              <YouTube
                videoId={playerData.lectureUrl.split('/').pop()}
                iframeClassName='w-full aspect-video'
              />
              <div className='flex justify-between items-center mt-1'>
                <p>
                  {playerData.player}.{playerData.lecture}
                  <span> {playerData.lectureTitle}</span>
                </p>
                <button className='text-blue-600 cursor-pointer'>
                  {false ? 'Completed' : 'Mark as Completed'}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={courseData ? courseData.courseThumbnail : ''}
              alt='course_thumbnail'
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;

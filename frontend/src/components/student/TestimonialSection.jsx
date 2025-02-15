import { assets, dummyTestimonial } from '../../assets/assets';

const TestimonialSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0 md:py-20 lg:py-12 mx-auto max-w-screen-xl'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3'>
        Hear what our students have to say, <br /> and see how our courses have
        helped them succeed.
      </p>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14'>
        {dummyTestimonial.map((item, i) => (
          <div
            key={i}
            className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden'
          >
            <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
              <img
                src={item.image}
                alt={item.name}
                className='size-12 rounded-full'
              />
              <div>
                <h2 className='text-lg font-medium text-gray-800'>
                  {item.name}
                </h2>
                <p className='text-gray-800/80'>{item.role}</p>
              </div>
            </div>
            <div className='p-5 pb-7'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src={
                      i < Math.floor(item.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt='star_rating'
                    className='h-5'
                  />
                ))}
              </div>
              <p className='text-gray-500 mt-5'>{item.feedback}</p>
            </div>
            <a href='#' className='text-blue-500 underline px-5'>
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;

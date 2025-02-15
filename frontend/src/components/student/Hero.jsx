import { assets } from '../../assets/assets';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-5xl text-xl  relative font-bold text-blue-600 max-w-3xl mx-auto'>
        <span className='text-gray-800 mr-1'>
          Empower Your Learning Experience with courses
        </span>
        <img
          src={assets.sketch}
          alt='sketch'
          className='md:block hidden absolute -bottom-7 right-0'
        />
        from top educators.
      </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
        We provide a wide range of courses to help you learn and grow. Join us
        today and unlock your potential.
      </p>

      <p className='md:hidden text-gray-500 max-w-2xl mx-auto'>
        We provide a wide range of courses to help you learn and grow. Join us
        today and unlock your potential.
      </p>

      <SearchBar />
    </div>
  );
};

export default Hero;

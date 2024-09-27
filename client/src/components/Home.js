import React from 'react';
import UploadForm from './UploadForm';

const Home = () => {
  return (
    <div className='bg-custom-light'>
      <div className="flex flex-col items-center p-4 bg-custom-light">
        <img
          className="h-16 mr-3"
          src="/Pinn-dPost.png"
          alt="Logo"
        />
        <p className='p-4 text-font-grey'>
          Your one-stop solution for all pincode confusion
        </p>
      </div>

      <div className="flex flex-col items-center justify-evenly py-4 mt-4 md:flex-row">
        <div>
          <img
            className="h-[32rem] md:w-auto md:h-auto md:max-w-xl md:mr-8"
            src="/Group 16.png"
            alt="Img"
          />
        </div>

        <div className=" der-black mr-border md:w-1/3 border-black border-2 rounded-md p-2">
          <h3 className="mb-4 text-lg font-semibold text-center">Get Started</h3>
          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default Home;

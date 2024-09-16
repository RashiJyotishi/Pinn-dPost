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

      <div className="flex flex-col items-center py-4 mt-4 md:flex-row">

        <img
          className="h-[30rem] md:w-auto md:h-auto md:max-w-sm md:mr-8"
          src="/Group 16.png"
          alt="Img"
        />

        <div className="p-4 mr-10 rounded-lg der-black mr-border md:w-1/3">
          <h3 className="mb-4 text-lg font-semibold text-center">Get Started</h3>
          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default Home;

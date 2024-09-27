import React from 'react';
import logo from '../components/Vector.png';
import { Link } from 'react-router-dom';

const FooterLinks1 = [
  {  to: "/", label: "Home", external: false  },
  {  to: "/about", label: "About", external: false  },
  {  to: "/contributors", label: "Contributors", external: false  },
  {  to: "/resources", label: "Resources", external: false },
];

const FooterLinks2 = [
  {  to: "/documentation", label: "Documentation", external: false },
  {  to: "https://github.com/RashiJyotishi/Pinn-dPost", label: "Github", external: true },
  {  to: "https://www.indiapost.gov.in/vas/Pages/IndiaPostHome.aspx", label: "Indian Postal Services", external: true },
  {  to: "https://www.sih.gov.in/#process-timeline", label: "About Smart India Hackathon", external: true },
];

const Footer = () => {
  return (
    <footer className="bg-offWhite">
      <div className='bg-blueBg rounded-t-3xl flex w-full justify-center align-middle h-full'>
        <div className='flex-col justify-center'>
          <div id='topStuff' className='flex '>
            <div className='flex-col mr-28 text-xl my-10'>
              <ul>
                {FooterLinks1.map((item) => (!(item.external) ?
                  <li className=' my-8'>
                    <Link to={item.to} className='text-white underline my-6'>
                      {item.label}
                    </Link>
                  </li>
                  : <li className=' my-8'>
                    <a href={item.to} className='text-white underline my-6' target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex-col mr-28 text-xl my-10'>
              <ul>
                {FooterLinks2.map((item) => (!(item.external) ?
                  <li className=' my-8'>
                    <Link to={item.to} className='text-white underline'>
                      {item.label}
                    </Link>
                  </li>
                  : <li className=' my-8'>
                    <a href={item.to} className='text-white underline' target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex-col mr-28 my-16 inline'>
              <form>
                <p className='text-white font-light mb-2'>want to reach out?</p>
                <label htmlFor='name' className='text-white mb-6'>Name</label>
                <input id='name' placeholder='Enter Name' className='block py-1 px-1 w-96 rounded-md mb-6' type='text'></input>

                <label htmlFor='email' className='text-white mb-6'>Email</label>
                <input id='email' placeholder='Enter Email' className='block py-1 px-1 w-96 rounded-md mb-6' type='email'></input>
                <button className=' bg-slate-950 text-white px-2 py-1 rounded-md mt-2' type='reset'>
                  Submit
                </button>
              </form>

            </div>
          </div>

          <div id='bottomStuff' className=' flex text-center justify-center text-white text-lg mb-4' >
            Made with <div className='inline-block scale-75'><img src={logo} alt='heart' /></div> by Team 0x6coders
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

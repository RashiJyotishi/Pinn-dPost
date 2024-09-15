import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Import Header component
import Footer from './components/Footer'; // Import Footer component

const Layout = () => {
  return (
    <div>
      <Header />  {/* Include Header */}
      
      <main>
        <Outlet />  {/* Renders the nested route components */}
      </main>
      
      <Footer />  {/* Include Footer */}
    </div>
  );
};

export default Layout;

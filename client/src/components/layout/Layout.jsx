import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
//import ChatBot from '../common/ChatBot'; // 👈 Import the ChatBot

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      
      {/* 👈 Add ChatBot here, above the Footer */}
      {/* <ChatBot /> */}
      
      <Footer />
    </div>
  );
};

export default Layout;
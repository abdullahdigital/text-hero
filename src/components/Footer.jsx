import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 mt-8">
      <p>&copy; {new Date().getFullYear()} All rights reserved. Developed by <a href="https://www.instagram.com/abdullahwebmaster/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">abdullahwebmaster</a></p>
    </footer>
  );
}

export default Footer;
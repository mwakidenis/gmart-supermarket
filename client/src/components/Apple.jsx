import React, { useEffect, useState } from 'react';

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [navbarTitle, setNavbarTitle] = useState('Home'); // Initial title

  const sectionTitles = ['Home', 'About', 'Services', 'Contact', 'Footer'];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sectionIndex = Math.floor(scrollPosition / window.innerHeight);
      setCurrentSection(sectionIndex);
      setNavbarTitle(`${sectionTitles[sectionIndex]} Section`);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 




  return (
    <div>
      <nav>
        <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4">
          <p>{navbarTitle}</p>
        </div>
        <ul className="mt-16">
          {sectionTitles.map((title, index) => (
            <li key={index}>
              <a href={`#section${index + 1}`}>{title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {sectionTitles.map((title, index) => (
        <div key={index} id={`section${index +1}`} style={{ height: '100vh', border: '1px solid black' }}>
          <h2>{title}</h2>
        </div>
      ))}

     

      <footer>
        {/* Your footer content goes here */}
      </footer>
    </div>
  );
};

export default App;

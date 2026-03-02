import React, { useEffect, useRef } from 'react';
import './TrailingCursor.css';

const TrailingCursor = () => {
  const cursorRef = useRef(null);
  const dotsRef = useRef([]);

  // Create small dots
  const createDots = () => {
    for (let i = 0; i < 5; i++) {
      const dot = document.createElement('div');
      dot.classList.add('small-dot');
      dotsRef.current.push(dot);
      document.body.appendChild(dot);
    }
  };

  useEffect(() => {
    createDots();
    const cursor = cursorRef.current;

    const updateCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      dotsRef.current.forEach((dot, index) => {
        const delay = index * 100; // stagger the dot movements
        setTimeout(() => {
          dot.style.left = `${e.clientX}px`;
          dot.style.top = `${e.clientY}px`;
        }, delay);
      });
    };

    window.addEventListener('mousemove', updateCursor);
    
    return () => {
      window.removeEventListener('mousemove', updateCursor);
      dotsRef.current.forEach(dot => dot.remove());
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      {dotsRef.current.map((dot, index) => (
        <div key={index} className="small-dot" ref={(el) => (dotsRef.current[index] = el)}></div>
      ))}
    </>
  );
};

export default TrailingCursor;

import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import '../assets/styles/BackToTop.css';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show the button when the user scrolls 200px from the top
    const toggleVisibility = () => {
        if (window.pageYOffset > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Scroll to the top when the button is clicked
    const scrollToTop = () => {
        let scrollToTop = window.setInterval(function () {
            let pos = window.pageYOffset;
            if (pos > 0) {
                window.scrollTo(0, pos - 50); // Adjust this for scroll speed
            } else {
                window.clearInterval(scrollToTop);
            }
        }, 16); // This runs the scroll every 16ms for 60fps-like smoothness
    };


    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            id="backToTopBtn"
            style={{ display: isVisible ? 'block' : 'none' }}
            onClick={scrollToTop}
        >
            <FaArrowUp size={24} style={{marginLeft:"-2px"}}/>
        </button>
    );
};

export default BackToTopButton;

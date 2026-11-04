// TopCategoriesHead.js

import { motion } from 'framer-motion';
import './styles.css';

function TopCategoriesHead({ title, greenTitle }) {
  const containerVariants = {
    hidden: { opacity: 0, y:10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };

  return (
    <>
      <motion.div
        className="top-categories-container mt-5 px-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto flex justify-start items-center">
          <motion.h1
            className="font-poppins text-[30px] relative"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } }}
          >
            {title}{" "}
            <span className=' text-green-500 relative z-10'>{greenTitle}</span>
          </motion.h1>
        </div>
      </motion.div>
    </>
  );
}

export default TopCategoriesHead;

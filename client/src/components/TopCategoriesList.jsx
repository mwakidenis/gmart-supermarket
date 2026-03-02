import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function TopCategoriesList() {
  const categories = [
    { name: 'Fruits & Vegetables', image: 'veg.png' },
    { name: 'Dairy & Breakfast', image: 'fruit.png' },
    { name: 'Egg, Meat & Fish', image: 'egg-fish.png' },
    { name: 'Bath & Body', image: 'bath-body.png' },
    { name: 'Cold drinks & Juices', image: 'juice.png'},
    { name: 'Snacks & Munchies', image: 'snacks.png'},
    { name: 'Icy Delights', image: 'ice-cream.png'}
  ];

  const navigate = useNavigate();

  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className='mt-5 px-10'>
        <div className='container mx-auto flex justify-start items-center'>
          <motion.div
            className='md:grid md:grid-cols-7 md:gap-20 sm:grid sm:grid-cols-3 sm:gap-10'
            initial='hidden'
            animate='visible'
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className='flex flex-col items-center cursor-pointer border p-1.5 rounded-2xl'
                variants={listItemVariants}
                onClick={()=>{
                  navigate(`/categories/${encodeURIComponent(category.name.toLowerCase())}`);
                }}
              >
                <img
                  src={`/images/${category.image}`}
                  alt={category.name}
                  className=' transition transform ease-in-out hover:scale-105 duration-300 rounded-2xl'
                />
                <p className='text-center font hover:underline mt-2 sm:text-sm'>{category.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default TopCategoriesList;

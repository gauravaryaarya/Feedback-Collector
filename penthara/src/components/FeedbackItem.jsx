import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { formatDisplayDate } from '../utils/formatDate';

/*
  Displays a single feedback entry with all details.
 (JSDoc comments for props are now in the propTypes)
 */
function FeedbackItem({ item, onDeleteItem }) {
  
  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  const itemVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: -200, scale: 0.9 },
  };

  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      transition={{ duration: 0.4, type: 'spring' }}
      className="bg-white/10 backdrop-blur-sm p-5 rounded-lg shadow-lg my-4 relative"
    >
      <motion.button
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleDelete}
        className="absolute -top-3 -right-3 text-gray-200 bg-gray-900/50 hover:bg-red-500 hover:text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm transition-colors shadow-lg z-10"
        aria-label="Delete feedback"
      >
        &times;
      </motion.button>
      
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <div>
            <h3 className="font-bold text-lg text-white">{item.name}</h3>
            <a 
              href={`mailto:${item.email}`} 
              className="text-sm text-indigo-300 hover:text-indigo-200"
            >
              {item.email}
            </a>
          </div>
          <div className="text-xs text-gray-300 text-right">
            {/* --- UPDATED: Using the imported function --- */}
            {formatDisplayDate(item.createdAt)}
          </div>
        </div>
        
        <p className="text-gray-100 text-base pt-2">
          {item.message}
        </p>
      </div>
    </motion.div>
  );
}

// PropTypes remain the same
FeedbackItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteItem: PropTypes.func.isRequired,
};

export default FeedbackItem;
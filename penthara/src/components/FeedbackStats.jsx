import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/*
 Displays the total count and average rating.
 @param {Object} props
 @param {Array<Object>} props.feedback - The array of feedback items.
 */
function FeedbackStats({ feedback }) {
  const count = feedback.length;
  const average = count === 0
    ? 0
    : feedback.reduce((acc, current) => acc + current.rating, 0) / count;
  
  const formattedAverage = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg flex justify-between items-center my-4 text-lg text-gray-100"
    >
      <h4 className="font-semibold">
        {count} {count === 1 ? 'Review' : 'Reviews'}
      </h4>
      <h4 className="font-semibold">
        Average Rating: {count === 0 ? 0 : formattedAverage}
      </h4>
    </motion.div>
  );
}

FeedbackStats.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      rating: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

FeedbackStats.defaultProps = {
  feedback: [],
};

export default FeedbackStats;
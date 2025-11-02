import PropTypes from 'prop-types';
import FeedbackItem from './FeedbackItem'; 
import { AnimatePresence, motion } from 'framer-motion';

/*
 Renders the list of feedback items.cWraps the list in AnimatePresence to handle exit animations.
 @param {Object} props
 @param {Array<Object>} props.feedback - The array of feedback objects to display.
 @param {Function} props.onDeleteItem - The handler function to pass down to each item.
 */
function FeedbackList({ feedback, onDeleteItem }) {

  // Empty State
  // If the list is empty, show acmessage
  if (!feedback || feedback.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-gray-400 my-10 p-5 bg-white/5 rounded-lg"
      >
        <p className="text-lg">No Feedback Submitted Yet</p>
        <p className="text-sm">Be the first to share your thoughts!</p>
      </motion.div>
    );
  }

  // List Rendering
  return (
    <div className="mt-8">
      {/*
        AnimatePresence is the key to exit animations.
        It detects when a child component is removed from the list
        and plays its "exit" animation before removing it from the DOM.
      */}
      <AnimatePresence>
        {feedback.map((item) => (
          <FeedbackItem 
            key={item.id}     // React needs this for list rendering
            item={item}       // Pass the full item object as a prop
            onDeleteItem={onDeleteItem} // Pass the delete handler down
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

//Prop Type Validation
FeedbackList.propTypes = {
  
  //The array of feedback objects. Not required, as it can be empty.
  feedback: PropTypes.arrayOf(
    // We can just re-use the shape from FeedbackItem
    FeedbackItem.propTypes.item.type 
  ),
  
   //The delete handler function. Required to pass down.
  onDeleteItem: PropTypes.func.isRequired,
};

// Default props prevent errors if 'feedback' is undefined
FeedbackList.defaultProps = {
  feedback: [],
};

export default FeedbackList;
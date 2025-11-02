import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

/* A form for submitting new user feedback (name, email, message).It manages its own state and validation.
   @param {Object} props
   @param {Function} props.onAddFeedback - The function to call when submitting new feedback.
 */
function FeedbackForm({ onAddFeedback }) {
  // State for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // State for validation and UI
  const [validationMessage, setValidationMessage] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  // Simple email regex for basic validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  /*
   A central handler to update state for any input field. This is more scalable than creating a handler for each input.
   @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Update the corresponding state
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  /*
   Handles the form submission. Validates data, calls the parent handler, and resets the form.
   @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload

    // Final Validation 
    if (name.trim().length === 0 || email.trim().length === 0 || message.trim().length === 0) {
      setValidationMessage('All fields are required.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setValidationMessage('Please enter a valid email address.');
      return;
    }

    // Validation passed, create new feedback object
    const newFeedback = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    };

    // Call the handler function passed down from the parent
    onAddFeedback(newFeedback);

    // Reset form
    setName('');
    setEmail('');
    setMessage('');
    setBtnDisabled(true);
    setValidationMessage(null);
  };

  // Refactored Input Handler with Validation

  /*
   Handles changes for all inputs and performs real-time validation to enable/disable the submit button.
   @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e
   */
  const handleAndValidateChange = (e) => {
    const { name, value } = e.target;
    let currentName = name;
    let currentEmail = email;
    let currentMessage = message;

    if (name === 'name') {
      setName(value);
      currentName = value; // Use the new value for validation
    } else if (name === 'email') {
      setEmail(value);
      currentEmail = value;
    } else if (name === 'message') {
      setMessage(value);
      currentMessage = value;
    }
    
    // Clear validation message on type
    if (validationMessage) {
      setValidationMessage(null);
    }

    // Validation Logic
    if (
      currentName.trim().length > 0 &&
      currentEmail.trim().length > 0 &&
      currentMessage.trim().length > 0 &&
      emailRegex.test(currentEmail.trim())
    ) {
      setBtnDisabled(false); // Enable button if all fields are valid
    } else {
      setBtnDisabled(true); // else, keep it disabled
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      // Glassmorphism UI
      className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg my-4"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-100">
          Penthara Technologies
        </h2>
        
        {/* Form Fields Container */}
        <div className="space-y-4">
          
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name" // 'name' attribute is key for our handler
              value={name} // Controlled component
              onChange={handleAndValidateChange} // Use the new handler
              placeholder="e.g., Gaurav Arya"
              className="w-full bg-white/5 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email} // Controlled component
              onChange={handleAndValidateChange}
              placeholder="e.g., gaurav@example.com"
              className="w-full bg-white/5 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-200 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message} // Controlled component
              onChange={handleAndValidateChange}
              placeholder="Tell us what you think..."
              className="w-full bg-white/5 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Validation Message */}
        {validationMessage && (
          <div className="text-red-400 text-center mt-4">
            {validationMessage}
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <motion.button
            type="submit"
            disabled={btnDisabled}
            whileHover={!btnDisabled ? { scale: 1.05 } : {}}
            whileTap={!btnDisabled ? { scale: 0.95 } : {}}
            className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Submit Feedback
          </motion.button>
        </div>
        
      </form>
    </motion.div>
  );
}

// JSDoc-style comments are in the function, this is for prop-types
FeedbackForm.propTypes = {
  //Function to call from the parent to add a new feedback entry.
   
  onAddFeedback: PropTypes.func.isRequired,
};

export default FeedbackForm;
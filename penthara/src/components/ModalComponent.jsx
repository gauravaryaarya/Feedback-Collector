import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

/*
A reusable, animated modal component for confirmations or alerts.
 This component controls its own animation state based on the 'isOpen' prop.
 */
function ModalComponent({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  children, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel' 
}) {


  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } },
    exit: { opacity: 0, scale: 0.9, y: 50, transition: { duration: 0.2 } },
  };

  return (
   
    <AnimatePresence>
      {isOpen && (
        // 1. The Backdrop 
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Click on the background to close the modal
        >
          {/* 2. The Modal Card */}
          <motion.div
            className="bg-gray-800 text-white rounded-lg shadow-xl w-full max-w-md p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Stop click from bubbling up to the backdrop
          >
            {/* Modal Header */}
            <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>

            {/* Modal Body */}
            <div className="text-gray-300 mb-6">
              {children}
            </div>

            {/* Modal Footer (Buttons) */}
            <div className="flex justify-end space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                {cancelText}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onConfirm}
                
                className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                {confirmText}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Prop Type Validation
ModalComponent.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ModalComponent;
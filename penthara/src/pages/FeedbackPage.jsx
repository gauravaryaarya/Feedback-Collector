import { useState, useEffect, useMemo } from 'react';
import { FeedbackService } from '../services/FeedbackService';
import FeedbackForm from '../components/FeedbackForm';
import Filter from '../components/Filter';
import FeedbackList from '../components/FeedbackList';
import ModalComponent from '../components/ModalComponent';

//The main page component that holds all application state and renders all child components.

function FeedbackPage() {
  // State Variables

  // State for the master list of feedback
  const [feedbackList, setFeedbackList] = useState([]);
  // State for the loading indicator
  const [isLoading, setIsLoading] = useState(true);

  // Filter State
  const [keyword, setKeyword] = useState('');
  const [date, setDate] = useState(''); // Stores date as YYYY-MM-DD string

  // Modal State 
  const [isModalOpen, setIsModalOpen] = useState(false);
  // This state holds the ID of the item we *intend* to delete
  const [itemToDelete, setItemToDelete] = useState(null);

  // Side Effects (Data Fetching)

  
  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const data = await FeedbackService.getFeedback();
        setFeedbackList(data);
      } catch (error) {
        console.error("Failed to load feedback:", error);
        
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedback();
  }, []); // The empty array means "run this only on mount"

  // Event Handlers

  
  const handleAddFeedback = async (feedbackData) => {
    try {
      // 1. Call service to save data (which returns the full item with ID/date)
      const newFeedback = await FeedbackService.addFeedback(feedbackData);
      
      // 2. Update local state. This is an immutable update.
      // We add the new item to the top of the list.
      setFeedbackList([newFeedback, ...feedbackList]);
      
    } catch (error) {
      console.error("Failed to add feedback:", error);
    }
  };

  
  const handleDeleteRequest = (id) => {
    setItemToDelete(id); // Store the ID
    setIsModalOpen(true); // Open the modal
  };

  
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        // 1. Call service to delete from localStorage
        await FeedbackService.deleteFeedback(itemToDelete);
        
        // 2. Update local state by filtering out the deleted item
        setFeedbackList(feedbackList.filter((item) => item.id !== itemToDelete));
        
      } catch (error) {
        console.error("Failed to delete feedback:", error);
      } finally {
        // 3. Close the modal and reset the ID
        setIsModalOpen(false);
        setItemToDelete(null);
      }
    }
  };

  // Handles the "Cancel" or backdrop click from the Modal.
   
  const handleModalClose = () => {
    setIsModalOpen(false);
    setItemToDelete(null);
  };

 
  const handleFilterChange = (filterName, value) => {
    if (filterName === 'keyword') {
      setKeyword(value);
    } else if (filterName === 'date') {
      setDate(value);
    }
  };

  // Derived State (Filtering)

 
  const filteredFeedback = useMemo(() => {
    const lowerKeyword = keyword.toLowerCase();

    return feedbackList.filter((item) => {
      // 1. Keyword Check (name, email, or message)
      const keywordMatch =
        item.name.toLowerCase().includes(lowerKeyword) ||
        item.email.toLowerCase().includes(lowerKeyword) ||
        item.message.toLowerCase().includes(lowerKeyword);

      // 2. Date Check
      // If no date is selected, it's a match.
      if (!date) {
        return keywordMatch;
      }
      
      // Compare 'YYYY-MM-DD' from date picker with item's ISO string
      const itemDate = item.createdAt.split('T')[0]; // "2025-11-02T..." -> "2025-11-02"
      const dateMatch = (itemDate === date);

      // 3. Final Check: Must match both (if date is provided)
      return keywordMatch && dateMatch;
    });
  }, [feedbackList, keyword, date]); // Dependencies

  // Render Logic

  return (
    <div className="container mx-auto max-w-2xl px-4">
      
      {/* 1. The Form */}
      <FeedbackForm onAddFeedback={handleAddFeedback} />
      
      {/* 2. The Filter */}
      <Filter 
        keyword={keyword}
        date={date}
        onFilterChange={handleFilterChange}
      />

      {/* 3. The List (conditionally rendered) */}
      <div className="mt-8">
        {isLoading ? (
          <p className="text-center text-gray-300">Loading feedback...</p>
        ) : (
          <FeedbackList 
            feedback={filteredFeedback} // Pass the *filtered* list
            onDeleteItem={handleDeleteRequest} // Pass the "open modal" handler
          />
        )}
      </div>
      
      {/* 4. The Modal (always rendered, controls its own visibility) */}
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirmDelete}
        title="Delete Feedback"
        confirmText="Delete"
      >
        <p>Are you sure you want to delete this feedback entry? This action cannot be undone.</p>
      </ModalComponent>
    </div>
  );
}

export default FeedbackPage;
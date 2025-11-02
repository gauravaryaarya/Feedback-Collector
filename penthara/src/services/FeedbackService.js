//The key used to store feedback data in localStorage.
const STORAGE_KEY = 'feedbackApp:entries';

const getFeedback = () => {
  return new Promise((resolve) => {
    try {
      const storedEntries = localStorage.getItem(STORAGE_KEY);
      // Parse entries or return an empty array if null
      const entries = storedEntries ? JSON.parse(storedEntries) : [];
      
      // We'll sort by date here to ensure newest is always first
      entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      resolve(entries);
    } catch (error) {
      console.error("Failed to retrieve feedback:", error);
      resolve([]);
    }
  });
};


const addFeedback = (feedbackData) => {
  return new Promise((resolve, reject) => {
    // Validation for the new required fields
    if (!feedbackData || !feedbackData.name || !feedbackData.email || !feedbackData.message) {
      return reject(new Error('Invalid feedback data. Name, email, and message are required.'));
    }

    // Get the current list first
    getFeedback().then(currentEntries => {
      try {
        // Create the new entry with a unique ID and a new ISO date string
        const newEntry = {
          ...feedbackData,
          id: Date.now(), // Simple unique ID
          createdAt: new Date().toISOString(), // e.g., "2025-11-02T17:30:00.000Z"
        };

        // Add the new entry to the list
        const updatedEntries = [newEntry, ...currentEntries];
        
        // Note: getFeedback() already sorts, but adding to the
        // front is good practice for the local state update.

        // Save the updated array back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

        // Resolve with the new entry, just like a real API would
        resolve(newEntry);
      } catch (error) {
        console.error("Failed to add feedback:", error);
        reject(error);
      }
    });
  });
};

//Deletes a feedback entry by its ID from localStorage. Simulates an async API call.

const deleteFeedback = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      return reject(new Error('No ID provided for deletion.'));
    }

    getFeedback().then(currentEntries => {
      try {
        // Create a new array that excludes the item with the matching ID
        const updatedEntries = currentEntries.filter(item => item.id !== id);

        // Save the new, filtered array back
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));

        // Resolve with the ID of the item that was deleted
        resolve(id);
      } catch (error) {
        console.error("Failed to delete feedback:", error);
        reject(error);
      }
    });
  });
};

// Export all functions as a single service object
export const FeedbackService = {
  getFeedback,
  addFeedback,
  deleteFeedback,
};
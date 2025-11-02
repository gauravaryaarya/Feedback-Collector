import PropTypes from 'prop-types';

/*
 A component with inputs for filtering the feedback list by keyword (name, email, or message) and by date.
 @param {Object} props
 @param {string} props.keyword - The current keyword filter value (from parent state).
 @param {string} props.date - The current date filter value (from parent state).
 @param {Function} props.onFilterChange - Parent handler function to update filter state.
 */
function Filter({ keyword, date, onFilterChange }) {

  /*
   Handles changes for both the keyword and date inputs.
   It calls the parent's handler with the input's 'name' and 'value'.
   @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  //Handles the "Clear" button click. It tells the parent to reset both filter values.
   
  const handleClear = () => {
    onFilterChange('keyword', '');
    onFilterChange('date', '');
  };

  return (
    // Use the same glassmorphism style for consistency
    <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg shadow-lg my-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
        
        {/* Keyword Filter Input */}
        <input
          type="text"
          name="keyword" // 'name' attribute is crucial for the handler
          value={keyword}
          onChange={handleChange}
          placeholder="Filter by keyword (name, email, message)..."
          className="flex-1 bg-white/5 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Date Filter Input */}
        <input
          type="date"
          name="date" // 'name' attribute is crucial
          value={date}
          onChange={handleChange}
          className="bg-white/5 border border-gray-700 text-gray-100 placeholder-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

// Prop Type Validation
Filter.propTypes = {
  //The current value of the keyword filter.
   
  keyword: PropTypes.string.isRequired,
  
  //The current value of the date filter (YYYY-MM-DD).
   
  date: PropTypes.string.isRequired,
  
  //Parent function to call when any filter input changes.It receives (name, value) as arguments.
   
  onFilterChange: PropTypes.func.isRequired,
};

export default Filter;
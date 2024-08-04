export function formatDateToYYYYMMDD(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);
  
    // Extract the year, month, and day components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    // Format and return the date as 'YYYY-MM-DD'
    return `${year}-${month}-${day}`;
  }
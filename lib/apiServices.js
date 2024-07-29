const BASE_URL = "http://localhost:3000"

export async function getData(url, method = 'GET') {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method, // HTTP method (GET, POST, etc.)
        cache: 'no-store', // Ensure fresh data fetching
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  }
  

  export async function getData_By_userId(url, method = 'GET') {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method, // HTTP method (GET, POST, etc.)
        cache: 'no-store', // Ensure fresh data fetching
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  }
  


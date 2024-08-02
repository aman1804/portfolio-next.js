const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

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
  

  export async function postData(url, data, method = 'POST') {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method, // HTTP method (GET, POST, etc.)
        cache: 'no-store', // Ensure fresh data fetching
        headers: {
          'Content-Type': 'application/json', // Set the appropriate headers
        },
        body: JSON.stringify(data), // Convert the data to JSON string
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  }

  export async function deleteData(url, method = 'DELETE') {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method, // HTTP method (GET, POST, etc.)
        cache: 'no-store', // Ensure fresh data fetching
        headers: {
          'Content-Type': 'application/json', // Set the appropriate headers
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      throw error; // Re-throw the error to be handled by the calling code
    }
  }






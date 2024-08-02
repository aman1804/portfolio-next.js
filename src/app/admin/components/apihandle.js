"use client"
export async function postData(url, data, method = 'POST') {
    try {
      // const b_url = await process.env.local.BASE_URL
      // console.log('aaa', b_url )
      const response = await fetch(`${url}`, {
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
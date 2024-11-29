type FetchOptions = {
  url: string; // API endpoint
  method?: "GET" | "POST" | "PATCH" | "DELETE"; // HTTP method
  headers?: Record<string, string>; // Optional headers
  body?: string; // Optional body for POST/PATCH
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const TOKEN = process.env.JWT_SECRET; // Ensure this is correctly set

export const fetchApi = async <T>(options: FetchOptions): Promise<T> => {
    const contentType = "application/json";
    const headers = {
      "Content-Type": contentType,
      Authorization: `Bearer ${TOKEN}`,
      ...options.headers, // Custom headers can still be passed in
    };

  const requestOptions: RequestInit = {
    method: options.method,
    headers,
    body: options.body,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/transaction`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error; // Rethrow the error for further handling in the calling function
  }
};

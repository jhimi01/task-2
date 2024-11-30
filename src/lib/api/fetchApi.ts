type FetchOptions = {
  url: string; 
  method?: "GET" | "POST" | "PATCH" | "DELETE"; 
  headers?: Record<string, string>; 
  body?: string; 
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

const TOKEN = process.env.JWT_SECRET;

export const fetchApi = async <T>(options: FetchOptions): Promise<T> => {
  const contentType = "application/json";
  const headers = {
    "Content-Type": contentType,
    Authorization: `Bearer ${TOKEN}`,
    ...options.headers, 
  };

  const requestOptions: RequestInit = {
    method: options.method,
    headers,
    body: options.body,
  };

  try {
    const response = await fetch(`${BASE_URL}transaction`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching API:", error);
    throw error; 
  }
};

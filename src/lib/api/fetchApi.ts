type FetchOptions = {
  url: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  body?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNzMzMTUzMDU3LCJleHAiOjE3MzMyMzk0NTd9.VNnEkyTQJoWaaCRxMMSOB3vUlPavEbjND-lD7_d1upA";

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

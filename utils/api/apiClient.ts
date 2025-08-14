export interface ApiResponse<T> {
  status: number;
  data: T;
  error: string | null;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });

    const json = await res.json();
    return json;
  } catch (error: any) {
    return {
      status: 0,
      data: null as unknown as T,
      error: error.message || "Something went wrong",
    };
  }
}

export interface ApiResponse<T> {
  status: number;
  data: T;
  error: string | { message?: string; [key: string]: unknown } | null;
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const getAuthToken = () => {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("zustand-auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.state?.user?.accessToken ?? null;
  } catch {
    return null;
  }
};

export const getApiErrorMessage = (
  error: ApiResponse<unknown>["error"],
  fallback = "Something went wrong"
) => {
  if (!error) return fallback;
  if (typeof error === "string") return error;
  return error.message || fallback;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }
    const token = getAuthToken();
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const text = await res.text();
    if (!text) {
      return {
        status: res.ok ? 1 : 0,
        data: null as T,
        error: res.ok ? null : res.statusText,
      };
    }

    return JSON.parse(text);
  } catch (error: any) {
    return {
      status: 0,
      data: null as unknown as T,
      error: error.message || "Something went wrong",
    };
  }
}

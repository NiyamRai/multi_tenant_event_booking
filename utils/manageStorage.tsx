

// =============================== Session Storage Utility ==========================

export const getSessionItem = (key: string) => {
  if (typeof window === "undefined") return null; // ✅ Avoid SSR issues
  const storedValue = sessionStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};
export const setSessionItem = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeSessionItem = (key: string) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};

export const createSessionStorage = (key: string) => ({
  getItem: getSessionItem,
  setItem: setSessionItem,
  removeItem: removeSessionItem,
});

//===================================== Local Storage Utility ===========================

export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null; // ✅ Avoid SSR issues
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

export const setLocalStorage = (key: string, value: unknown) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
export const createLocalStorage = (key: string) => ({
  getItem: getLocalStorage,
  setItem: setLocalStorage,
  removeItem: removeLocalStorage,
});

// =============================== END =============================

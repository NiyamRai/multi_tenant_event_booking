import { useState, useEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
}

const useScreenSize = (): ScreenSize => {
  // Initialize with default values (avoid accessing `window` directly)
  const [screenSize, setScreenSize] = useState<ScreenSize | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setScreenSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial screen size after mounting
      updateScreenSize();

      // Listen for resize events
      window.addEventListener("resize", updateScreenSize);

      return () => {
        window.removeEventListener("resize", updateScreenSize);
      };
    }
  }, []);

  return screenSize || { width: 420, height: 768 };
};

export default useScreenSize;

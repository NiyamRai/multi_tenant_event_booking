import { toast } from "sonner";

// Types for constants

export const isMobile = (val: string): boolean => {
  // 10-digit mobile number
  return /^\d*$/.test(val) && val.length === 10;
};

export const isNumber = (val: string, len?: number): boolean => {
  // Numeric value of certain length
  if (len !== undefined) {
    return /^\d*$/.test(val) && val.length === len;
  }
  return /^\d*$/.test(val);
};

export const isValidPassword = (val: string): boolean => {
  // Check if the text contains at least one lowercase letter, one uppercase letter, one number, and is at least 6 characters long
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(val);
};

export const isAlphanumeric = (val: string): boolean => {
  // Check if the string contains only letters and numbers
  const regex = /^[a-zA-Z0-9]+$/;
  return regex.test(val);
};

export const handleCopy = (text: string): void => {
  // Create a textarea element to copy the text
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);

  // Select the text in the textarea
  textarea.select();

  // Copy the selected text to the clipboard
  document.execCommand("copy");

  // Remove the textarea element
  document.body.removeChild(textarea);

  // Alert the user that the text has been copied
  toast("Text copied to clipboard!");
};

export function removeNonNumeric(str: string): string {
  return str.replace(/\D/g, "");
}

export function formatToRupee(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function getRandomNumbers(len: number, till: number = 25): number[] {
  const length = len % till;
  const availableNumbers = Array.from(Array(till).keys());
  const result: number[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    result.push(availableNumbers[randomIndex]);
    availableNumbers.splice(randomIndex, 1); // Remove the selected number to avoid repetition
  }

  return result;
}

export function getRandomNumber(max: number): number {
  return Math.floor(Math.random() * max);
}

export function totalSeconds(): number {
  const date = new Date(); // current date
  return Math.floor(date.getTime() / 1000);
}

export const compressText = (id: string): string => {
  if (!id) return ""; // Handle the case if the id is null or undefined
  return `${id.slice(0, 4)}...${id.slice(-3)}`;
};

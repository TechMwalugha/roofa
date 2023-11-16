import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

 export function generateRandom32ByteString(): string {
  // Create an array of 32 random bytes
  const randomValues = new Uint8Array(32);
  crypto.getRandomValues(randomValues);

  // Convert the random bytes to a hexadecimal string
  const hexString = Array.from(randomValues)
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');

  return hexString;
}

export function formatDateString(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, options);

  const time = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${time} - ${formattedDate}`;
}

const random32ByteString = generateRandom32ByteString();



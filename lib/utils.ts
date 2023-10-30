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

const random32ByteString = generateRandom32ByteString();

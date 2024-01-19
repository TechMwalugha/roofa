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

export function getSecondsDifference(userJoinDate: string) {
  const targetDate = new Date(userJoinDate);

        // Get the current date
        const currentDate = new Date();

        // Calculate the time difference in milliseconds
        const timeDifference = currentDate.getTime() - targetDate.getTime();

        // Convert milliseconds to a more readable format (e.g., seconds)
         const secondsDifference = Math.floor(timeDifference / 1000);
         
         return secondsDifference
}

export function formatDateDifference(date: Date): string {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - date.getTime();
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(weeks / 4.35); // average number of weeks in a month
  const years = Math.floor(months / 12);

  if (years > 1) {
      return `${years} years ago`;
  } else if (months > 1) {
      return `${months} months ago`;
  } else if (weeks > 1) {
      return `${weeks} weeks ago`;
  } else if (days > 1) {
      return `${days} days ago`;
  } else if (hours > 1) {
      return `${hours} hours ago`;
  } else if (minutes > 1) {
      return `${minutes} minutes ago`;
  } else {
      return `${seconds} seconds ago`;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Write the text to the clipboard
    await navigator.clipboard.writeText(text);

    // Successfully copied to clipboard
    return true;
  } catch (err) {
    // Unable to copy to clipboard
    console.error('Error copying text to clipboard:', err);
    return false;
  }
}

// share on social media

export function shareOnTwitter(text: string, url: string): void {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  openShareDialog(twitterUrl);
}

export function shareOnWhatsApp(text: string, url: string): void {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
  openShareDialog(whatsappUrl);
}

export function shareOnFacebook(url: string): void {
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  openShareDialog(facebookUrl);
}

export function shareOnInstagram(imageUrl: string, caption: string): void {
  // Instagram sharing is more restricted, usually done via the mobile app.
  // Here, we construct a URL that opens the Instagram app, but actual sharing is done manually by the user.
  const instagramUrl = `instagram://library?AssetPath=${encodeURIComponent(imageUrl)}&Caption=${encodeURIComponent(caption)}`;
  openShareDialog(instagramUrl);
}

export function shareViaEmail(subject: string, body: string, recipients: string[]): void {
  const emailUrl = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  openShareDialog(emailUrl);
}

export function openShareDialog(url: string): void {
  // Open the share dialog in a new window or redirect the current window
  window.open(url, '_blank');
}

// compare arrays
export function arraysAreEqual(arr1: any[], arr2: any[]) {
  // Check if arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Check if all elements have the same value
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  // If both conditions pass, arrays are equal
  return true;
}
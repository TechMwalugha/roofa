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

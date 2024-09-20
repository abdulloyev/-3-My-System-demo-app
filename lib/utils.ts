import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// CSS classlarni birlashtirish funksiyasi
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cookie qiymatlarini olish funksiyasi
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

// Cookie qiymatini o'chirish funksiyasi
export function deleteCookie(name: string) {
  if (typeof document !== "undefined") {
    // Cookie qiymatini bo'sh qilib va muddati o'tgan qilib o'rnatish
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export function getReadingTime(content: string) {
  const WPS = 250 / 60;

  let images = 0;
  const regex = /\w/;

  const words = content.split(" ").filter(word => {
    if (word.includes("<img")) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  const imageAdjust = images * 4;
  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60);

  if (minutes < 9) {
    return "0" + minutes;
  } else {
    return minutes;
  }
}

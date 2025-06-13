import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes to avoid conflicts
 * @param inputs - Class names to combine
 * @returns Merged class string
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

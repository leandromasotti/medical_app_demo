/**
 * Utility functions for path handling in Next.js
 */

/**
 * Resolves a relative path to an absolute path
 * This is useful for API endpoints that need to be resolved at runtime
 * 
 * @param path The relative path to resolve
 * @returns The absolute path
 */
export function resolveApiPath(path: string): string {
  // Get the base URL from environment variables or use a default
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  
  // Ensure the path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  return `${baseUrl}${normalizedPath}`;
}

/**
 * Formats a price value to a localized string
 * 
 * @param price The price to format
 * @param locale The locale to use for formatting
 * @returns The formatted price string
 */
export function formatPrice(price: number, locale = 'en-US'): string {
  return price.toLocaleString(locale, {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Truncates a string to a specified length and adds an ellipsis
 * 
 * @param text The text to truncate
 * @param maxLength The maximum length of the truncated text
 * @returns The truncated text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
}

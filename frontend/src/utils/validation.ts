/**
 * Validation Utilities
 */

import { isAddress } from 'viem';

/**
 * Validate Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return isAddress(address);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate IPFS CID
 */
export function isValidCID(cid: string): boolean {
  // Basic CIDv0 and CIDv1 validation
  const cidRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44}|b[A-Za-z2-7]{58})$/;
  return cidRegex.test(cid);
}

/**
 * Validate positive number
 */
export function isPositiveNumber(value: string | number): boolean {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num > 0;
}

/**
 * Validate integer
 */
export function isInteger(value: string | number): boolean {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && Number.isInteger(num);
}

/**
 * Validate file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.some(type => {
    if (type.endsWith('/*')) {
      const category = type.split('/')[0];
      return file.type.startsWith(category + '/');
    }
    return file.type === type;
  });
}

/**
 * Validate file size
 */
export function isValidFileSize(file: File, maxSizeMB: number): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}

/**
 * Validate audio file
 */
export function isValidAudioFile(file: File): boolean {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/flac'];
  const maxSize = 100; // 100MB
  return isValidFileType(file, allowedTypes) && isValidFileSize(file, maxSize);
}

/**
 * Validate image file
 */
export function isValidImageFile(file: File): boolean {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 10; // 10MB
  return isValidFileType(file, allowedTypes) && isValidFileSize(file, maxSize);
}

/**
 * Validate token symbol (3-5 uppercase letters)
 */
export function isValidTokenSymbol(symbol: string): boolean {
  const symbolRegex = /^[A-Z]{3,5}$/;
  return symbolRegex.test(symbol);
}

/**
 * Validate token name
 */
export function isValidTokenName(name: string): boolean {
  return name.length >= 3 && name.length <= 50;
}

/**
 * Validate supply amount
 */
export function isValidSupply(supply: string): boolean {
  const num = parseFloat(supply);
  return !isNaN(num) && num >= 1000 && num <= 1000000000;
}

/**
 * Validate price
 */
export function isValidPrice(price: string): boolean {
  const num = parseFloat(price);
  return !isNaN(num) && num > 0 && num < 1000000;
}

/**
 * Validate percentage (0-100)
 */
export function isValidPercentage(value: string | number): boolean {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= 0 && num <= 100;
}

/**
 * Validate ISRC code (International Standard Recording Code)
 */
export function isValidISRC(isrc: string): boolean {
  const isrcRegex = /^[A-Z]{2}-?\w{3}-?\d{2}-?\d{5}$/;
  return isrcRegex.test(isrc);
}

/**
 * Validate ISWC code (International Standard Musical Work Code)
 */
export function isValidISWC(iswc: string): boolean {
  const iswcRegex = /^T-?\d{3}\.?\d{3}\.?\d{3}-?\d$/;
  return iswcRegex.test(iswc);
}

/**
 * Validate username
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
}

/**
 * Validate description length
 */
export function isValidDescription(description: string, minLength = 10, maxLength = 1000): boolean {
  return description.length >= minLength && description.length <= maxLength;
}

/**
 * Sanitize input string
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

/**
 * Validate date is in the past
 */
export function isDateInPast(dateString: string): boolean {
  const date = new Date(dateString);
  return date < new Date();
}

/**
 * Validate date is in the future
 */
export function isDateInFuture(dateString: string): boolean {
  const date = new Date(dateString);
  return date > new Date();
}

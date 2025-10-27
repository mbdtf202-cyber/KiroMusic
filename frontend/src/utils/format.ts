/**
 * Formatting Utilities
 */

import { formatUnits, parseUnits } from 'viem';

/**
 * Format Ethereum address to short form
 */
export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Format ETH amount with proper decimals
 */
export function formatEther(value: bigint | string, decimals = 4): string {
  try {
    const formatted = formatUnits(BigInt(value), 18);
    const num = parseFloat(formatted);
    return num.toFixed(decimals);
  } catch {
    return '0.0000';
  }
}

/**
 * Format token amount with custom decimals
 */
export function formatTokenAmount(
  value: bigint | string,
  tokenDecimals = 18,
  displayDecimals = 2
): string {
  try {
    const formatted = formatUnits(BigInt(value), tokenDecimals);
    const num = parseFloat(formatted);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: displayDecimals,
      maximumFractionDigits: displayDecimals,
    });
  } catch {
    return '0.00';
  }
}

/**
 * Parse ETH amount to wei
 */
export function parseEther(value: string): bigint {
  try {
    return parseUnits(value, 18);
  } catch {
    return BigInt(0);
  }
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format date to readable string
 */
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date with time
 */
export function formatDateTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format time ago (e.g., "2 hours ago")
 */
export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp * 1000;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
}

/**
 * Format duration in seconds to MM:SS
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format USD amount
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Format transaction hash
 */
export function formatTxHash(hash: string, chars = 6): string {
  return formatAddress(hash, chars);
}

/**
 * Format IPFS CID
 */
export function formatCID(cid: string, chars = 8): string {
  if (!cid || cid.length <= chars * 2) return cid;
  return `${cid.slice(0, chars)}...${cid.slice(-chars)}`;
}

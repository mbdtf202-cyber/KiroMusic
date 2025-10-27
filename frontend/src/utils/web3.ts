/**
 * Web3 Utility Functions
 */

import { parseEther, formatEther } from 'viem';

export function calculatePercentage(part: bigint, total: bigint): number {
  if (total === 0n) return 0;
  return Number((part * 100n) / total);
}

export function calculateShare(totalAmount: bigint, userBalance: bigint, totalSupply: bigint): bigint {
  if (totalSupply === 0n) return 0n;
  return (totalAmount * userBalance) / totalSupply;
}

export function estimateGasCost(gasLimit: bigint, gasPrice: bigint): bigint {
  return gasLimit * gasPrice;
}

export function addPercentage(amount: bigint, percentage: number): bigint {
  const multiplier = BigInt(Math.floor((100 + percentage) * 100));
  return (amount * multiplier) / 10000n;
}

export function subtractPercentage(amount: bigint, percentage: number): bigint {
  const multiplier = BigInt(Math.floor((100 - percentage) * 100));
  return (amount * multiplier) / 10000n;
}

export function calculateAPY(principal: bigint, earned: bigint, days: number): number {
  if (principal === 0n || days === 0) return 0;
  const dailyReturn = Number(earned) / Number(principal) / days;
  const apy = (Math.pow(1 + dailyReturn, 365) - 1) * 100;
  return apy;
}

export function calculateROI(invested: bigint, current: bigint): number {
  if (invested === 0n) return 0;
  return Number(((current - invested) * 100n) / invested);
}

export function isValidTransaction(tx: any): boolean {
  return tx && tx.hash && tx.hash.startsWith('0x') && tx.hash.length === 66;
}

export function getExplorerUrl(chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    11155111: 'https://sepolia.etherscan.io',
  };

  const baseUrl = explorers[chainId] || '';
  return baseUrl ? `${baseUrl}/${type}/${hash}` : '';
}

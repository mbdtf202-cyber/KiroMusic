/**
 * Error Handling Utilities
 */

import { ErrorCode, AppError } from '../types';

export class KiroMusicError extends Error {
  code: ErrorCode;
  details?: any;
  timestamp: number;

  constructor(code: ErrorCode, message: string, details?: any) {
    super(message);
    this.name = 'KiroMusicError';
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
  }

  toJSON(): AppError {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      timestamp: this.timestamp,
    };
  }
}

export function handleContractError(error: any): KiroMusicError {
  const message = error?.message || 'Contract interaction failed';
  
  if (message.includes('user rejected')) {
    return new KiroMusicError(
      ErrorCode.TRANSACTION_FAILED,
      'Transaction was rejected by user',
      error
    );
  }
  
  if (message.includes('insufficient funds')) {
    return new KiroMusicError(
      ErrorCode.INSUFFICIENT_FUNDS,
      'Insufficient funds for transaction',
      error
    );
  }
  
  return new KiroMusicError(ErrorCode.CONTRACT_ERROR, message, error);
}

export function handleNetworkError(error: any): KiroMusicError {
  return new KiroMusicError(
    ErrorCode.NETWORK_ERROR,
    'Network request failed',
    error
  );
}

export function handleIPFSError(error: any): KiroMusicError {
  return new KiroMusicError(
    ErrorCode.IPFS_ERROR,
    'IPFS operation failed',
    error
  );
}

export function handleValidationError(message: string): KiroMusicError {
  return new KiroMusicError(ErrorCode.VALIDATION_ERROR, message);
}

/**
 * Simplified Fractionalize Hooks - Compatible with Wagmi v2
 */

// Mock fractionalize hooks for deployment
export function useFractionalize() {
  return {
    startFractionalization: async () => {
      console.log('Fractionalization started');
    },
    step: 'approve' as 'approve' | 'fractionalize' | 'done',
    isLoading: false,
    isSuccess: false,
    error: null,
    txHash: undefined,
  };
}

export function useFractionalizedNFTData(fractionalId: number) {
  return {
    fractionalData: null,
    isLoading: false,
    error: null,
  };
}

export function useTokenBalance(tokenAddress: string, userAddress: string) {
  return {
    balance: 0n,
    isLoading: false,
    error: null,
  };
}

export function useTokenInfo(tokenAddress: string) {
  return {
    name: 'Token Name',
    symbol: 'TKN',
    totalSupply: 1000000n,
  };
}

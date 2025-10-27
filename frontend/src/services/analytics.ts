/**
 * Analytics Service
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

class AnalyticsService {
  private enabled: boolean;

  constructor() {
    this.enabled = import.meta.env.PROD;
  }

  track(event: AnalyticsEvent): void {
    if (!this.enabled) return;

    // Integration with analytics providers (Google Analytics, Mixpanel, etc.)
    console.log('Analytics Event:', event);
  }

  trackPageView(path: string): void {
    this.track({
      category: 'Navigation',
      action: 'Page View',
      label: path,
    });
  }

  trackNFTMint(tokenId: number): void {
    this.track({
      category: 'NFT',
      action: 'Mint',
      label: `Token ${tokenId}`,
    });
  }

  trackFractionalize(tokenId: number, supply: number): void {
    this.track({
      category: 'Fractionalization',
      action: 'Fractionalize',
      label: `Token ${tokenId}`,
      value: supply,
    });
  }

  trackRoyaltyClaim(amount: number): void {
    this.track({
      category: 'Royalty',
      action: 'Claim',
      value: amount,
    });
  }

  trackVote(proposalId: number, support: number): void {
    this.track({
      category: 'DAO',
      action: 'Vote',
      label: `Proposal ${proposalId}`,
      value: support,
    });
  }

  trackWalletConnect(address: string): void {
    this.track({
      category: 'Wallet',
      action: 'Connect',
      label: address.slice(0, 10),
    });
  }

  trackError(error: string, context?: string): void {
    this.track({
      category: 'Error',
      action: error,
      label: context,
    });
  }
}

export const analyticsService = new AnalyticsService();

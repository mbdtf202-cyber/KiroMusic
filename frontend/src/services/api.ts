/**
 * API Service for backend communication
 */

import { ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class APIService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Request failed',
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // NFT endpoints
  async getNFT(tokenId: number) {
    return this.get(`/nfts/${tokenId}`);
  }

  async getNFTs(page = 1, pageSize = 12) {
    return this.get<PaginatedResponse<any>>(`/nfts?page=${page}&pageSize=${pageSize}`);
  }

  async searchNFTs(query: string) {
    return this.get(`/nfts/search?q=${encodeURIComponent(query)}`);
  }

  // User endpoints
  async getUserProfile(address: string) {
    return this.get(`/users/${address}`);
  }

  async updateUserProfile(address: string, data: any) {
    return this.put(`/users/${address}`, data);
  }

  // Analytics endpoints
  async getPlatformStats() {
    return this.get('/analytics/platform');
  }

  async getTokenAnalytics(tokenAddress: string) {
    return this.get(`/analytics/token/${tokenAddress}`);
  }

  // Trending endpoints
  async getTrending() {
    return this.get('/trending');
  }
}

export const apiService = new APIService();

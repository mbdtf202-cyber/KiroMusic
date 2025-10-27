/**
 * IPFS Service for uploading and retrieving music files and metadata
 */

export interface MusicMetadata {
  name: string;
  artist: string;
  description: string;
  genre?: string;
  duration?: number;
  releaseDate?: string;
  coverImage?: string;
  audioFingerprint?: string;
}

export interface UploadResult {
  cid: string;
  url: string;
}

class IPFSService {
  private apiKey: string;
  private apiSecret: string;
  private gateway: string;

  constructor() {
    // Use environment variables or default to public gateway
    this.apiKey = import.meta.env.VITE_PINATA_API_KEY || '';
    this.apiSecret = import.meta.env.VITE_PINATA_SECRET_KEY || '';
    this.gateway = import.meta.env.VITE_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
  }

  /**
   * Upload audio file to IPFS
   */
  async uploadAudio(file: File): Promise<UploadResult> {
    try {
      if (!this.apiKey || !this.apiSecret) {
        // Fallback to mock for development
        return this.mockUpload(file);
      }

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload to IPFS');
      }

      const data = await response.json();
      return {
        cid: data.IpfsHash,
        url: `${this.gateway}${data.IpfsHash}`,
      };
    } catch (error) {
      console.error('IPFS upload error:', error);
      throw error;
    }
  }

  /**
   * Upload metadata to IPFS
   */
  async uploadMetadata(metadata: MusicMetadata): Promise<UploadResult> {
    try {
      if (!this.apiKey || !this.apiSecret) {
        return this.mockUpload(metadata);
      }

      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret,
        },
        body: JSON.stringify(metadata),
      });

      if (!response.ok) {
        throw new Error('Failed to upload metadata to IPFS');
      }

      const data = await response.json();
      return {
        cid: data.IpfsHash,
        url: `${this.gateway}${data.IpfsHash}`,
      };
    } catch (error) {
      console.error('Metadata upload error:', error);
      throw error;
    }
  }

  /**
   * Retrieve metadata from IPFS
   */
  async getMetadata(cid: string): Promise<MusicMetadata> {
    try {
      const response = await fetch(`${this.gateway}${cid}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch metadata from IPFS');
      }

      return await response.json();
    } catch (error) {
      console.error('Metadata fetch error:', error);
      throw error;
    }
  }

  /**
   * Generate audio fingerprint (simplified version)
   */
  async generateFingerprint(file: File): Promise<string> {
    try {
      // In production, use a proper audio fingerprinting library
      // For now, generate a hash based on file properties
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      console.error('Fingerprint generation error:', error);
      throw error;
    }
  }

  /**
   * Encrypt metadata (simplified version)
   */
  async encryptMetadata(metadata: MusicMetadata, key: string): Promise<string> {
    try {
      // In production, use proper encryption (e.g., Lit Protocol)
      const jsonStr = JSON.stringify(metadata);
      const encoder = new TextEncoder();
      const data = encoder.encode(jsonStr);
      
      // Simple XOR encryption for demo (NOT secure for production!)
      const keyData = encoder.encode(key);
      const encrypted = new Uint8Array(data.length);
      
      for (let i = 0; i < data.length; i++) {
        encrypted[i] = data[i] ^ keyData[i % keyData.length];
      }
      
      return btoa(String.fromCharCode(...encrypted));
    } catch (error) {
      console.error('Encryption error:', error);
      throw error;
    }
  }

  /**
   * Mock upload for development without IPFS credentials
   */
  private async mockUpload(data: File | MusicMetadata): Promise<UploadResult> {
    // Generate a fake CID
    const randomHash = Math.random().toString(36).substring(2, 15);
    const cid = `Qm${randomHash}${randomHash}`;
    
    return {
      cid,
      url: `${this.gateway}${cid}`,
    };
  }

  /**
   * Pin existing CID (keep it available)
   */
  async pinCID(cid: string): Promise<boolean> {
    try {
      if (!this.apiKey || !this.apiSecret) {
        return true; // Mock success
      }

      const response = await fetch('https://api.pinata.cloud/pinning/pinByHash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'pinata_api_key': this.apiKey,
          'pinata_secret_api_key': this.apiSecret,
        },
        body: JSON.stringify({ hashToPin: cid }),
      });

      return response.ok;
    } catch (error) {
      console.error('Pin error:', error);
      return false;
    }
  }
}

export const ipfsService = new IPFSService();

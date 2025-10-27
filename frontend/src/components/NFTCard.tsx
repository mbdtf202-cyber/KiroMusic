/**
 * NFT Card Component
 */

import { useState } from 'react';
import { Music, User, Clock } from 'lucide-react';
import { formatAddress, formatTimeAgo } from '../utils/format';

interface NFTCardProps {
  tokenId: number;
  name: string;
  artist: string;
  coverImage?: string;
  genre?: string;
  mintTimestamp: number;
  fractionalized: boolean;
  onClick?: () => void;
}

export function NFTCard({
  tokenId,
  name,
  artist,
  coverImage,
  genre,
  mintTimestamp,
  fractionalized,
  onClick,
}: NFTCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        {coverImage && !imageError ? (
          <img
            src={coverImage}
            alt={name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-16 h-16 text-white opacity-50" />
          </div>
        )}
        
        {/* Fractionalized Badge */}
        {fractionalized && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
            Fractionalized
          </div>
        )}

        {/* Genre Badge */}
        {genre && (
          <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
            {genre}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
          {name}
        </h3>
        
        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          <User className="w-4 h-4 mr-1" />
          <span className="truncate">{formatAddress(artist)}</span>
        </div>

        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          <span>{formatTimeAgo(mintTimestamp)}</span>
        </div>

        <div className="mt-3 text-xs text-gray-400">
          Token ID: #{tokenId}
        </div>
      </div>
    </div>
  );
}

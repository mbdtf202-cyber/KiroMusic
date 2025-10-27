import { useState } from 'react';
import { Music, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useMintNFT } from '../hooks/useNFT';
import { isValidAudioFile, isValidImageFile, isValidDescription } from '../utils/validation';
import { MUSIC_GENRES } from '../utils/constants';
import { formatFileSize } from '../utils/format';

export function MintNFTForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    genre: '',
    audioFile: null as File | null,
    coverImage: null as File | null,
    releaseDate: '',
    lyrics: '',
    credits: '',
    isrc: '',
    iswc: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { mint, isUploading, uploadProgress, isMinting, isSuccess, error } = useMintNFT();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'audio' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'audio') {
      if (!isValidAudioFile(file)) {
        setErrors({ ...errors, audioFile: 'Invalid audio file' });
        return;
      }
      setFormData({ ...formData, audioFile: file });
      setErrors({ ...errors, audioFile: '' });
    } else {
      if (!isValidImageFile(file)) {
        setErrors({ ...errors, coverImage: 'Invalid image file' });
        return;
      }
      setFormData({ ...formData, coverImage: file });
      setErrors({ ...errors, coverImage: '' });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!isValidDescription(formData.description)) newErrors.description = 'Description must be 10-1000 characters';
    if (!formData.audioFile) newErrors.audioFile = 'Audio file is required';
    if (!formData.genre) newErrors.genre = 'Genre is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const metadata = {
        name: formData.name,
        artist: '0x...', // Will be filled by contract
        description: formData.description,
        genre: formData.genre,
        releaseDate: formData.releaseDate,
        lyrics: formData.lyrics,
        credits: formData.credits.split(',').map(c => c.trim()),
        isrc: formData.isrc,
        iswc: formData.iswc,
      };

      const legalHash = '0x' + '0'.repeat(64); // Generate proper hash
      await mint(formData.audioFile!, metadata, legalHash);
    } catch (err) {
      console.error('Mint failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Track Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="My Awesome Track"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description *</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg h-24"
          placeholder="Describe your music..."
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Genre *</label>
        <select
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select genre</option>
          {MUSIC_GENRES.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        {errors.genre && <p className="text-red-500 text-sm mt-1">{errors.genre}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Audio File *</label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(e, 'audio')}
            className="hidden"
            id="audio-upload"
          />
          <label htmlFor="audio-upload" className="cursor-pointer">
            <Music className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            {formData.audioFile ? (
              <p className="text-sm">{formData.audioFile.name} ({formatFileSize(formData.audioFile.size)})</p>
            ) : (
              <p className="text-sm text-gray-500">Click to upload audio</p>
            )}
          </label>
        </div>
        {errors.audioFile && <p className="text-red-500 text-sm mt-1">{errors.audioFile}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Cover Image</label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'image')}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            {formData.coverImage ? (
              <p className="text-sm">{formData.coverImage.name}</p>
            ) : (
              <p className="text-sm text-gray-500">Click to upload cover</p>
            )}
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading || isMinting}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {(isUploading || isMinting) && <Loader2 className="w-5 h-5 animate-spin" />}
        {isUploading ? `Uploading... ${uploadProgress}%` : isMinting ? 'Minting...' : 'Mint NFT'}
      </button>

      {isSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          NFT minted successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error.message}
        </div>
      )}
    </form>
  );
}

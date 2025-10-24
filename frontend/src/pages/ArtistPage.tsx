import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Music, FileText, Sparkles, CheckCircle } from 'lucide-react';
import { useAccount } from 'wagmi';

export default function ArtistPage() {
  const { isConnected } = useAccount();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    trackName: '',
    artistName: '',
    file: null as File | null,
    metadata: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleMint = async () => {
    if (!isConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    // Mint logic here
    setStep(4);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gradient">Artist Portal</span>
          </h1>
          <p className="text-xl text-gray-400">
            Transform your music into on-chain copyright assets
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-12">
          {[
            { num: 1, label: 'Upload', icon: Upload },
            { num: 2, label: 'Metadata', icon: FileText },
            { num: 3, label: 'Mint NFT', icon: Music },
            { num: 4, label: 'Complete', icon: CheckCircle },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="flex flex-col items-center flex-1">
                <motion.div
                  animate={{
                    scale: step >= s.num ? 1.1 : 1,
                    backgroundColor: step >= s.num ? 'rgba(58, 134, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                  }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                    step >= s.num ? 'cyber-border' : 'border border-white/10'
                  }`}
                >
                  <Icon className={`w-8 h-8 ${step >= s.num ? 'text-cyber-blue' : 'text-gray-500'}`} />
                </motion.div>
                <span className={`text-sm ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Form */}
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-effect rounded-2xl p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Upload Your Track</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Track Name</label>
                <input
                  type="text"
                  value={formData.trackName}
                  onChange={(e) => setFormData({ ...formData, trackName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  placeholder="Enter track name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Artist Name</label>
                <input
                  type="text"
                  value={formData.artistName}
                  onChange={(e) => setFormData({ ...formData, artistName: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  placeholder="Enter artist name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Audio File</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-cyber-blue transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">
                      {formData.file ? formData.file.name : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">MP3, WAV, FLAC (max 100MB)</p>
                  </label>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.trackName || !formData.artistName || !formData.file}
                className="w-full py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Metadata
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Add Metadata</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.metadata}
                  onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-cyber-blue focus:outline-none text-white"
                  placeholder="Describe your track, genre, inspiration..."
                />
              </div>

              <div className="glass-effect rounded-lg p-4 border border-cyber-blue/30">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-cyber-blue mt-1" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">AI Fingerprinting Active</h3>
                    <p className="text-sm text-gray-400">
                      Your track will be analyzed for unique audio fingerprints and stored with encrypted metadata on IPFS.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 glass-effect rounded-lg font-semibold border border-white/10 hover:border-white/30 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow"
                >
                  Continue to Mint
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Mint Music NFT</h2>
              
              <div className="glass-effect rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Track Name:</span>
                  <span className="text-white font-semibold">{formData.trackName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Artist:</span>
                  <span className="text-white font-semibold">{formData.artistName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">File:</span>
                  <span className="text-white font-semibold">{formData.file?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Minting Fee:</span>
                  <span className="text-cyber-green font-semibold">0.01 ETH</span>
                </div>
              </div>

              <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  By minting, you confirm that you own the copyright to this music and agree to the platform terms.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 glass-effect rounded-lg font-semibold border border-white/10 hover:border-white/30 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleMint}
                  className="flex-1 py-4 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow"
                >
                  Mint NFT
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.6 }}
              >
                <CheckCircle className="w-24 h-24 mx-auto text-cyber-green" />
              </motion.div>
              <h2 className="text-3xl font-bold text-white">NFT Minted Successfully!</h2>
              <p className="text-gray-400">
                Your music is now on-chain. You can now fractionalize it into rMUSIC tokens.
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 glass-effect rounded-lg font-semibold border border-white/10 hover:border-white/30 transition-colors"
                >
                  Mint Another
                </button>
                <button className="px-6 py-3 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-lg font-semibold hover-glow">
                  Fractionalize Now
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

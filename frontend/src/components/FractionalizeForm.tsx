import { useState } from 'react';
import { Loader2, Coins } from 'lucide-react';
import { useFractionalize } from '../hooks/useFractionalize';
import { isValidTokenName, isValidTokenSymbol, isValidSupply } from '../utils/validation';
import { formatTokenAmount } from '../utils/format';

interface FractionalizeFormProps {
  tokenId: number;
  onSuccess?: () => void;
}

export function FractionalizeForm({ tokenId, onSuccess }: FractionalizeFormProps) {
  const [formData, setFormData] = useState({
    tokenName: '',
    tokenSymbol: '',
    totalSupply: '1000000',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { startFractionalization, step, isLoading, isSuccess, error } = useFractionalize();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isValidTokenName(formData.tokenName)) {
      newErrors.tokenName = 'Token name must be 3-50 characters';
    }
    if (!isValidTokenSymbol(formData.tokenSymbol)) {
      newErrors.tokenSymbol = 'Symbol must be 3-5 uppercase letters';
    }
    if (!isValidSupply(formData.totalSupply)) {
      newErrors.totalSupply = 'Supply must be between 1,000 and 1,000,000,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    startFractionalization();
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Coins className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Fractionalization Complete!</h3>
        <p className="text-gray-600 mb-4">
          Your NFT has been fractionalized into {formatTokenAmount(formData.totalSupply, 18, 0)} {formData.tokenSymbol} tokens
        </p>
        <button
          onClick={onSuccess}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        >
          View Token
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-blue-900 mb-2">Fractionalization Process</h4>
        <div className="flex items-center gap-4 text-sm">
          <div className={`flex items-center gap-2 ${step === 'approve' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'approve' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              1
            </div>
            Approve
          </div>
          <div className="flex-1 h-px bg-gray-300" />
          <div className={`flex items-center gap-2 ${step === 'fractionalize' ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step === 'fractionalize' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>
              2
            </div>
            Fractionalize
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Token Name *</label>
        <input
          type="text"
          value={formData.tokenName}
          onChange={(e) => setFormData({ ...formData, tokenName: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="My Music Royalty Token"
          disabled={isLoading}
        />
        {errors.tokenName && <p className="text-red-500 text-sm mt-1">{errors.tokenName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Token Symbol *</label>
        <input
          type="text"
          value={formData.tokenSymbol}
          onChange={(e) => setFormData({ ...formData, tokenSymbol: e.target.value.toUpperCase() })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="MUSIC"
          maxLength={5}
          disabled={isLoading}
        />
        {errors.tokenSymbol && <p className="text-red-500 text-sm mt-1">{errors.tokenSymbol}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Total Supply *</label>
        <input
          type="number"
          value={formData.totalSupply}
          onChange={(e) => setFormData({ ...formData, totalSupply: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          placeholder="1000000"
          disabled={isLoading}
        />
        <p className="text-sm text-gray-500 mt-1">
          Recommended: 1,000,000 tokens
        </p>
        {errors.totalSupply && <p className="text-red-500 text-sm mt-1">{errors.totalSupply}</p>}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Fractionalizing your NFT will transfer it to the Fractionalizer contract. 
          You will receive all {formData.totalSupply} tokens representing ownership.
        </p>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
        {step === 'approve' ? 'Approve NFT Transfer' : 'Fractionalize NFT'}
      </button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error.message}
        </div>
      )}
    </form>
  );
}

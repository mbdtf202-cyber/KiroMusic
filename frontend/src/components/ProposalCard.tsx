import { Vote, Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatTimeAgo, formatTokenAmount } from '../utils/format';

interface ProposalCardProps {
  id: number;
  title: string;
  description: string;
  proposer: string;
  forVotes: bigint;
  againstVotes: bigint;
  abstainVotes: bigint;
  state: number;
  endTime: number;
  onClick?: () => void;
}

const STATE_LABELS = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
const STATE_COLORS = ['gray', 'blue', 'red', 'red', 'green', 'yellow', 'gray', 'green'];

export function ProposalCard({
  id,
  title,
  description,
  forVotes,
  againstVotes,
  abstainVotes,
  state,
  endTime,
  onClick,
}: ProposalCardProps) {
  const totalVotes = forVotes + againstVotes + abstainVotes;
  const forPercentage = totalVotes > 0n ? Number((forVotes * 100n) / totalVotes) : 0;
  const againstPercentage = totalVotes > 0n ? Number((againstVotes * 100n) / totalVotes) : 0;

  const stateLabel = STATE_LABELS[state] || 'Unknown';
  const stateColor = STATE_COLORS[state] || 'gray';

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">#{id}</span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-${stateColor}-100 text-${stateColor}-800`}>
              {stateLabel}
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              For
            </span>
            <span className="font-semibold">{forPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{ width: `${forPercentage}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1 text-red-600">
              <XCircle className="w-4 h-4" />
              Against
            </span>
            <span className="font-semibold">{againstPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-600 h-2 rounded-full"
              style={{ width: `${againstPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700 text-sm">
        <div className="flex items-center gap-1 text-gray-500">
          <Vote className="w-4 h-4" />
          {formatTokenAmount(totalVotes, 18, 0)} votes
        </div>
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="w-4 h-4" />
          {formatTimeAgo(endTime)}
        </div>
      </div>
    </div>
  );
}

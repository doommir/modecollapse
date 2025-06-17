import { useState, useCallback } from 'react';
import { VoteStats } from '@/types';

interface UseVotingProps {
  initialVotes: VoteStats;
  toolSlug: string;
  userId?: string;
}

interface VoteResponse {
  success: boolean;
  votes: VoteStats;
  error?: string;
}

export function useVoting({ initialVotes, toolSlug, userId }: UseVotingProps) {
  const [votes, setVotes] = useState<VoteStats>(initialVotes);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitVote = useCallback(async (vote: 'up' | 'down') => {
    if (isVoting) return;
    
    setIsVoting(true);
    setError(null);

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolSlug,
          vote,
          userId
        })
      });

      const data: VoteResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit vote');
      }

      if (data.success && data.votes) {
        setVotes(data.votes);
      }

    } catch (err) {
      console.error('Voting error:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit vote');
      
      // Revert optimistic update if any
      // For now, we'll just refetch the current state
      try {
        const response = await fetch(`/api/vote?toolSlug=${toolSlug}&userId=${userId || ''}`);
        const data = await response.json();
        if (data.votes) {
          setVotes(data.votes);
        }
      } catch {
        // If refetch fails, keep current state
      }
    } finally {
      setIsVoting(false);
    }
  }, [toolSlug, userId, isVoting]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    votes,
    isVoting,
    error,
    submitVote,
    clearError,
    netVotes: votes.upvotes - votes.downvotes
  };
}
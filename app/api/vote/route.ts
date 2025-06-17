import { NextRequest, NextResponse } from 'next/server';

interface VoteRequest {
  toolSlug: string;
  vote: 'up' | 'down';
  userId?: string;
}

// In-memory vote storage (replace with database in production)
const voteStorage: Record<string, { upvotes: number; downvotes: number; userVotes: Record<string, 'up' | 'down'> }> = {};

export async function POST(request: NextRequest) {
  try {
    const body: VoteRequest = await request.json();
    const { toolSlug, vote, userId } = body;

    if (!toolSlug || !vote) {
      return NextResponse.json(
        { error: 'Missing required fields: toolSlug and vote' },
        { status: 400 }
      );
    }

    if (!['up', 'down'].includes(vote)) {
      return NextResponse.json(
        { error: 'Vote must be "up" or "down"' },
        { status: 400 }
      );
    }

    // Get client identifier (IP or user ID)
    const clientId = userId || request.headers.get('x-forwarded-for') || 'anonymous';

    // Initialize tool votes if not exists
    if (!voteStorage[toolSlug]) {
      voteStorage[toolSlug] = {
        upvotes: 0,
        downvotes: 0,
        userVotes: {}
      };
    }

    const toolVotes = voteStorage[toolSlug];
    const previousVote = toolVotes.userVotes[clientId];

    // Remove previous vote if exists
    if (previousVote === 'up') {
      toolVotes.upvotes = Math.max(0, toolVotes.upvotes - 1);
    } else if (previousVote === 'down') {
      toolVotes.downvotes = Math.max(0, toolVotes.downvotes - 1);
    }

    // Add new vote (or toggle off if same vote)
    if (previousVote === vote) {
      // Toggle off - remove vote
      delete toolVotes.userVotes[clientId];
    } else {
      // Add new vote
      if (vote === 'up') {
        toolVotes.upvotes += 1;
      } else {
        toolVotes.downvotes += 1;
      }
      toolVotes.userVotes[clientId] = vote;
    }

    // Return updated vote counts
    return NextResponse.json({
      success: true,
      votes: {
        upvotes: toolVotes.upvotes,
        downvotes: toolVotes.downvotes,
        userVote: toolVotes.userVotes[clientId] || null,
        netVotes: toolVotes.upvotes - toolVotes.downvotes
      }
    });

  } catch (error) {
    console.error('Vote API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const toolSlug = searchParams.get('toolSlug');
    const userId = searchParams.get('userId');

    if (!toolSlug) {
      return NextResponse.json(
        { error: 'Missing toolSlug parameter' },
        { status: 400 }
      );
    }

    const clientId = userId || request.headers.get('x-forwarded-for') || 'anonymous';
    const toolVotes = voteStorage[toolSlug] || {
      upvotes: 0,
      downvotes: 0,
      userVotes: {}
    };

    return NextResponse.json({
      votes: {
        upvotes: toolVotes.upvotes,
        downvotes: toolVotes.downvotes,
        userVote: toolVotes.userVotes[clientId] || null,
        netVotes: toolVotes.upvotes - toolVotes.downvotes
      }
    });

  } catch (error) {
    console.error('Vote GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
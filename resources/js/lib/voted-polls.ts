const STORAGE_KEY = 'voted_poll_ids';

export function getVotedPollIds(): number[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);

        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function markPollAsVoted(pollId: number): void {
    const ids = getVotedPollIds();
    
    if (!ids.includes(pollId)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, pollId]));
    }
}
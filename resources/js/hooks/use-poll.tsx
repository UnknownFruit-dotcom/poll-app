import { useEffect, useState } from "react";
import { show } from '@/actions/App/Http/Controllers/Api/PollsController';

export type Option = {
    id: number;
    content: string;
};

export type PollDetail = {
    id: number;
    name: string;
    theme_text: string;
    theme_id: number;
    status: string;
    options: Option[];
};

export function usePoll(pollId: number | null) {
    const [poll, setPoll] = useState<PollDetail | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (pollId === null) {
            setPoll(null);
            return;
        }

        let isMounted = true;
        setIsLoading(true);
        setError(null);

        fetch(show(pollId).url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }

                return response.json();
            })
            .then((data: PollDetail) => {
                if (isMounted) {
                    setPoll(data);
                }
            })
            .catch((err: Error) => {
                if (isMounted) {
                    setError(err.message);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [pollId]);

    return { poll, isLoading, error };
}
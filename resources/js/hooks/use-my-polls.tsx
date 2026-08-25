import { useCallback, useEffect, useState } from "react";
import {showMy } from '@/actions/App/Http/Controllers/Api/PollsController'
import type { Poll } from './use-polls';

export function useMyPolls(){
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPolls = useCallback(() => {
        setIsLoading(true);
        setError(null);

        return fetch(showMy().url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                return response.json();
            })
            .then((data: Poll[]) => {
                setPolls(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetchPolls();
    }, [fetchPolls])

    return {polls, isLoading, error, refetch: fetchPolls};
}


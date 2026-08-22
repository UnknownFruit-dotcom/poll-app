import { useEffect, useState } from "react";
import {showMy } from '@/actions/App/Http/Controllers/Api/PollsController'
import type { Poll } from './use-polls';

export function useMyPolls(){
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetch(showMy().url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }
                
                return response.json();
            })
            .then((data: Poll[])=>{
                if (isMounted) {
                    setPolls(data);
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

            return()=> {
                isMounted = false;
            }
    }, []);

    return {polls, isLoading, error};
}


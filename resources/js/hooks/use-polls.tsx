import { useEffect, useState } from "react";
import {index} from '@/actions/App/Http/Controllers/Api/PollsController'

export type Poll = {
    id: number,
    name: string,
    theme_text: string,
    theme_id: number,
    status: string,
    published_at: string,
    created_at: string,
    updated_at: string
}

export function usePolls(themeId: number | null){
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(true);
        
        const url = themeId ? index({query: {theme_id: themeId}}).url : index().url;

        fetch(url)
        .then((response) => {
            if(!response.ok){
                throw new Error(`${response.status}`);
            }

            return response.json();
        })
        .then((data: Poll[]) => {
             if(isMounted) {
                setPolls(data);
            }
        })
        .catch((err: Error) => {
            if(isMounted){
                setError(err.message);
            }
        })
        .finally(()=>{
            if(isMounted){
                setIsLoading(false);
            }
        })

        return () => {
            isMounted = false;
        }

    }, [themeId]);

    return {polls, isLoading, error};
}
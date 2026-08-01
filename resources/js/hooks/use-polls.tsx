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

export function usePolls(){
    const [polls, setPolls] = useState<Poll[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        
        fetch(index().url)
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

    }, []);

    return {polls, isLoading, error};
}
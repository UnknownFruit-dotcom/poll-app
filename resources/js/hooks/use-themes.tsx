import { useEffect, useState } from "react";
import {index} from '@/actions/App/Http/Controllers/Api/ThemesController';

export type Theme = {
    id: number,
    name: string,
    active: boolean,
    create_at: string,
    update_at: string
}

export function useThemes(){
    const [themes, setThemes] = useState<Theme[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        fetch(index().url)
        .then((response) => {
            if(!response.ok){
                throw new Error('${response.status}`');
            }
            
            return response.json();
        })
        .then((data: Theme[]) => {
            if(isMounted) {
                setThemes(data);
            }
        })
        .catch((err: Error) => {
            if(isMounted){
                setError(err.message);
            }
        })
        .finally(() =>{
            if(isMounted){
                setIsLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    return {themes, isLoading, error}
}
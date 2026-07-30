import { useThemes } from '@/hooks/use-themes';
import './css/home.css';

export default function Home() {

    const {themes, isLoading, error} = useThemes();
    
    return (
        <main style={{ minHeight: "100vh", background: "#ffffff" }}>
            <h1 style={{ margin: 0 }}>Home</h1>

            {isLoading && <p>Loading themes...</p>}
            {error && <p>Error loading: {error}</p>}

            {!isLoading && !error && (
                <ul className='theme_list'>
                    {themes.map((theme) => (
                        <li className="theme_item" key={theme.id}>
                            {theme.name}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
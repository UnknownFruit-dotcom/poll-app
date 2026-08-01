import { usePolls } from '@/hooks/use-polls';
import { useThemes } from '@/hooks/use-themes';

import './css/home.css';

export default function Home() {

    const {polls, isLoading: isLoadingPolls, error: pollsError} = usePolls();
    const {themes, isLoading: isLoadingThemes, error: themesError} = useThemes();
    
    return (
        <main style={{ minHeight: "100vh", background: "#ffffff" }}>
            <h2>Themes</h2>

            {isLoadingThemes && <p>Loading themes...</p>}
            {themesError && <p>Error loading themes: {themesError}</p>}

            <section>
                {!isLoadingThemes && !themesError && (
                <ul className='theme_list'>
                    {themes.map((theme) => (
                        <li className="theme_item" key={theme.id}>
                            {theme.name}
                        </li>
                    ))}
                </ul>
            )}
            </section>
            
            <section>
            <h2>Polls</h2>
            {isLoadingPolls && <p>Loading polls...</p>}
            {pollsError && <p>Error loading polls: {pollsError}</p>}

            {!isLoadingPolls && !pollsError && (
                <ul className='polls_list'>
                    {polls.map((poll) => (
                        <li className="polls_item" key={poll.id}>
                            <h3 className="polls_item_title">{poll.name}</h3>
                            <p className="polls_item_theme">{poll.theme_text}</p>
                            <span className='polls_item_status'>
                                {poll.status === 'published' ? 'Publishes' : 'Unpublished'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            </section>
            
        </main>
    );
}
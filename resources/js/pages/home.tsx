import { useState } from 'react';
import { usePolls } from '@/hooks/use-polls';
import { useThemes } from '@/hooks/use-themes';

import './css/home.css';

export default function Home() {

    const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null)

    const {polls, isLoading: isLoadingPolls, error: pollsError} = usePolls(selectedThemeId);
    const {themes, isLoading: isLoadingThemes, error: themesError} = useThemes();
    
    function handleThemeClick(themeId: number){
        setSelectedThemeId((current) => (current === themeId? null: themeId));
    }

    return (
        <main className="home_page">
            <section>
            <h2 className='section_title'>Themes</h2>

            {isLoadingThemes && <p>Loading themes...</p>}
            {themesError && <p>Error loading themes: {themesError}</p>}
            
                {!isLoadingThemes && !themesError && (
                <ul className='theme_list'>
                    {themes.map((theme) => (
                        <li
                            key={theme.id}
                            className={`theme_item ${selectedThemeId === theme.id ? 'theme_item--active' : ''}`}
                            onClick={() => handleThemeClick(theme.id)}>
                                {theme.name}
                            </li>
                    ))}
                </ul>
            )}
            </section>
            
            <section>
            <h2 className="section_title">Polls</h2>
            {isLoadingPolls && <p>Loading polls...</p>}
            {pollsError && <p>Error loading polls: {pollsError}</p>}

            {!isLoadingPolls && !pollsError && (
                <ul className='polls_list'>
                    {polls.map((poll) => (
                        <li className="polls_item" key={poll.id}>
                            <h3 className="polls_item_title">{poll.name}</h3>
                            <p className="polls_item_theme">{poll.theme_text}</p>
                            <span className={`badge ${poll.status === 'published' ? 'badge--published' : 'badge--unpublished'}`}>
                                {poll.status === 'published' ? 'Published' : 'Unpublished'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
            </section>
            
        </main>
    );
}
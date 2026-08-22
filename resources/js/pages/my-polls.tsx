import './css/my-polls.css';
import { useMyPolls } from '@/hooks/use-my-polls';

export default function MyPolls() {

    const { polls, isLoading, error} = useMyPolls();

    return (
        <main className="page">
            <h2 className="section_title">My polls</h2>

            {isLoading && <p>Loading my polls...</p>}
            {error && <p>Error loading polls: {error}</p>}

            {!isLoading && !error && (
                <ul>
                    {polls.map((poll) => (
                        <li key={poll.id}>
                            {poll.name} — {poll.theme_text} — {poll.status}
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
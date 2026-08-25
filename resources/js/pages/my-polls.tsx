import { useState } from 'react';
import './css/my-polls.css';
import './css/home.css';
import MyPollModal from '@/components/my-poll-modal';
import { useMyPolls } from '@/hooks/use-my-polls';


export default function MyPolls() {

    const { polls, isLoading, error, refetch} = useMyPolls();
    const[openPollId, setOpenPollId] =  useState<number | null>(null);;


    return (
        <main className="page">
            <section>
                <h2 className="section_title">My polls</h2>

                {isLoading && <p>Loading my polls...</p>}
                {error && <p>Error loading polls: {error}</p>}

                {!isLoading && !error && polls.length === 0 && (
                    <div className="empty_state">
                        You haven't created any polls yet.
                    </div>
                )}

                {!isLoading && !error && (
                    <ul className="polls_list">
                        {polls.map((poll) => (
                            <li 
                            className="polls_item" 
                            key={poll.id}
                            onClick={() => setOpenPollId(poll.id)}
                            >
                                <h3 className="polls_item_title">{poll.name}</h3>
                                <p className="polls_item_theme">{poll.theme_text}</p>
                                <span className={`badge ${poll.status === 'published' ? 'badge--published' : 'badge--unpublished'}`}>
                                    {poll.status === 'published' ? 'Published' : 'Draft'}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <MyPollModal 
            pollId={openPollId} 
            onClose={() => setOpenPollId(null)} 
            onSaved = {refetch}/>
        </main>
    );
}
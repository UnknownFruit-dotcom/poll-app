// resources/js/components/poll-modal.tsx
import { useState } from 'react';
import Modal from './modal';
import { usePoll } from '@/hooks/use-poll';
import { chooseOption } from '@/actions/App/Http/Controllers/Api/PollsController';
import { csrfHeaders } from '@/lib/csrf';
import { markPollAsVoted } from '@/lib/voted-polls';
import './css/poll-modal.css';

type PollModalProps = {
    pollId: number | null;
    onClose: () => void;
    hasVoted: boolean;
};

export default function PollModal({ pollId, onClose, hasVoted }: PollModalProps) {
    const { poll, isLoading, error } = usePoll(pollId);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    function handleClose() {
        setSelectedOptionId(null);
        setIsSubmitted(false);
        setSubmitError(null);
        onClose();
    }

    function handleSubmit() {
    if (!poll || selectedOptionId === null) {
        return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    fetch(chooseOption(poll.id).url, {
        method: 'POST',
        headers: csrfHeaders(),
        body: JSON.stringify({ option_id: selectedOptionId }),
    })
        .then(async (response) => {
            if (response.status === 422) {
                const data = await response.json();
                
                throw new Error(data.message ?? 'You have already voted in this poll.');
            }

            if (response.status === 429) {
                throw new Error('Too many attempts. Please wait a moment and try again.');
            }

            if (!response.ok) {
                throw new Error(`Something went wrong (${response.status}). Please try again.`);
            }

            setIsSubmitted(true);
            markPollAsVoted(poll.id);
        })
        .catch((err: Error) => {
            setSubmitError(err.message);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
}

    const alreadyVoted = hasVoted || isSubmitted;

    return (
        <Modal isOpen={pollId !== null} onClose={handleClose}>
            {isLoading && <p className="poll_modal_status">Loading poll...</p>}
            {error && <p className="poll_modal_error">Error loading poll: {error}</p>}

            {alreadyVoted && (
                <div className="poll_modal_success">
                    <span className="poll_modal_success_icon">✓</span>
                    <p className="poll_modal_success_text">You've already voted in this poll.</p>
                </div>
            )}

            {!isLoading && !error && !alreadyVoted && poll && (
                <>
                    <h2 className="poll_modal_title">{poll.name}</h2>

                    <div className="poll_modal_options">
                        {poll.options.map((option) => (
                            <label
                                key={option.id}
                                className={`poll_modal_option ${selectedOptionId === option.id ? 'poll_modal_option--selected' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="poll_option"
                                    value={option.id}
                                    checked={selectedOptionId === option.id}
                                    onChange={() => setSelectedOptionId(option.id)}
                                />
                                {option.content}
                            </label>
                        ))}
                    </div>

                    {submitError && <p className="poll_modal_error">Error: {submitError}</p>}

                    <button
                        className="poll_modal_submit"
                        onClick={handleSubmit}
                        disabled={selectedOptionId === null || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </>
            )}
        </Modal>
    );
}
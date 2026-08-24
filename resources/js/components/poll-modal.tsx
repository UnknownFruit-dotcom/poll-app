import { useState } from 'react';
import { chooseOption } from '@/actions/App/Http/Controllers/Api/PollsController';
import { usePoll } from '@/hooks/use-poll';
import Modal from './modal';

type PollModalProps = {
    pollId: number | null;
    onClose: () => void;
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    
    return match ? decodeURIComponent(match[2]) : null;
}

export default function PollModal({pollId, onClose}: PollModalProps){
    const { poll, isLoading, error } = usePoll(pollId);
    const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    function handleClose(){
        setSelectedOptionId(null);
        setIsSubmitted(false);
        setSubmitError(null);
        onClose();
    }

    function handleSubmit(){
        if(!poll || selectedOptionId === null){
            return;
        }

        setIsSubmitted(true);
        setSubmitError(null);

        fetch(chooseOption(poll.id).url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
            },
            body: JSON.stringify({ option_id: selectedOptionId }),
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error(`${response.status}`);
                }

                setIsSubmitted(true);
            })
            .catch((err: Error) => {
                setSubmitError(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

     return (
        <Modal isOpen={pollId !== null} onClose={handleClose}>
            {isLoading && <p>Loading poll...</p>}
            {error && <p>Error loading poll: {error}</p>}

            {isSubmitted && <p>Your vote has been submitted!</p>}

            {!isLoading && !error && !isSubmitted && poll && (
                <>
                    <h2>{poll.name}</h2>

                    <div className="poll_modal_options">
                        {poll.options.map((option) => (
                            <label key={option.id} className="poll_modal_option">
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

                    {submitError && <p>Error: {submitError}</p>}

                    <button
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
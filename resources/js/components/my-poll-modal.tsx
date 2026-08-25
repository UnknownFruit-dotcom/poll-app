import { useEffect, useState } from 'react';
import { update, changeStatus } from '@/actions/App/Http/Controllers/Api/PollsController';
import { usePoll } from '@/hooks/use-poll';
import { useThemes } from '@/hooks/use-themes';
import Modal from './modal';

import { csrfHeaders } from '@/lib/csrf';
import './css/my-poll-modal.css';

type MyPollModalProps = {
    pollId: number | null;
    onClose: () => void;
    onSaved: () => void;
};

type Section = 'stats' | 'edit';

export default function MyPollModal({ pollId, onClose, onSaved }: MyPollModalProps) {
    const { poll, isLoading, error } = usePoll(pollId);
    const { themes } = useThemes();

    const [section, setSection] = useState<Section>('stats');

    const [name, setName] = useState('');
    const [themeId, setThemeId] = useState<number | null>(null);
    const [status, setStatus] = useState('draft');

    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    useEffect(() => {
        if (poll) {
            setName(poll.name);
            setThemeId(poll.theme_id);
            setStatus(poll.status);
        }
    }, [poll]);

    function handleClose() {
        setSection('stats');
        setSaveError(null);
        setSaveSuccess(false);
        onClose();
    }

    function handleSave() {
        if (!poll){
            return;
        }
            
        setIsSaving(true);
        setSaveError(null);
        setSaveSuccess(false);

        Promise.all([
            fetch(update(poll.id).url, {
                method: 'PATCH',
                headers: csrfHeaders(),
                body: JSON.stringify({ name, theme_id: themeId }),
            }),
            fetch(changeStatus(poll.id).url, {
                method: 'PATCH',
                headers: csrfHeaders(),
                body: JSON.stringify({ status }),
            }),
        ])
            .then(([updateRes, statusRes]) => {
                if (!updateRes.ok || !statusRes.ok) {
                    throw new Error('Failed to save changes');
                }

                setSaveSuccess(true);
                onSaved();
            })
            .catch((err: Error) => {
                setSaveError(err.message);
            })
            .finally(() => {
                setIsSaving(false);
            });
    }

    return (
        <Modal isOpen={pollId !== null} onClose={handleClose}>
            {isLoading && <p>Loading poll...</p>}
            {error && <p>Error loading poll: {error}</p>}

            {!isLoading && !error && poll && (
                <>
                    <div className="my_poll_modal_tabs">
                        <button
                            className={`my_poll_modal_tab ${section === 'stats' ? 'my_poll_modal_tab--active' : ''}`}
                            onClick={() => setSection('stats')}
                        >
                        Stats
                        </button>

                        <button
                            className={`my_poll_modal_tab ${section === 'edit' ? 'my_poll_modal_tab--active' : ''}`}
                            onClick={() => setSection('edit')}
                        >
                        Edit
                        </button>

                    </div>

                    {section === 'stats' && (
                        <div className="my_poll_modal_section">
                            <p>Stats coming soon.</p>
                        </div>

                    )}

                    {section === 'edit' && (
                        <div className="my_poll_modal_section">
                            <label className="my_poll_modal_label">
                                Name
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="my_poll_modal_input"
                                />
                            </label>

                            <label className="my_poll_modal_label">
                                Theme
                                <select
                                    value={themeId ?? ''}
                                    onChange={(e) => setThemeId(Number(e.target.value))}
                                    className="my_poll_modal_input"
                                >
                                    {themes.map((theme) => (
                                        <option key={theme.id} value={theme.id}>
                                            {theme.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="my_poll_modal_label">
                                Status
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="my_poll_modal_input"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </label>

                            {saveError && <p className="my_poll_modal_error">{saveError}</p>}
                            {saveSuccess && <p className="my_poll_modal_success">Saved!</p>}

                            <button
                                className="my_poll_modal_save"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    )}
                </>
            )}
        </Modal>
    );
}
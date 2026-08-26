import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { store } from '@/actions/App/Http/Controllers/Api/PollsController';
import { useThemes } from '@/hooks/use-themes';

import { csrfHeaders } from '@/lib/csrf';
import './css/create-poll.css';

type PageProps = {
    auth: { user: {id: number} | null};
};

type Props = {
    onCreated: () => void;
};

export default function CreatePollForm({ onCreated }: Props) {
    const {auth} = usePage<PageProps>().props;
    const {themes} = useThemes();

    const [name, setName] = useState('');
    const [themeId, setThemeId] = useState<number | null>(null);
    const [options, setOptions] = useState(['', '']);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function updateOption(index: number, value: string) {
        setOptions((prev) => prev.map((opt, i) => (i === index ? value : opt)));
    }

    function addOption(){
        setOptions((prev) => [...prev, '']);
    }

    function removeOption(index: number){
        setOptions((prev) => prev.filter((_, i) => i !== index));
    }

    function hadleSubmit(){
        if(!auth.user){
            return;
        }

        setIsSubmitting(true);
        setError(null);

        fetch(store().url, {
            method: 'POST',
            headers: csrfHeaders(),
            body: JSON.stringify({
                name,
                theme_id: themeId,
                user_id: auth.user.id,
                options: options.filter((opt) => opt.trim() !== ''),
            }),
        })
           .then((response) => {
                if (!response.ok) {
                    throw new Error(`${response.status}`);
                }

                setName('');
                setThemeId(null);
                setOptions(['', '']);
                onCreated();
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    return (
        <div className="create_poll_form">
            <input
                type="text"
                placeholder="Poll name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="create_poll_input"
            />

            <select
                value={themeId ?? ''}
                onChange={(e) => setThemeId(Number(e.target.value))}
                className="create_poll_input"
            >
                <option value="">Select theme</option>
                {themes.map((theme) => (
                    <option key={theme.id} value={theme.id}>
                        {theme.name}
                    </option>
                ))}
            </select>

            {options.map((option, index) => (
                <div key={index} className="create_poll_option_row">
                    <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="create_poll_input"
                    />
                    {options.length > 2 && (
                        <button type="button" onClick={() => removeOption(index)} className="create_poll_remove">
                            ×
                        </button>
                    )}
                </div>
            ))}

            <button type="button" onClick={addOption} className="create_poll_add">
                + Add option
            </button>

            {error && <p className="create_poll_error">Error: {error}</p>}

            <button
                type="button"
                onClick={hadleSubmit}
                disabled={isSubmitting || !name || !themeId}
                className="create_poll_submit"
            >
                {isSubmitting ? 'Creating...' : 'Create poll'}
            </button>
        </div>
    );

}
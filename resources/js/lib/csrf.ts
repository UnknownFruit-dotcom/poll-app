export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));

    return match ? decodeURIComponent(match[2]) : null;
}

export function csrfHeaders(): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
    };
}
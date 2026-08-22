import {Link, usePage} from '@inertiajs/react';
import './css/my_navbar.css';
import gear from './img/gear.png';
import sun from './img/sun.png';

type AuthUser = {
    id: number;
    name: string;
    email: string;
}

type PageProps = {
     auth: {
        user: AuthUser | null;
    };
}

export default function Navbar() {
    const { auth } = usePage<PageProps>().props;

    return(
        <header className="navbar">
            <nav className="navbar_nav">
                {auth.user ? (
                    <>
                        <span className="navbar_greeting">Hi, {auth.user.name}</span>

                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="navbar_link navbar_logout_link"
                        >
                            Log out
                        </Link>

                        <Link href="/settings" className="navbar_link">
                            <img src={gear} alt="Settings" className="navbar_settings_img" />
                        </Link>
                    </>
                ) : (
                    <Link href="/login" className="navbar_link navbar_login_link">
                        Log in
                    </Link>
                )}

                <Link href="/" className="navbar_link">
                    <img src={sun} alt="Theme" className="navbar_theme_img" />
                </Link>
            </nav>
        </header>
    );
}
import './css/my_navbar.css';

export default function Navbar() {
    return(
        <header className='navbar'>
            <nav className="navbar_nav">
                <a href="/" className="navbar_link">Profile</a>
                <a href="/" className="navbar_link">Settings</a>
                <a href="/" className="navbar_link">Theme</a>
            </nav>
        </header>
    );
}
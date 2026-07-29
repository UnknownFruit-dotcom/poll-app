import './css/my_navbar.css';
import gear from './img/gear.png';
import profile from './img/profile.png';
import sun from './img/sun.png';

export default function Navbar() {
    return(
        <header className='navbar'>
            <nav className="navbar_nav">
                <a href="/" className="navbar_link">
                <img src={profile} alt='Profile' className='navbar_profile_img'/>
                </a>
                <a href="/" className="navbar_link">
                <img src={gear} alt='Settings' className='navbar_settings_img'/>
                </a>
                <a href="/" className='navbar_link'>
                <img src={sun} alt='Theme' className='navbar_theme_img'/>
                </a>
            </nav>
        </header>
    );
}
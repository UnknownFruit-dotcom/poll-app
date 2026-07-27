import './css/my_sidebar.css';
import logo from './img/logo.png';

export default function Sidebar() {
    return(
        <aside className="sidebar">
            <div className="sidebar_logo">
    <img src={logo} alt="PollApp" className="sidebar_logo_img" />
</div>

            <nav className="sidebar_nav">
                <a href="/" className="sidebar_link">Home</a>
                <a href="/" className="sidebar_link">My polls</a>
                <a href="/" className="sidebar_link">Top polls</a>
                </nav>
        </aside>
    );
}
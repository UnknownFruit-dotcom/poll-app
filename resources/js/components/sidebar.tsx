import { useState } from 'react';
import './css/my_sidebar.css';
import home from './img/home.png';
import logo from './img/logo.png';
import my_poll from './img/my_poll.png';
import poll from './img/poll.png'

export default function Sidebar() {

    const[isExpanded, setIsExpanded] = useState(false);
    
    return(
        <aside 
        className={`sidebar ${isExpanded ? 'sidebar_expanded' : 'sidebar_collapsed'}`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div className="sidebar_logo">
                <img src={logo} alt="PollApp" className="sidebar_logo_img" />
                <span className="sidebar_logo_text">PollApp</span>
            </div>

            <nav className="sidebar_nav">
                <a href="/" className="sidebar_link">
                    <img src={home} alt="Home" className="sidebar_home_img" />
                    <span className="sidebar_link_text">Home</span>
                </a>
                <a href="/" className="sidebar_link">
                <img src={my_poll} alt="My polls" className="sidebar_my_poll_img" />
                    <span className="sidebar_link_text">My polls</span>
                </a>
                <a href="/" className="sidebar_link">
                    <img src={poll} alt="Top polls" className="sidebar_poll_img" />
                    <span className="sidebar_link_text">Top polls</span>
                </a>
                </nav>
        </aside>
    );
}
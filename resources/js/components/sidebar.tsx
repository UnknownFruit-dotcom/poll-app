import './css/my_sidebar.css';

export default function Sidebar() {
    return(
        <aside className="sidebar">
            <div className="sidevar_logo">PollApp</div>

            <nav className="sidebar_nav">
                <a href="/" className="sidebar_link">Home</a>
                <a href="/" className="sidebar_link">My polls</a>
                <a href="/" className="sidebar_link">Top polls</a>
                </nav>
        </aside>
    );
}
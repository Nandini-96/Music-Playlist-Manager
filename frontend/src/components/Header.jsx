const Header = ({
  playlistCount,
  onMenuClick,
  onCreateClick,
}) =>
{ return (
    <header className="header">
      <div className="header-left">
        <button
          type="button"
          className="icon-btn menu-btn"
          onClick={onMenuClick}
          aria-label="Open playlists menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="brand">
          <span className="brand-icon" aria-hidden="true">
            ♫
          </span>
          <div>
            <h1>Music Playlist Manager</h1>
            <p>Organize your favorite tracks</p>
          </div>
        </div>
      </div>
      <button type="button" className="btn btn-primary" onClick={onCreateClick}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        New Playlist
      </button>
    </header>
  );
}

export default Header;

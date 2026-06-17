const SongList = ({ songs, onRemove }) => {
  if (songs.length === 0) {
    return (
      <div className="empty-songs card">
        <span className="empty-icon" aria-hidden="true">🎵</span>
        <p>No songs in this playlist yet.</p>
        <p className="empty-hint">Click "Add Song" to get started.</p>
      </div>
    );
  }

  return (
    <div className="song-list card">
      <div className="song-list-header">
        <span>#</span>
        <span>Title</span>
        <span>Artist</span>
        <span>Duration</span>
        <span aria-hidden="true" />
      </div>
      {songs.map((song, index) => (
        <div key={song.id} className="song-row">
          <span className="song-index">{index + 1}</span>
          <span className="song-title">{song.title}</span>
          <span className="song-artist">{song.artist}</span>
          <span className="song-duration">{song.duration || '—'}</span>
          <button
            type="button"
            className="icon-btn remove-btn"
            onClick={() => onRemove(song.id)}
            aria-label={`Remove ${song.title}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongList;

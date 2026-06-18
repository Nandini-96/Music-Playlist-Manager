import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const PlaylistSidebar = ({
  playlists,
  selectedId,
  loading,
  isOpen,
  onSelect,
  onCreate,
  onDelete,
  onClose,
}) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleDelete = async (e, id, name) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${name}" and all its songs?`)) {
      try {
        setError("");
        await onDelete(id);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
       {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      <div className="sidebar-header">
        <h2>Your Playlists</h2>
        <button
          type="button"
          className="icon-btn close-btn"
          onClick={onClose}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>

      <button type="button" className="btn btn-secondary sidebar-create" onClick={onCreate}>
        + Create Playlist
      </button>

      <div className="playlist-list">
        {loading ? (
          <p className="sidebar-empty">Loading...</p>
        ) : playlists.length === 0 ? (
          <p className="sidebar-empty">No playlists yet. Create one to get started!</p>
        ) : (
          playlists.map((playlist) => (
            <div
              key={playlist.id}
              className={`playlist-item ${selectedId === playlist.id ? 'active' : ''}`}
              role="button"
              tabIndex={0}
              onClick={() => {
  onSelect(playlist.id);
  navigate(`/playlist/${playlist.id}`);
}}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(playlist.id);
navigate(`/playlist/${playlist.id}`);
                }
              }}
            >
              <div className="playlist-item-info">
                <span className="playlist-item-name">{playlist.name}</span>
                <span className="playlist-item-meta">
                  {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                type="button"
                className="icon-btn delete-btn"
                onClick={(e) => handleDelete(e, playlist.id, playlist.name)}
                aria-label={`Delete ${playlist.name}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}

export default PlaylistSidebar;

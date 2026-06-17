import React from "react";

const EmptyState = ({ onCreateClick }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🎵</div>

      <h2>No Playlists Found</h2>

      <p>
        Create your first playlist and start organizing
        your favorite songs.
      </p>

      <button
        className="btn btn-primary"
        onClick={onCreateClick}
      >
        Create Playlist
      </button>
    </div>
  );
};

export default EmptyState;
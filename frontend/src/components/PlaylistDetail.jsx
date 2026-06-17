import { useState } from 'react';
import AddSongForm from './AddSongForm';
import SongList from './SongList';

const PlaylistDetail = ({
  playlist,
  onAddSong,
  onRemoveSong,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("")
  const handleAddSong = async (payload) => {
    setSubmitting(true);
    try {
      await onAddSong(payload);
      setShowAddForm(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemoveSong = async (songId) => {
    try {
      await onRemoveSong(songId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="playlist-detail">
       {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      <div className="playlist-hero">
        <div className="playlist-cover" aria-hidden="true">
          ♫
        </div>
        <div className="playlist-hero-info">
          <span className="playlist-type">Playlist</span>
          <h2>{playlist.name}</h2>
          {playlist.description && <p className="playlist-description">{playlist.description}</p>}
          <p className="playlist-stats">
            {playlist.songs.length} song{playlist.songs.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="playlist-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowAddForm((v) => !v)}
        >
          {showAddForm ? 'Cancel' : '+ Add Song'}
        </button>
      </div>

      {showAddForm && (
        <AddSongForm onSubmit={handleAddSong} submitting={submitting} />
      )}

      <SongList songs={playlist.songs} onRemove={handleRemoveSong} />
    </div>
  );
}

export default PlaylistDetail;

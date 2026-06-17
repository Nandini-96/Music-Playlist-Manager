import { useCallback, useEffect, useState } from 'react';
import { api } from './api/playlistApi';
import Header from './components/Header';
import PlaylistSidebar from './components/PlaylistSidebar';
import PlaylistDetail from './components/PlaylistDetail';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
  const [playlists, setPlaylists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedPlaylist = playlists.find((p) => p.id === selectedId) || null;

  const loadPlaylists = useCallback(async () => {
    try {
      setError('');
      const data = await api.getPlaylists();

      // FIX: API may return a bare array OR a wrapped object
      // ({ playlists: [...] } or { data: [...] }). Normalize once,
      // into a single array, and use THAT array everywhere below —
      // never the raw `data` response.
      const playlistArray = Array.isArray(data)
        ? data
        : data.playlists || data.data || [];

      setPlaylists(playlistArray);

      // FIX: previously referenced the raw `data` object here
      // (data.some / data.length), which throws if `data` isn't
      // an array -- silently swallowed by the catch block below,
      // making it look like "nothing loaded."
      setSelectedId((current) => {
        if (current && playlistArray.some((p) => p.id === current)) {
          return current;
        }
        return playlistArray.length > 0 ? playlistArray[0].id : null;
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPlaylists();
  }, [loadPlaylists]);

  const handleCreatePlaylist = async (payload) => {
    const created = await api.createPlaylist(payload);
    setPlaylists((prev) => [...prev, created]);
    setSelectedId(created.id);
    setShowCreateModal(false);
    setSidebarOpen(false);
  };

  const handleDeletePlaylist = async (id) => {
    await api.deletePlaylist(id);
    setPlaylists((prev) => {
      const next = prev.filter((p) => p.id !== id);
      setSelectedId((current) => {
        if (current !== id) return current;
        return next.length > 0 ? next[0].id : null;
      });
      return next;
    });
  };

  const handleAddSong = async (payload) => {
    const song = await api.addSong(selectedId, payload);
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, songs: [...p.songs, song], updatedAt: new Date().toISOString() }
          : p
      )
    );
  };

  const handleRemoveSong = async (songId) => {
    await api.removeSong(selectedId, songId);
    setPlaylists((prev) =>
      prev.map((p) =>
        p.id === selectedId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    );
  };

  const handleSelectPlaylist = (id) => {
    setSelectedId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      <Header
        playlistCount={playlists.length}
        onMenuClick={() => setSidebarOpen(true)}
        onCreateClick={() => setShowCreateModal(true)}
      />

      {error && (
        <div className="banner banner-error" role="alert">
          {error}
          <button type="button" onClick={() => setError('')} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}

      <div className="layout">
        <div
          className={`sidebar-overlay ${sidebarOpen ? 'visible' : ''}`}
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />

        <PlaylistSidebar
          playlists={playlists}
          selectedId={selectedId}
          loading={loading}
          isOpen={sidebarOpen}
          onSelect={handleSelectPlaylist}
          onCreate={() => setShowCreateModal(true)}
          onDelete={handleDeletePlaylist}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="main-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner" />
              <p>Loading playlists...</p>
            </div>
          ) : selectedPlaylist ? (
            <PlaylistDetail
              playlist={selectedPlaylist}
              onAddSong={handleAddSong}
              onRemoveSong={handleRemoveSong}
            />
          ) : (
            <EmptyState onCreateClick={() => setShowCreateModal(true)} />
          )}
        </main>
      </div>

      {showCreateModal && (
        <CreatePlaylistModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePlaylist}
        />
      )}
    </div>
  );
}

export default App;
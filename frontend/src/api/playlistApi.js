const API_BASE = '/api';

async function request(url, options = {}) {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  getPlaylists: () => request('/playlists'),
  createPlaylist: (payload) =>
    request('/playlists', { method: 'POST', body: JSON.stringify(payload) }),
  deletePlaylist: (id) =>
    request(`/playlists/${id}`, { method: 'DELETE' }),
  addSong: (playlistId, payload) =>
    request(`/playlists/${playlistId}/songs`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  removeSong: (playlistId, songId) =>
    request(`/playlists/${playlistId}/songs/${songId}`, { method: 'DELETE' }),
};

import EmptyState from "../components/EmptyState";

const HomePage = ({ playlists, onCreateClick }) => {
  if (playlists.length === 0) {
    return (
      <EmptyState
        onCreateClick={onCreateClick}
      />
    );
  }

  return (
    <div className="home-screen">
      <h1>Welcome to Music Playlist Manager</h1>

      <p>
        Select a playlist from the sidebar
        to view and manage songs.
      </p>
    </div>
  );
};

export default HomePage;
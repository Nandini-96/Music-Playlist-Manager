import { useParams } from "react-router-dom";
import PlaylistDetail from "../components/PlaylistDetail";

function PlaylistPage({
  playlists,
  onAddSong,
  onRemoveSong,
}) {
  const { id } = useParams();

  const playlist = playlists.find(
    (p) => p.id === id
  );

  if (!playlist) {
    return (
      <div className="empty-state">
        Playlist not found
      </div>
    );
  }

  return (
    <PlaylistDetail
      playlist={playlist}
      onAddSong={onAddSong}
      onRemoveSong={onRemoveSong}
    />
  );
}

export default PlaylistPage;
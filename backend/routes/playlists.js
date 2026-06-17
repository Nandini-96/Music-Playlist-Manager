const express = require("express");
const { v4: uuidv4 } = require("uuid");

const {
  readPlaylists,
  writePlaylists,
} = require("../utils/storage");

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(readPlaylists());
});

router.get("/:id", (req, res) => {
  const playlist = readPlaylists().find(
    (p) => p.id === req.params.id
  );

  if (!playlist) {
    return res.status(404).json({
      error: "Playlist not found",
    });
  }

  res.json(playlist);
});

router.post("/", (req, res) => {
  const { name, description = "" } =
    req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      error: "Playlist name is required",
    });
  }

  const playlists = readPlaylists();

  const playlist = {
    id: uuidv4(),
    name: name.trim(),
    description: description.trim(),
    songs: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  playlists.push(playlist);

  writePlaylists(playlists);

  res.status(201).json(playlist);
});

router.put("/:id", (req, res) => {
  const { name, description } =
    req.body;

  const playlists = readPlaylists();

  const index = playlists.findIndex(
    (p) => p.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Playlist not found",
    });
  }

  if (name !== undefined) {
    playlists[index].name =
      name.trim();
  }

  if (description !== undefined) {
    playlists[index].description =
      description.trim();
  }

  playlists[index].updatedAt =
    new Date().toISOString();

  writePlaylists(playlists);

  res.json(playlists[index]);
});

router.delete("/:id", (req, res) => {
  const playlists = readPlaylists();

  const index = playlists.findIndex(
    (p) => p.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Playlist not found",
    });
  }

  const deleted =
    playlists.splice(index, 1)[0];

  writePlaylists(playlists);

  res.json(deleted);
});

router.post("/:id/songs", (req, res) => {
  const { title, artist, duration } =
    req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      error: "Song title is required",
    });
  }

  if (!artist?.trim()) {
    return res.status(400).json({
      error: "Artist is required",
    });
  }

  const playlists = readPlaylists();

  const index = playlists.findIndex(
    (p) => p.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      error: "Playlist not found",
    });
  }

  const song = {
    id: uuidv4(),
    title: title.trim(),
    artist: artist.trim(),
    duration:
      duration?.trim() || "",
    addedAt:
      new Date().toISOString(),
  };

  playlists[index].songs.push(song);

  playlists[index].updatedAt =
    new Date().toISOString();

  writePlaylists(playlists);

  res.status(201).json(song);
});

router.delete(
  "/:playlistId/songs/:songId",
  (req, res) => {
    const playlists =
      readPlaylists();

    const playlistIndex =
      playlists.findIndex(
        (p) =>
          p.id ===
          req.params.playlistId
      );

    if (playlistIndex === -1) {
      return res.status(404).json({
        error: "Playlist not found",
      });
    }

    const songIndex =
      playlists[
        playlistIndex
      ].songs.findIndex(
        (s) =>
          s.id ===
          req.params.songId
      );

    if (songIndex === -1) {
      return res.status(404).json({
        error: "Song not found",
      });
    }

    const removed =
      playlists[
        playlistIndex
      ].songs.splice(songIndex, 1)[0];

    playlists[
      playlistIndex
    ].updatedAt =
      new Date().toISOString();

    writePlaylists(playlists);

    res.json(removed);
  }
);

module.exports = router;
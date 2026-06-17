const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(
  __dirname,
  "../data/playlists.json"
);

function readPlaylists() {
  try {
    const data = fs.readFileSync(
      DATA_FILE,
      "utf-8"
    );

    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writePlaylists(playlists) {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify(playlists, null, 2)
  );
}

module.exports = {
  readPlaylists,
  writePlaylists,
};
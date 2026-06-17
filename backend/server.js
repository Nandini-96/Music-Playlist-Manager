const express = require("express");
const cors = require("cors");

const playlistRoutes = require(
  "./routes/playlists"
);

const app = express();

const PORT =
  process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
  });
});

app.use(
  "/api/playlists",
  playlistRoutes
);

app.use((_req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const server = app.listen(
  PORT,
  () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  }
);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} already in use`
    );
  } else {
    console.error(err);
  }

  process.exit(1);
});
import React, { useState } from "react";
import { getYoutubeId } from "../utils/youtube";

export function SongCard({ song }) {
  const [showPlayer, setShowPlayer] = useState(false);
  const id = getYoutubeId(song.url);
  const thumbnail = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : song.thumbnail || "/placeholder.png";

  return (
    <div className="flex flex-col p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors mb-2">
      <div className="flex items-center">
        <img
          src={thumbnail}
          alt={song.title}
          className="w-12 h-12 object-cover rounded mr-4"
          onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
        />
        <div className="flex-1 text-center">
          <h2 className="font-semibold truncate" title={song.title}>{song.title}</h2>
        </div>
        <div className="text-right w-24 text-sm opacity-70">
          {song.genre}
        </div>
        <button
          className="ml-4 text-blue-400 text-sm"
          onClick={() => setShowPlayer(!showPlayer)}
        >
          {showPlayer ? "Cacher" : "Écouter"}
        </button>
      </div>

      {showPlayer && id && (
        <div className="mt-2 w-full flex justify-center">
          <iframe
            width="100%"
            height="150"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={song.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded"
          ></iframe>
        </div>
      )}
    </div>
  );
}
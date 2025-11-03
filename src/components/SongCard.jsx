import { getYoutubeId } from "../utils/youtube";

export function SongCard({ song }) {
  const id = getYoutubeId(song.url);
  const thumbnail = id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : song.thumbnail || "/placeholder.png";

  return (
    <div className="flex items-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={song.title}
        className="w-20 h-20 object-cover rounded mr-4 flex-shrink-0"
        onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
      />

      {/* Titre */}
      <div className="flex-1 text-center">
        <h2 className="font-semibold truncate" title={song.title}>
          {song.title}
        </h2>
      </div>

            {/* Artiste */}
      <div className="w-32 text-right text-sm opacity-70 mr-4 truncate">
        {song.artist}
      </div>


      {/* Genre */}
      <div className="w-24 text-right text-sm opacity-70 mr-4">
        {song.genre}
      </div>
    </div>
  );
}

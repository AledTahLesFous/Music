import { getYoutubeId } from "../utils/youtube";

export function SongCard({ song }) {
  const id = getYoutubeId(song.url);
  const thumbnail = id
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : song.thumbnail;

  return (
    <div className="flex flex-col sm:flex-row items-center p-2 bg-gray-800 rounded hover:bg-gray-700 transition-colors gap-2">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={song.title}
        className="w-full sm:w-20 h-20 object-cover rounded flex-shrink-0"
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />

      {/* Infos */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between flex-1 w-full gap-2">
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-semibold truncate" title={song.title}>
            {song.title}
          </h2>
        </div>

        <div className="text-sm opacity-70 truncate sm:ml-4">{song.artist}</div>

        <div className="text-sm opacity-70 truncate sm:ml-4">{song.genre}</div>
      </div>
    </div>
  );
}

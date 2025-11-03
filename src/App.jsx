import { useState } from "react";
import { songs } from "./data/songs";
import { SongCard } from "./components/SongCard";
import { SearchBar } from "./components/SearchBar";
import { getYoutubeId } from "./utils/youtube";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeSongId, setActiveSongId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Récupère les genres uniques
  const genres = Array.from(new Set(songs.map((s) => s.genre))).sort();

  const filtered = songs.filter((s) => {
    const matchesTitle = s.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(s.genre);
    return matchesTitle && matchesGenre;
  });

  const handleCardClick = (song) => {
    const id = getYoutubeId(song.url);
    setActiveSongId(activeSongId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">
        Ma Bibliothèque Musicale
      </h1>

      {/* Search + Genre */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <SearchBar search={search} setSearch={setSearch} className="flex-1" />

        <div className="relative w-full sm:w-60">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full p-2 rounded bg-gray-800 text-white text-left"
          >
            {selectedGenres.length > 0
              ? selectedGenres.join(", ")
              : "Tous les genres"}
          </button>

          {dropdownOpen && (
            <div className="absolute mt-1 w-full bg-gray-800 border border-gray-700 rounded z-10 max-h-60 overflow-auto">
              {genres.map((genre) => (
                <label
                  key={genre}
                  className="flex items-center p-2 cursor-pointer hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGenres([...selectedGenres, genre]);
                      } else {
                        setSelectedGenres(
                          selectedGenres.filter((g) => g !== genre)
                        );
                      }
                    }}
                  />
                  {genre}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Songs list */}
      <div className="flex flex-col gap-3 mt-4">
        {filtered.map((song) => {
          const id = getYoutubeId(song.url);
          return (
            <div key={song.id || song.title} className="flex flex-col">
              <div onClick={() => handleCardClick(song)}>
                <SongCard song={song} />
              </div>
              {activeSongId === id && (
                <div className="mt-2 w-full flex justify-center">
                  <div className="w-full sm:w-[560px] aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-full rounded"
                      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                      title={song.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

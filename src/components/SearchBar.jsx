export function SearchBar({ search, setSearch }) {
return (
<input
type="text"
placeholder="Rechercher..."
className="w-full p-2 mb-4 bg-gray-800 rounded"
value={search}
onChange={(e) => setSearch(e.target.value)}
/>
);
}
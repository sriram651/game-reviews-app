export default function GenreList({ genres }) {
    return (
        <ul className="genres-list">
            {genres.map((genre, index) => (
                <li key={index}>{genre}</li>
            ))}
        </ul>
    )
}

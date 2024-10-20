export default function PlatformsList({ platforms }) {
    return (
        <ul className="platforms-list">
            {platforms.map((platform, index) => (
                <li key={index}>{platform}</li>
            ))}
        </ul>
    )
}

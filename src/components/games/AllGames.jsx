"use client";

import { GET_ALL_GAMES } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AllGames() {
    const { data, loading, error } = useQuery(GET_ALL_GAMES);
    let isNoGames = data?.getAllGames?.length === 0;
    let games = data?.getAllGames || [];

    return (
        <section
            className="games-listing-section"
        >
            <h1>Explore</h1>

            <ul className="games-listing">
                {loading && <SkeletonLoader />}
                {error && <p>Error: {error.message}</p>}
                {isNoGames && <p>No games found</p>}

                {games?.map((game, index) => (
                    <GameCard key={index} game={game} />
                ))}
            </ul>
        </section>
    )
}

function SkeletonLoader() {
    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="skeleton-loader">
                    <div className="skeleton-cover"></div>
                    <div className="skeleton-details">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-released"></div>
                    </div>
                </div>
            ))}
        </>
    )
}

function GameCard({ game }) {
    const { push } = useRouter();

    function viewGameDetails() {
        push(`/games/${game._id}`);
    }

    return (
        <div
            key={game.id}
            className="game-card"
            onClick={viewGameDetails}
        >
            <div className="game-cover-container">
                <Image
                    src={game.coverImage}
                    alt={game.title}
                    width={600}
                    height={450}
                    loading="eager"
                    placeholder="blur"
                    blurDataURL="/images/game-consoles.webp"
                    priority
                />
            </div>
            <Details details={game} />
        </div>
    )
}

function Details({ details }) {
    return (
        <div className="game-details">
            <h2>{details.title}</h2>
            <h4>Initial Release: {details.releasedYear}</h4>
            {/* <Genres genres={details.genre} />
            <Platforms platforms={details.platform} /> */}
        </div>
    )
}

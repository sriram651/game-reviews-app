"use client";
import GameDetails from "@/components/games/GameDetails";
import ReviewsSection from "@/components/games/ReviewsSection";
import { GET_GAME_BY_ID } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function GameDetailsPage() {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_GAME_BY_ID, { variables: { gameId: id } });

    let gameDetails = data?.getGameById;
    return (
        <div className="game-details-page">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {gameDetails && (
                <section className="details-section">
                    <div className="cover-image-container">
                        <Image
                            src={gameDetails.coverImage}
                            alt={gameDetails.title}
                            width={1080}
                            height={800}
                        />
                    </div>

                    <GameDetails gameDetails={gameDetails} />
                </section>
            )}

            <ReviewsSection gameId={id} />
        </div>
    )
}

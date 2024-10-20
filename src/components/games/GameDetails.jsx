import Image from "next/image"
import GenreList from "./GenreList"
import PlatformsList from "./PlatformsList"
import { formatDate } from "@/utils/helpers"

export default function GameDetails({ gameDetails }) {
    return (
        <>
            <div className="meta-details">
                <h1>{gameDetails.title}</h1>
                <p className="description">{gameDetails.description}</p>

                <div className="genres-platforms">
                    <GenreList genres={gameDetails.genre} />
                    <PlatformsList platforms={gameDetails.platform} />
                </div>
            </div>
            <AdditionalDetails gameDetails={gameDetails} />
        </>
    )
}

function AdditionalDetails({ gameDetails }) {
    let { releaseDate, manufacturerName, developer } = gameDetails;
    let formattedReleaseDate = formatDate(releaseDate);

    return (
        <div className="additional-details">
            <StarRating />

            <div className="release-date detail-item">
                <p>Release Date</p>
                <h6>{formattedReleaseDate}</h6>
            </div>

            <div className="manufacturer detail-item">
                <p>Manufacturer</p>
                <h6>{manufacturerName}</h6>
            </div>

            <div className="developers detail-item">
                <p>Developer</p>
                <h6>{developer}</h6>
            </div>

            <div className="action-btns">
                <button className="rate-game">Rate Game</button>
                <button className="view-more">View more</button>
            </div>
        </div>
    )
}

function StarRating() {
    return (
        <div className="star-rating">
            <h5>4.7 </h5>
            <Image
                src="/images/yellow-star.png"
                alt="Star Rating"
                width={200}
                height={200}
                className="w-14 aspect-square"
            />
        </div>
    )
}

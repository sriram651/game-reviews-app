import { GET_GAME_REVIEWS } from "@/graphql/queries";
import { getRelativeTime } from "@/utils/helpers";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import AddReview from "./AddReview";
import VoteActions from "./VoteActions";
import Image from "next/image";

export default function ReviewsSection() {

    return (
        <div
            className="reviews-section"
        >
            <AddReview />

            <Reviews />
        </div>
    )
}

function Reviews() {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_GAME_REVIEWS, { variables: { gameId: id } });

    let reviews = data?.getGameById.reviews;
    let reviewsCount = reviews?.length || 0;

    return (
        <div className="reviews-list-section">
            <h3>{reviewsCount} Reviews</h3>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <ul className="w-full max-w-3xl grid grid-flow-row gap-3 py-6">
                {reviews && reviews.map(review => (
                    <Review key={review._id} review={review} />
                ))}
            </ul>
        </div>
    )
}

function Review({ review }) {
    return (
        <li className="review w-full">
            <div className="w-full flex flex-row justify-start items-start gap-3">
                <ReviewerAvatar />
                <ReviewDetails review={review} />
            </div>
        </li>
    )
}

function ReviewerAvatar() {
    return (
        <div className="w-10 md:w-12 aspect-square rounded-full overflow-clip">
            <Image
                src={"/images/game-consoles.webp"}
                alt="Reviewer Avatar"
                width={1080}
                height={720}
                loading="lazy"
                className="w-full aspect-square object-cover object-center"
            />
        </div>
    )
}

function ReviewDetails({ review }) {
    return (
        <div className="review-details w-full flex flex-col items-start justify-start gap-2">
            <UserDate review={review} />
            <Content content={review?.content} />

            <VoteActions
                reviewId={review?._id}
                upVotes={review.upVotes}
                downVotes={review.downVotes}
                userVoteDetails={review.userVoteDetails}
            />
        </div>
    )
}

function UserDate({ review }) {
    return (
        <div className="flex flex-row items-center gap-2">
            <h6 className="text-sm md:text-base font-semibold">@{review.user.userName}</h6>
            <p className="text-xs md:text-sm opacity-60">{getRelativeTime(review.createdAt)}</p>
        </div>
    )
}

function Content({ content }) {
    return (
        <p className="text-sm md:text-base">{content}</p>
    )
}

import { GET_GAME_REVIEWS } from "@/graphql/queries";
import { formatFullDateTime } from "@/utils/helpers";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import AddReview from "./AddReview";
import { useState } from "react";
import { UPVOTE_REVIEW } from "@/graphql/mutations";

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
            <h3>Reviews ({reviewsCount})</h3>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}

            <ul className="w-full max-w-xl grid grid-flow-row gap-3 py-6">
                {reviews && reviews.map(review => (
                    <Review key={review._id} review={review} />
                ))}
            </ul>
        </div>
    )
}

function Review({ review }) {
    return (
        <li className="review w-full p-2 md:p-4 border border-dark dark:border-light rounded-lg">
            <p>{review.content}</p>
            <p>Rating: {review.rating}</p>
            <p>Score: {review.score}</p>
            <p>Upvotes: {review.upVotes}</p>
            <p>Downvotes: {review.downVotes}</p>
            <p>Created by: {review.user.userName}</p>
            <p>Reviewed on: {formatFullDateTime(review.createdAt)}</p>

            <Votes
                reviewId={review?._id}
                upVotes={review.upVotes}
                downVotes={review.downVotes}
            />
        </li>
    )
}

function Votes({ reviewId, upVotes, downVotes }) {
    const [upVoteCount, setUpVoteCount] = useState(upVotes);
    const [downVoteCount, setDownVoteCount] = useState(downVotes);
    const [upVote, { loading }] = useMutation(UPVOTE_REVIEW);

    async function handleVote(voteType) {

        try {
            if (voteType === 'up') {
                setUpVoteCount((prev) => prev + 1);

                const { errors } = await upVote({
                    variables: { reviewId }
                });

                if (errors) {
                    setUpVoteCount((prev) => prev - 1);
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="votes-section w-max max-w-full py-2 flex justify-start items-center gap-2">
            <button
                className="w-max px-3 py-2 border border-brand-secondary text-brand-secondary font-medium rounded-lg disabled:opacity-50"
                onClick={() => handleVote('up')}
                disabled={loading}
            >
                👍 {upVoteCount}
            </button>
            <button
                className="w-max px-3 py-2 border border-red-600 text-red-600 font-medium rounded-lg disabled:opacity-50"
                onClick={() => handleVote('down')}
                disabled={loading}
            >
                👎 {downVoteCount}
            </button>
        </div>
    )
}

import { DOWNVOTE_REVIEW, UPVOTE_REVIEW } from "@/graphql/mutations";
import { GET_VOTE_DETAILS_BY_REVIEW } from "@/graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from 'react';

export default function VoteActions({ reviewId, upVotes, downVotes, userVoteDetails }) {
    const [userVote, setUserVote] = useState(userVoteDetails);
    const [upVoteCount, setUpVoteCount] = useState(upVotes);
    const [downVoteCount, setDownVoteCount] = useState(downVotes);
    const [upVote, { loading: upVoteLoading }] = useMutation(UPVOTE_REVIEW);
    const [downVote, { loading: downVoteLoading }] = useMutation(DOWNVOTE_REVIEW);
    const { refetch } = useQuery(GET_VOTE_DETAILS_BY_REVIEW, { variables: { reviewId } });

    async function handleUpVote() {
        try {
            // Check if the user has already voted on this review.
            let isAlreadyVoted = userVote?.isVoted;

            // User has not voted yet for this review.
            if (!isAlreadyVoted) {
                setUpVoteCount((prev) => prev + 1);
            }

            // User has already UP voted for this review.
            if (userVote?.isUpVoted) {
                setUpVoteCount((prev) => prev - 1);
            }

            const { data } = await upVote({ variables: { reviewId } });

            if (data?.upVoteReview) {
                const { data } = await refetch();

                setUserVote(data?.reviewById?.userVoteDetails);
                setUpVoteCount(data?.reviewById?.upVotes);
                setDownVoteCount(data?.reviewById?.downVotes);
            }
        } catch (error) {
            setUpVoteCount(upVotes);
            setDownVoteCount(downVotes);
            setUserVote(userVoteDetails);
        }
    }

    async function handleDownVote() {
        try {
            // Check if the user has already voted on this review.
            let isAlreadyVoted = userVote?.isVoted;

            // User has not voted yet for this review.
            if (!isAlreadyVoted) {
                setDownVoteCount((prev) => prev + 1);
            }

            // User has already DOWN voted for this review.
            if (userVote?.isDownVoted) {
                setDownVoteCount((prev) => prev - 1);
            }

            const { data } = await downVote({ variables: { reviewId } });

            if (data?.downVoteReview) {
                const { data } = await refetch();

                setUserVote(data?.reviewById?.userVoteDetails);
                setUpVoteCount(data?.reviewById?.upVotes);
                setDownVoteCount(data?.reviewById?.downVotes);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="votes-section w-max max-w-full py-2 flex justify-start items-center gap-2">
            <button
                className={`w-max px-3 py-2 border border-green-600 text-green-600 ${userVote?.isUpVoted ? "active bg-green-600/15" : ""} font-medium rounded-lg disabled:opacity-50`}
                onClick={handleUpVote}
                disabled={upVoteLoading || downVoteLoading}
            >
                👍 {upVoteCount}
            </button>
            <button
                className={`w-max px-3 py-2 border border-red-600 text-red-600 ${userVote?.isDownVoted ? " active bg-red-600/15" : ""} font-medium rounded-lg disabled:opacity-50`}
                onClick={handleDownVote}
                disabled={upVoteLoading || downVoteLoading}
            >
                👎 {downVoteCount}
            </button>
        </div>
    )
}

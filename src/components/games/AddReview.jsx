import { ADD_REVIEW } from "@/graphql/mutations";
import { GET_GAME_REVIEWS } from "@/graphql/queries";
import useToast from "@/hooks/useToast";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function AddReview() {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [addReview, { loading }] = useMutation(ADD_REVIEW);

    async function handleAddReview(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const content = formData.get("content");
        const rating = rating;

        try {
            // Add review mutation
            await addReview({
                variables: {
                    gameId: id,
                    review: {
                        content,
                        rating: parseInt(rating),
                    },
                },
                refetchQueries: [{ query: GET_GAME_REVIEWS, variables: { gameId: id } }],
            });

            event.target.reset();
        } catch (error) {
            console.log("Error adding review:", error);
        }
    }
    return (
        <div className="add-review">
            <h3>Leave a Review</h3>

            <form
                className="review-form"
                onSubmit={handleAddReview}
            >

                <div className="form-group with-avatar">
                    <div className="user-avatar">
                        <Image
                            src="/images/game-consoles.webp"
                            alt="User avatar"
                            width={200}
                            height={200}
                            className="avatar"
                        />
                    </div>
                    <StarRating
                        rating={rating}
                        setRating={setRating}
                        disabled={loading}
                    />
                </div>

                <div className="form-group">
                    <AutoResizingTextarea
                        loading={loading}
                        reviewContent={reviewContent}
                        setReviewContent={setReviewContent}
                    />
                </div>

                <button
                    type="submit"
                    disabled={!Boolean(reviewContent) || loading}
                    className="submit-review-button"
                >
                    {loading ? "Please wait..." : "Add Review"}
                </button>
            </form>
        </div>
    )
}

function AutoResizingTextarea({ loading, reviewContent, setReviewContent }) {
    const { showToast } = useToast();
    const textareaRef = useRef(null);

    function handleInput() {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }

    function handleChange(event) {
        if (loading) return;

        if (event.target.value.length > 2000) {
            showToast("Maximum content length is 800 characters", { type: "error" });
            return;
        }

        setReviewContent(event.target.value);
    }

    return (
        <textarea
            id="content"
            name="content"
            placeholder="Enter your review here..."
            cols={30}
            rows={1}
            required
            disabled={loading}
            ref={textareaRef}
            value={reviewContent}
            onChange={handleChange}
            onInput={handleInput}
        />
    );
};

function StarRating({ rating, setRating, disabled }) {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={`star-element ${rating >= star || hoverRating > star ? 'star-filled' : 'hover:star-filled'} ${disabled ? 'star-disabled' : ''}`}
                    onMouseEnter={() => {
                        setHoverRating(star)
                    }}
                    onMouseLeave={() => {
                        setHoverRating(0)
                    }}
                    onClick={() => {
                        setRating(star)
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Rating of ${star}`}
                >
                    {' '}
                    {rating >= star || hoverRating >= star ? "★" : "☆"}{' '}
                </span>
            ))}
        </div>
    );
}

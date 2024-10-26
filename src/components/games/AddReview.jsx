import { ADD_REVIEW } from "@/graphql/mutations";
import { GET_GAME_REVIEWS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRef } from "react";

export default function AddReview() {
    const { id } = useParams();
    const [addReview, { loading }] = useMutation(ADD_REVIEW);

    async function handleAddReview(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const content = formData.get("content");
        const rating = formData.get("rating");

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
            <h3>Add Review</h3>

            <form
                className="review-form"
                onSubmit={handleAddReview}
            >
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <AutoResizingTextarea loading={loading} />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating</label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        required
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-review-button"
                >
                    {loading ? "Please wait..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

function AutoResizingTextarea({ loading }) {
    const textareaRef = useRef(null);

    function handleInput() {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
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
            onInput={handleInput}
        />
    );
};

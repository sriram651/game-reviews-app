import { ADD_REVIEW } from "@/graphql/mutations";
import { GET_GAME_REVIEWS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";

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
                className="review-form w-full max-w-lg"
                onSubmit={handleAddReview}
            >
                <div className="my-2 flex flex-col justify-start items-start gap-1">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        placeholder="Enter your review here..."
                        cols={30}
                        rows={5}
                        required
                        disabled={loading}
                        className="w-full bg-transparent border border-dark dark:border-light rounded-lg p-2"
                    />
                </div>

                <div className="my-2 flex flex-col justify-start items-start gap-1">
                    <label htmlFor="rating">Rating</label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        min="1"
                        max="5"
                        required
                        disabled={loading}
                        className="w-full bg-transparent border border-dark dark:border-light rounded-lg p-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="submit-review-button mt-4 bg-brand-primary text-white rounded-lg px-4 py-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? "Please wait..." : "Submit"}
                </button>
            </form>
        </div>
    )
}

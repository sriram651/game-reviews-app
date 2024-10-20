"use client";

import { useRouter } from "next/navigation";

export default function Welcome() {
    const { push } = useRouter();
    return (
        <section className="welcome-section">
            <h1>Welcome to the Game Store</h1>
            <p>Browse our collection of games</p>

            <button
                onClick={() => push("/games")}
            >
                Explore Games
            </button>
        </section>
    );
}

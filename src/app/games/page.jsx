import AllGames from "@/components/games/AllGames";

export const metadata = {
    title: "Explore Games",
    description: "A page where you can explore a variety of games, read reviews, and discover new favorites.",
};

export default function GamesPage() {
    return (
        <div className="w-full">
            <AllGames />
        </div>
    );
}

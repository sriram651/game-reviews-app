# Game Review App (Frontend)

This repository contains the frontend for a game review application, built using **Next.js** and **Tailwind CSS**. It leverages **Apollo Client** for making API calls to interact with a backend service.

## Features

- **User Authentication**: 
  - Users can register and log in with a username and password.
  - No email verification required for registration.

- **Game Listings**: 
  - Displays a list of games with basic information.

- **Game Details**: 
  - Users can view detailed information about each game, including:
    - Description of the game.
    - User reviews.
    - Overall rating of the game.

- **User Reviews**: 
  - Users can leave reviews for games.
  - Reviews can be upvoted or downvoted by other users.

- **Rating System**: 
  - The overall rating of a game is calculated based on the star ratings given by users.

## Technologies Used

- **Next.js** (React Framework)
- **Tailwind CSS** (Utility-first CSS framework)
- **Apollo Client** (GraphQL client for API calls)
- **GraphQL** (For querying the backend)
- **React** (Library for building UI components)

## Setup

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js** (v18 or above)
- **npm** or **yarn** (package managers)

### Installation

1. Clone the repository:
   ```bash
   git clone [<repository-url>](https://github.com/sriram651/game-reviews-app.git)
   ```
2. Install Dependencies:
   ```bash
   cd game-reviews-app
   npm install
   ```
3. Run the Development server:
   ```bash
   npm run dev
   ```

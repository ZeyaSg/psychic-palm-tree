# Repo link
https://github.com/cs421sp24-homework/homework-ZeyaSg.git

# QYay App! - A live Q&A App

QYay App is a solution to managing audience questions during live Q&A sessions. Organizers can create an event on the app and share it with the audience using a unique link or code. Attendees can join the event and submit questions anonymously, without requiring a login, throughout the live session. Additionally, participants can view a real-time list of submitted questions and upvote the ones they want to hear answered. Organizers have access to the same list and can respond to questions, marking them as answered.



The app includes the following features:

- Ability to create event
- Ability to create and share link or code
- Ability to join event via link or code
- Ability to submit quesitons anonymously during live session
- Ability to view and upvote questions
- Ability to respond and mark questions as answered

-----------------
## Running Locally

To run the app locally, follow these steps:

1. Clone this repository.
2. Open the terminal at the root of the repository.
3. Install dependencies with `pnpm install`.
4. **Environment Configuration**: Add a `.env` file in each the `app` and `api` sub-folders, similar to their respective `.env.example` files, and fill in the required environment variables.
5. **Database Setup**: Run `pnpm docker:up` to initialize the Postgres server.
6. **Run Locally**: To start the server, run `pnpm start:api`. To start the client, run `pnpm start:app`. Alternatively, you can run `pnpm start:all` to start both the client and server applications.

-----------------
## Basic information
Type of Application: Web Application

Architecture: PERN stack - extensible, flexible

Frontend:

Framework: ReactJS
Styling: TailwindCSS, shadcn

Backend:

API: NestJS - reactive featuresa nd easy to build
Authentication: passport library with JWT authentication - powerful encryption and authentication

Database: 

Primary Database: PostgresSQL - complex SQL enquiries
ORM: TypeORM - integration with typescript

-----------------
## Features
- User registration and log in, with authentication and error handling
- Creation of events, with optional fields for location and date
- Display of all of the user's created events
- Deletion of events

-----------------
## Difficulties and Challenges
- Integration of frontend and backend
- Credentials validation

-----------------
## Learning Resources
- Full-Stack Javascript course notes
- StackExchange
- PostgreSQL forum
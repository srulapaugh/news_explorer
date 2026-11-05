# NewsExplorer

NewsExplorer is a full-stack news search app built as a TripleTen final project. Users can search for news articles on any topic, see the results as cards, and save the ones they want to keep on a separate Saved News page.

This repository currently contains the **frontend** (Stage 1). Login, registration, and saving articles are simulated on the frontend for now, and the real backend comes in a later stage.

## Features

- **Search the news.** Enter a keyword to find articles from the last 7 days using the [News API](https://newsapi.org). Up to 100 results are loaded per search.
- **Search validation.** An empty search shows the message "Please enter a keyword."
- **Loading, empty, and error states.** A preloader shows while results load, "Nothing found" appears when there are no matches, and a friendly message appears if the request fails.
- **Show more.** Results show three cards at a time, with a "Show more" button that reveals three more until everything is displayed.
- **Sign in and sign up.** Modal forms with validation and error messages, a "registration successful" confirmation, and the ability to switch between the two. Modals close with the X button, a click outside, or the Escape key.
- **Save and remove articles.** Logged-in users can bookmark articles. Logged-out users see a "Sign in to save articles" hint when they hover the bookmark.
- **Saved News page.** A protected route (`/saved-news`) that lists the user's saved articles, how many there are, and the keywords they were found with. Articles can be removed with the trash button.
- **Responsive design.** Layouts for desktop, tablet, and mobile, including a mobile navigation menu, with no horizontal scrolling down to 320px.

## Technologies

- [React](https://react.dev) (function components and hooks)
- [React Router](https://reactrouter.com) for routing and the protected route
- [Vite](https://vitejs.dev) for development and builds
- [News API](https://newsapi.org) for the article data
- HTML5 and CSS3, with BEM class naming, Flexbox, and CSS Grid
- Fonts: Roboto, Roboto Slab, and Inter, loaded with `@font-face`

## What's simulated for now

Until the backend is built, these parts are stubbed on the frontend:

- Signing in and registering (the registration form rejects `example@test.com` as "already taken" to demonstrate the error state).
- The signed-in user's name.
- Saving and deleting articles, which are stored in the app's state and reset when the page reloads.

## Coming next

- A backend with real user authentication and authorization
- Saving and deleting articles in a database
- Deployment of the full application

## Author

Samantha Rulapaugh

- **Project pitch video:** [add your video link here](https://your-video-link)

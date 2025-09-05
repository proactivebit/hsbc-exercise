OBJECTIVE
Build a small single-page application that consumes the public Rick & Morty REST API and presents a
paginated list of characters and details.
Mandatory Functional Requirements

- Fetch data from Rick & Morty API https://rickandmortyapi.com/documentation
- Display a paginated list of characters
- Allow the user to select the page size for pagination (select)
- Allow filtering by character name (text input) and status (select)
- Persist pagination and filter state in the URL so that the list state survives page refreshes and can
  be shared via a link
- Provide a Clear button to clear all filters
- Provide a Refresh button to re-fetch the currently visible page
- Show character details on a dedicated route when a character is selected
- Implement robust error handling and ensure a good user experience
- Ensure 100% type safety: do not use any or type assertions (as)
  Mandatory Technology Stack
- React 18 or later (React 19 with React Compiler is allowed and recommended)
- TypeScript
- TanStack Query
- TanStack Router
- TanStack Table
  Evaluation Criteria
- All mandatory requirements must be fulfilled, and the application must use the entire specified
  technology stack
- Code quality, structure, user experience
- No AI tools used
  Delivery
- Provide a public GitHub repository link
  Not Evaluated
- Styling or advanced animations
- Choice of UI library or design system

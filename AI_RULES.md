# AI Development Rules for Combo Digital Agency App

This document provides guidelines for AI developers working on this project. Adhering to these rules ensures consistency, maintainability, and adherence to the established technical architecture.

## Tech Stack Overview

The application is built with a modern, lightweight tech stack focused on performance and developer experience.

- **Framework:** React with TypeScript for building a type-safe and component-based user interface.
- **Build Tool:** Vite is used for its fast development server and optimized production builds.
- **Styling:** Tailwind CSS is used exclusively for styling. It's included via a CDN in `index.html` for rapid, utility-first design.
- **Routing:** The app uses a simple client-side navigation system managed by React's `useState` hook, rather than a dedicated routing library.
- **Icons:** [Feather Icons](https://feathericons.com/) are used for all iconography to maintain a consistent and minimalist aesthetic.
- **Animations:** Animations are primarily handled with Tailwind CSS transition utilities and custom CSS keyframes defined in `index.html`.
- **Architecture:** The codebase follows a clear structure, separating pages, reusable components, hooks, types, and constants into their respective files and directories.

## Development Guidelines & Library Usage

Follow these rules when adding or modifying features.

- **Styling:**
  - **DO:** Use Tailwind CSS classes for all styling needs.
  - **DO NOT:** Write custom CSS in separate files unless it's for complex, reusable animations that cannot be achieved with Tailwind.
  - **DO NOT:** Introduce other CSS frameworks (e.g., Bootstrap, Material-UI) or CSS-in-JS libraries (e.g., Styled Components, Emotion).

- **UI Components:**
  - **DO:** Prioritize using pre-built, unstyled components from **shadcn/ui** for common UI elements like dialogs, forms, buttons, etc. Style them with Tailwind CSS.
  - **DO:** Create new, single-purpose components in the `src/components/` directory. Keep components small and focused.

- **State Management:**
  - **DO:** Use React's built-in hooks (`useState`, `useContext`, `useReducer`) for local and simple shared state.
  - **DO NOT:** Introduce complex global state management libraries like Redux. If global state becomes necessary, use a lightweight solution like **Zustand**.

- **Icons:**
  - **DO:** Continue using **Feather Icons**. The setup in `Header.tsx` and `index.html` should be followed.
  - **DO NOT:** Add other icon libraries like Font Awesome or Material Icons.

- **Forms:**
  - **DO:** For simple forms (like the current contact form), use controlled components with `useState`.
  - **CONSIDER:** Using **React Hook Form** with **Zod** for validation if forms become more complex.

- **Animations & Effects:**
  - **DO:** Use Tailwind's `transition`, `transform`, and `animate` utilities for most animations.
  - **CONSIDER:** Using **Framer Motion** for complex, physics-based, or gesture-based animations if the need arises.

- **Code Structure:**
  - **DO:** Place page-level components in `src/components/pages/`.
  - **DO:** Place reusable components in `src/components/`.
  - **DO:** Place custom hooks in `src/hooks/`.
  - **DO:** Define all shared types and enums in `src/types.ts`.
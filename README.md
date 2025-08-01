# Ubiquiti Internal Product Database Viewer

A frontend productivity tool for Ubiquiti developers, designers, PMs, and other roles to discover, verify, share, and align on insights about Ubiquiti's products and their images by visualizing the product database (UIDB).

## Demo

[https://ubiquiti-fe-test-assignment.vercel.app/](https://ubiquiti-fe-test-assignment.vercel.app/)

## Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Start
- **UI Library**: @heroui/react (primary), Tailwind CSS
- **State & Data**: TanStack Query, TanStack Router
- **Package Manager**: pnpm

## Features

- **Performance Optimized**: TanStack Virtual for efficient rendering of large device lists
- **Responsive Design**: Mobile-first approach with adaptive layouts for all screen sizes
- **Smart Image Loading**: Lazy loading with progressive enhancement and fallback handling
- **Advanced Search & Filtering**: Real-time search with multiple filter options (line, category, etc.)
- **Multiple View Modes**: Switch between grid and table views for optimal data presentation
- **Consistent UI**: HeroUI component library with Tailwind CSS for design system consistency
- **Efficient State Management**: TanStack Query for server state with caching and background updates
- **Type-Safe Routing**: TanStack Router with full TypeScript integration
- **Accessibility First**: WCAG compliant with keyboard navigation and screen reader support
- **Scalable Architecture**: Feature-based structure ready for future enhancements
- **Developer Experience**: ESLint, Prettier, and TypeScript strict mode for code quality
- **Modern React Architecture**: Built with React 19, TypeScript, and latest best practices

## Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start development server:

   ```bash
   pnpm dev
   ```

## Development Standards

For comprehensive coding standards and best practices, refer to the `.cursorrules` file. Keep this file up to date to maintain a single source of truth for development guidelines.

## Things to Improve

- Optimize speed of the app and data loading by implementing API pagination or chunked data fetching to avoid loading the entire dataset on initial server call; this would require a proper API, not the static JSON currently available.
- Align application color variables 1:1 with unified color tokens from an updated Figma design; request improved design system/unified color tokens.
- Obtain and integrate the official corporate font, replacing the current fallback font in the application; font is not available in Figma.
- Externalize all user-facing text into i18n files to enable localization and internationalization support.
- Audit and refactor device details presentation to ensure consistency between Figma specifications and the data returned from the API.
- Add test coverage across the project, including E2E and unit tests.

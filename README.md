# Ubiquiti Internal Product Database Viewer

A frontend productivity tool for Ubiquiti developers, designers, PMs, and other roles to discover, verify, share, and align on insights about Ubiquiti's products and their images by visualizing the product database (UIDB).

## Demo

[https://ubiquiti-fe-test-assignment.vercel.app/](https://ubiquiti-fe-test-assignment.vercel.app/)

## Tech Stack

- **Frontend**: React 19, TypeScript, TanStack Start
- **UI Library**: @heroui/react (primary), Tailwind CSS
- **State & Data**: TanStack Query, TanStack Router
- **Package Manager**: pnpm

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

- Request an improved Figma design with unified color tokens and match them 1:1 to Tailwind variables
- Request a corporate font file and replace it with the fallback font used in the app
- Extract texts to an i18n file and consider localization
- Consider customization of a mobile view

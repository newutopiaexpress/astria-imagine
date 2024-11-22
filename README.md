# Flux Imagine GUI interface

A modern and intuitive graphical user interface for generating images using Flux technology. This web-based application provides a seamless experience for creating, editing, and managing AI-generated images through a clean and responsive interface. Built with React and TypeScript, it offers real-time previews, batch processing capabilities, and integration with Flux's powerful image generation API.


## Table of Contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fastriaai%2Fimagine&env=ASTRIA_API_KEY)

### Vercel Deployment ENV
On click of the deployment button fill the env accordingly:

   ```plaintext
   ASTRIA_API_KEY=fill your astria api key
   ```

## Installation

To get a local copy up and running, follow these steps.

### Prerequisites

- **Node.js** and **npm**
- **Git**

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/astriaai/imagine.git
    cd imagine
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add your API key:
   
   ```plaintext
   ASTRIA_API_KEY=fill your astria api key
   ```

## Usage

After installation, you can run the project locally with:

```bash
npm run dev
```

The app should now be running on `http://localhost:5173`.

## Project Structure

The project follows this folder structure for maintainability:

```plaintext
src/
├── api/              # API configuration and endpoints
├── components/       # Reusable components and UI elements
├── hooks/            # Custom React hooks
├── lib/              # Utility functions and helpers
├── pages/            # Main application pages and routes
├── services/         # API calls (Axios instances and API functions)
├── store/            # State management (Zustand)
└── types/            # TypeScript types and interfaces
```

Each directory serves a specific purpose:

- `api/`: Contains API configuration, endpoints, and related utilities
- `components/`: Houses reusable UI components used throughout the application
- `hooks/`: Custom React hooks for shared functionality
- `lib/`: Helper functions, constants, and utility code
- `pages/`: Main application pages and routing components
- `services/`: API integration layer with Axios configurations
- `store/`: State management logic using Zustand
- `types/`: TypeScript type definitions and interfaces


## Deployment

This project can be deployed to GitHub Pages or any other static site hosting service.

### GitHub Pages Deployment

1. Install `gh-pages`:
   
   ```bash
   npm install gh-pages --save-dev
   ```

2. Deploy the app:

   ```bash
   npm run build
   npm run deploy
   ```

The app should now be live on GitHub Pages!

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/YourFeature`)
3. Commit your Changes (`git commit -m 'Add YourFeature'`)
4. Push to the Branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## Sponsored by Astria

<p align="center">
   <a href="https://astria.ai">
      <img src="https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png" alt="Astria Logo" width="200"/>
   </a>
</p>

This project is proudly sponsored by [Astria](https://astria.ai), a leading platform in AI-powered image generation and manipulation.

## License

Distributed under the MIT License. See `LICENSE` for more information.


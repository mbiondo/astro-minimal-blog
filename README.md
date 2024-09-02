# Astro Minimal Blog

This repository is a minimalistic blog built with [Astro](https://astro.build), leveraging Astro DB, Lucia Auth, and the actions-manager library. It is deployed on Vercel for seamless hosting.

## Features

- **Astro**: Static site generation with ease.
- **Astro DB**: Lightweight, integrated database solution.
- **Lucia Auth**: Secure and flexible authentication.
- **Actions-Manager**: Manages user actions based on context.
- **Vercel Deployment**: Quick and efficient deployment platform.

## Project Structure
```text
/
├── db/
├── public/
├── src/
│   ├── components/
│   └── pages/
└── package.json
```

- **db/**: Database-related files.
- **public/**: Static assets.
- **src/**: Source code, including pages and components.

## Commands

Run these commands from the project root:

- `npm install`: Install dependencies.
- `npm run dev`: Start the local development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the built site.
- `npm run astro ...`: Access Astro CLI commands.

## Deployment

This project is deployed on [Vercel](https://vercel.com). Continuous deployment is configured via GitHub integration.

## Getting Started

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure environment variables as needed.
4. Start the development server with `npm run dev`.


## TODO
- [ ] Syntax highlighting 
- [ ] Search post
- [ ] Comments
- [ ] Form Errors
- [ ] UI
      
## License

This project is licensed under the MIT License.

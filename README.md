# Mode Collapse - Next.js Project

This is the repository for Mode Collapse, a website built with Next.js 15, React 19, and Tailwind CSS.

## Project Structure

```
modecollapse/
│
├── public/                   # Static assets (favicon, robots.txt, etc.)
│   └── images/               # Place all PNGs, JPEGs, SVGs here
│
├── src/                      # Source code
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable UI components 
│   ├── layouts/              # Page layouts (shared page wrappers)
│   ├── sections/             # Hero, Footer, Nav, etc.
│   ├── styles/               # Global CSS or Tailwind utilities
│   ├── lib/                  # Utility functions, API clients, helpers
│   ├── data/                 # Static JSON/TS data (testimonials, tools, etc.)
│   ├── config/               # Site config, SEO defaults, constants
│   ├── models/               # Database models
│   └── utils/                # Utility functions
│
├── content/                  # Markdown/MDX for blog, news, etc.
│
├── .env.local                # Local environment variables
├── .gitignore
├── next.config.ts
├── tailwind.config.js
├── postcss.config.mjs
├── tsconfig.json
├── vercel.json
├── package.json
└── README.md
```

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, copy .env.local.example to .env.local and fill in the required environment variables.

```bash
cp .env.local.example .env.local
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` - Set this to `https://www.modecollapse.io` for production

See .env.local.example for all required environment variables.

## Deployment

This project is deployed on Vercel.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

This project is licensed under the [MIT License](LICENSE).

## Chrome Extension

See the [chrome-extension](chrome-extension) folder for the Lesson Lifter extension source code.

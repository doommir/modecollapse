# Setting Up Admin Panel on Vercel

To enable the admin panel on your Vercel deployment, you need to configure environment variables in the Vercel dashboard.

## Required Environment Variables

Add the following environment variables in your Vercel project settings:

1. `NEXT_PUBLIC_ADMIN_USERNAME` - The username for the admin panel (e.g., `admin`)
2. `ADMIN_PASSWORD` - The password for the admin panel (use a strong password, not the default)

## Limitations

The admin panel on Vercel has some limitations:

1. **Read-only filesystem**: Vercel's production environment has a read-only filesystem, which means changes made to blog posts in the admin panel won't persist across deployments or serverless function invocations. The admin panel will work, but changes will only be visible until the serverless function is recycled.

## Future Improvements

For a production-ready admin panel, consider:

1. Implementing a database solution (MongoDB, PostgreSQL, Supabase, etc.) to store blog posts
2. Using a more secure authentication method (NextAuth.js, Auth0, Clerk, etc.)
3. Setting up a proper CMS like Contentful, Sanity, or Strapi

## Setting Up Environment Variables in Vercel

1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Select "Environment Variables" from the left sidebar
4. Add the required environment variables mentioned above
5. Deploy or redeploy your project 
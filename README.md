# Ticket Sample App

## Prerequisites

- Node.js & Yarn [Install Node.js](https://nodejs.org/en/download/)
- Docker & Docker Compose [Install Docker](https://docs.docker.com/get-docker/)
- Next.js [Install Next.js](https://nextjs.org/docs/getting-started)
- Prisma ORM [Install Prisma](https://www.prisma.io/docs/getting-started)
- Shadcn/ui [Install Shadcn/ui](https://ui.shadcn.com/docs/installation/next)

## Getting Started

Install Next.js on current project and replace the package manager with yarn:

```bash
npx create-next-app@latest .
rm -fr node_modules
rm package-lock.json
yarn
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Styling

Use [shadcn/ui](https://ui.shadcn.com/) for components and styles.

[Shadcn/ui Next.js Install](https://ui.shadcn.com/docs/installation/next): `npx shadcn-ui@0.4.1`

Init the project: `npx shadcn-ui init`

Pick a theme and replace `app/globals.css`: <https://ui.shadcn.com/themes>

Install button component: `npx shadcn-ui add button`

### Next.js Themes

Install Next.js dark mode themes: <https://ui.shadcn.com/docs/dark-mode/next>

Run: `yarn add next-themes`

Then create `components/theme-provider.tsx`

## Database & ORM

For application database we will use PostgreSQL and Prisma ORM.

On local development we will use Docker to run a PostgreSQL container.

Prisma ORM <https://www.prisma.io> will interface data into the application.

Add prisma to the project:

- `yarn add prisma --dev`
- `npx prisma init`

Shadcn/ui table component is used to display the data: `npx shadcn-ui add table`

## Schema Validation

In order to validate inputs we will use Zod package.

To install it, run: `yarn add zod`

## Form Handling

For form handling we will use React Hook Form.

To install it, run: `yarn add react-hook-form`

To use Zod with the hook form, install the zod resolver: `yarn add @hookform/resolvers`

To allow description markups in the form, install mde packages:

From <https://www.npmjs.com/package/react-simplemde-editor>

- `yarn add react-simplemde-editor --dev`
- `yarn add easymde --dev`

Also install the component library that are used in the form:

- `npx shadcn-ui add form`
- `npx shadcn-ui add input`
- `npx shadcn-ui add select`

For visualization we can use:

- Card component: `npx shadcn-ui add card`
- React Markdown: `yarn add react-markdown`
- Tailwind CSS for Markdown: `yarn add @tailwindcss/typography`

To delete we can use the alert dialog component: `npx shadcn-ui add alert-dialog`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

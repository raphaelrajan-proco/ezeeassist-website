This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Homepage Narrative Versions

- **v3 (current production, franchising agent):** `git checkout main` or `git checkout homepage-v3-franchising-agent`
- **v4 (platform narrative, in progress):** `git checkout platform-narrative-pass`

To fully abandon v4:

```bash
git checkout main
git branch -D platform-narrative-pass
git push origin --delete platform-narrative-pass
```

To merge v4 to production:

```bash
git checkout main
git merge platform-narrative-pass
git push origin main
```

## Design Versions

The site has two parallel design directions tracked in Git:

- **v1 — Bright SaaS (current production)**
  - Reference snapshot: `git checkout design-v1-bright-saas`
  - Production main: `git checkout main`
  - Documented at `docs/design-system-v1.md`
- **v2 — Editorial (in progress, Studio Morfar–inspired)**
  - Working branch: `git checkout design-editorial-pass`
  - Vercel auto-deploys this branch to a preview URL
  - Theme tokens live behind the `.theme-editorial` class in `app/globals.css`

### To fully revert v2 and abandon the editorial direction

```bash
git checkout main
git branch -D design-editorial-pass
git push origin --delete design-editorial-pass
```

### To merge v2 into production after approval

```bash
git checkout main
git merge design-editorial-pass
git push origin main
```

The v1 tokens are kept intact in `app/globals.css`, so even after a merge the
old design can be re-enabled by toggling the `theme-editorial` class off.



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

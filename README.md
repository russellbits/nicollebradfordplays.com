# Nicolle Bradford Plays

The web site for the domain [Nicollebradfordplays.com](https://nicollebradfordplays.com), a site with content from Nicolle Bradford, playwright.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

This will alow you to run the site locally and see changes.

## Building

To create a production version of the site:

```bash
npm run build
```

The adapter for a static site is in place in `/svelte.config.js`. The final static site will be in `/build` and the contents can be FTP'd to an Apache server.

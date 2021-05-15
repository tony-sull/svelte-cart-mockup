# svelte-cart-mockup

A shopping cart UI mocked up in [Svelte](https://svelte.dev).

A live demo of the current build is hosted on [Netlify](https://svelte-cart-mockup.netlify.app/)

See the [TODO](/TODO.md) file for a list of items that could/should be updated with more time.

## What Didn't Work

[SvelteKit](https://kit.svelte.dev)! 😂

They recently switched the configuration files from CommonJS to MJS. That makes sense since MJS is now native in Node 15, but it looked like it wasn't full ported over yet. Once I started hooking up the testing environment I was hitting errors related to using `require` in MJS modules. The call stack pointed back to `svelte.config.js` but it was all `import`s, I assume it's using something internal to SvelteKit that was still on CommonJS format.

## General Setup

`pnpm dev` to fire out the local dev server
`pnpm test` to run all tests
`pnpm build` to run a production build

I started with Svelte's [basic template](https://github.com/sveltejs/template), its a little outdate but after throwing out SvelteKit I didn't want to get stuck behind Sapper in a similar way.

Testing is all done with `Jest`, using `@testing-library/svelte` to help with UI testing.

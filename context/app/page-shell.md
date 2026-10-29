# Browser page shell

The deployable unit is a single-page Vite app with no framework.

```mermaid
flowchart LR
  html[index.html<br/>#app + module script] --> main[src/main.ts]
  main --> css[src/style.css]
  main --> assets[src/assets/*<br/>hero.png, typescript.svg, vite.svg]
  main --> counter[src/counter.ts<br/>setupCounter]
  main -. "<use href>" .-> pub[public/icons.svg]
  html -. favicon .-> fav[public/favicon.svg]
```

## Behavior

- `index.html` provides `<div id="app">` and loads `/src/main.ts` as an ES module.
- `src/main.ts` imports the stylesheet and image assets (Vite resolves them to URLs), then replaces
  `#app`'s `innerHTML` with a static template: a hero section, a counter button, and
  documentation/social link sections.
- Icons in the template reference SVG symbols in `public/icons.svg` by fragment
  (`/icons.svg#<name>-icon`); files in `public/` are served from the site root unprocessed.
- `setupCounter(button)` in `src/counter.ts` keeps a closure-local count, renders
  `Count is N`, and increments on click. State is in-memory only.

## Styling

`src/style.css` defines design tokens as CSS custom properties on `:root` (text, background, border,
accent, shadow, font stacks), overrides them under `prefers-color-scheme: dark`, and reduces the
base font size below 1024px width.

## Boundaries

The page shell does not use the [binary search](../search/binary-search.md) module.

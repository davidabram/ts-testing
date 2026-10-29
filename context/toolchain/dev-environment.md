# Development environment and build

## Toolchain

- `flake.nix` defines a Nix dev shell (`devShells.default`) providing `nodejs_24` and `pnpm` from
  `nixos-unstable`, for x86_64/aarch64 Linux and Darwin. `flake.lock` pins the nixpkgs revision.
- pnpm is the package manager (`pnpm-lock.yaml`).
- The package is private, ESM (`"type": "module"`), and has only dev dependencies:
  TypeScript, Vite, Vitest, fast-check.

## Scripts

| Script | Command | Purpose |
| --- | --- | --- |
| `dev` | `vite` | Dev server with HMR |
| `build` | `tsc && vite build` | Type-check, then bundle to `dist/` |
| `preview` | `vite preview` | Serve the built bundle |
| `test` / `test:ci` | `vitest` / `vitest run` | See [testing](testing.md) |

## TypeScript

`tsconfig.json` covers `src/` only and is type-check-only (`noEmit`); Vite does the bundling.

- Target and lib: ES2023 plus DOM; `vite/client` types.
- Bundler resolution with `allowImportingTsExtensions` (imports may end in `.ts`).
- `verbatimModuleSyntax` and `erasableSyntaxOnly`: type-only imports must use `import type`, and
  TypeScript-only runtime constructs such as enums and parameter properties are rejected.
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` are enforced.

There is no separate lint or format tool configured.

## Repository layout

The project lives at the repository root (`index.html`, `src/`, `public/`, config files).
`dist/` and `node_modules/` are ignored by Git.

# Testing

Tests run on Vitest, configured inside `vite.config.ts` (`test.include: ['src/**/*.test.ts']`).
Test files live next to the module they cover, named `<module>.test.ts`.

| Command | Behavior |
| --- | --- |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:ci` | Single non-interactive run (`vitest run`) |

## Unit plus property-based tests

A module's test file holds two `describe` blocks:

- **Unit tests** — concrete examples covering edge cases: empty input, single element, negative
  values, duplicates, first and last positions, absent targets below/inside/above the range.
- **Property-based tests** — `fast-check` properties, each run with an explicit `numRuns`
  (1000 for binary search). Properties state the contract directly: soundness, completeness,
  absence, and index bounds.

Generator conventions used in property tests:

- Keep the value range small (for example `-50..50`) so duplicates and target hits are frequent.
- Allow `minLength: 0` so empty inputs are generated.
- Draw the target slightly outside the value range so misses at both ends occur.
- Build "target present" cases by choosing the target from the generated array
  (`chain` + `constantFrom`) rather than filtering random targets.
- Use `fc.pre` to discard cases that do not meet a property's precondition.

Related: [binary search contract](../search/binary-search.md), [dev environment](dev-environment.md).

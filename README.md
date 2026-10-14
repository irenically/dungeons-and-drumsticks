# Chicken & Dragons — Roll for Flavor

Vite + React + TypeScript interactive fantasy marinade selector. Node.js is used to run Vite and build the front end; this is a static client-side app and does **not** require a Node.js API server.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite. Production build:

```bash
npm run build
npm run preview
```

## GitHub Pages

The app is published at https://irenically.github.io/dungeons-and-drumsticks/.
The deployment workflow builds and publishes automatically on every push to `main`.
In repository Settings → Pages, select **GitHub Actions** as the source.

## Code quality

Oxc provides linting with Oxlint and formatting with Oxfmt. Run these commands from `chicken-grimoire-react` after `npm install`:

```bash
npm run lint          # Check for lint errors and warnings
npm run lint:fix      # Apply automatic lint fixes
npm run format       # Format project files
npm run format:check # Check formatting without writing files
npm run check        # Run lint, formatting, and TypeScript checks
```

Settings live in `.oxlintrc.json` and `.oxfmtrc.json`. Generated files, dependencies, and public assets are excluded.

## Application files

- `src/App.tsx` — application state, roll and popup orchestration
- `src/components/Hero.tsx` — battlefield, chicken warriors, heading
- `src/components/D20.tsx` — interactive animated black/gold D20
- `src/components/Winner.tsx` — selected marinade display above the gallery
- `src/components/RecipeGrid.tsx` — filterable cards
- `src/components/RecipeModal.tsx` — accessible result modal
- `src/components/Primitives.tsx` — themed gold/red buttons, badge, scroll, decorative corners and dividers
- `src/data/recipes.ts` — typed demo recipe data, 20 entries
- `src/types.ts` — recipe model
- `src/styles.css` — original design system and motion
- `public/assets/` — the original supplied artwork, compressed as WebP

## Next improvements

Images for individual marinades are currently placeholders (the supplied site had only two roast illustrations); the recipes are demo ingredient lists without measured amounts. Replace before using for actual cooking. For individual images, add an `image` property to `Recipe` and use it in RecipeGrid/Winner/RecipeModal. Update CSS to suit your screens and expand the character positioning on very wide monitors. No backend or database is included.

## Design changes

Change colors under `:root` in `src/styles.css`. `FantasyButton` has `variant="red"` and `variant="gold"`. `MagicBadge` accepts any CSS color (`color="#45683d"`).

## Notes

This is a Vite migration of the previously provided HTML/CSS/JS prototype, not a new unrelated mockup. Dependencies could not be installed inside the generation environment due to npm network access restrictions, so a full `npm run build` was not verified here. Run the commands above locally to compile.

import type { Recipe } from '../types';
import { Corners, FantasyButton, Ornament } from './Primitives';
export function Winner({
  recipe,
  onOpen,
  flash,
}: {
  recipe: Recipe;
  onOpen: () => void;
  flash: number;
}) {
  return (
    <section
      className={`result-section container ${flash ? 'winner-flash' : ''}`}
      id="result"
      aria-live="polite"
      key={flash}
    >
      <Ornament />
      <div className="ribbon-heading">
        <span>THE D20 HAS SPOKEN!</span>
      </div>
      <article className="winner-frame">
        <div className="winner-spotlight" aria-hidden="true" />
        <div className="winner-illustration">
          <img src="/assets/roast-celebration.webp" alt="Illustrated roast chicken with herbs" />
        </div>
        <div className="winner-details">
          <div className="winner-level">✦ YOUR DESTINED MARINADE ✦</div>
          <div className="winner-number">D20 · {recipe.id}</div>
          <h2>{recipe.name.toUpperCase()}</h2>
          <p className="winner-tagline">{recipe.tagline}</p>
          <div className="fine-rule">✧ ─────────── ✧</div>
          <p className="winner-description">{recipe.description}</p>
          <FantasyButton onClick={onOpen}>VIEW FULL RECIPE ➜</FantasyButton>
        </div>
        <div className="winner-ingredients">
          <h3>THE INGREDIENTS</h3>
          <ul>
            {recipe.ingredients.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <Corners />
      </article>
      <p className="result-hint">
        Destiny has chosen recipe #{recipe.id}. Roll again to change your fate!
      </p>
    </section>
  );
}

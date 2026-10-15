import { useCallback, useEffect, useRef, useState } from 'react';
import { recipes } from './data/recipes';
import type { Recipe } from './types';
import { Hero } from './components/Hero';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
export default function App() {
  const [chosen, setChosen] = useState<Recipe | null>(null);
  const [dieValue, setDieValue] = useState(20);
  const [rolling, setRolling] = useState(false);
  const [modal, setModal] = useState<Recipe | null>(null);
  const [modalOrigin, setModalOrigin] = useState<'recipe' | 'roll'>('recipe');
  const rollingRef = useRef(false);
  const timeouts = useRef<number[]>([]);
  const roll = useCallback(() => {
    if (rollingRef.current) return;
    rollingRef.current = true;
    setRolling(true);
    const interval = window.setInterval(() => {
      setDieValue(1 + Math.floor(Math.random() * 20));
    }, 70);
    const timer = window.setTimeout(() => {
      window.clearInterval(interval);
      const result = recipes[Math.floor(Math.random() * recipes.length)];
      setDieValue(result.id);
      setChosen(result);
      setRolling(false);
      rollingRef.current = false;
      setModalOrigin('roll');
      setModal(result);
    }, 1550);
    timeouts.current.push(timer);
  }, []);
  useEffect(
    () => () => {
      timeouts.current.forEach(window.clearTimeout);
    },
    [],
  );
  return (
    <div className="page-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="Dungeons & Drumsticks home">
          <img className="brand-mark" src={`${import.meta.env.BASE_URL}assets/logo.png`} alt="" />
          <span>
            DUNGEONS <small>&</small>
            <br />
            DRUMSTICKS
          </span>
        </a>
        <nav className="top-links" aria-label="Main navigation">
          <a href="#marinades">The Marinade Grimoire</a>
        </nav>
      </header>
      <main id="top">
        <Hero value={dieValue} rolling={rolling} onRoll={roll} />
        <RecipeGrid
          chosen={chosen}
          onOpen={(recipe) => {
            setModalOrigin('recipe');
            setModal(recipe);
          }}
        />
        <section className="grimoire-ending container" id="how" aria-labelledby="ending-title">
          <img
            className="ending-divider"
            src={`${import.meta.env.BASE_URL}assets/Watercolor Ruby Ornamental Divider.png`}
            alt=""
            aria-hidden="true"
          />
          <p className="ending-kicker">The final page</p>
          <h2 id="ending-title">Here Ends the Grimoire</h2>
          <p className="ending-copy">Twenty recipes discovered. Not a single dragon slain.</p>
          <p className="ending-copy">The chickens, however, have concerns.</p>
          <img
            className="ending-book"
            src={`${import.meta.env.BASE_URL}assets/grimoire.png`}
            alt="A leather-bound chicken grimoire with a quill and scattered herbs"
            loading="lazy"
          />
        </section>
      </main>
      <footer className="grimoire-footer">
        <div className="container">
          <a className="footer-brand" href="#top">
            <img
              className="footer-brand-mark"
              src={`${import.meta.env.BASE_URL}assets/logo.png`}
              alt=""
            />
            <span>
              <span className="footer-brand-name">
                Dungeons &amp;
                <br />
                Drumsticks
              </span>
              <span className="footer-tagline">Good chicken leads to great quests.</span>
            </span>
          </a>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} &middot; The Culinary Adventurers&rsquo; Guild</p>
            <nav aria-label="Footer navigation">
              <a href="#quest">The Quest</a>
              <a href="#marinades">The Marinade Grimoire</a>
              <a href="https://github.com/irenically/dungeons-and-drumsticks">GitHub</a>
            </nav>
            <p className="footer-credit">
              Crafted with magic, questionable judgment,
              <br />
              and a little paprika.
            </p>
          </div>
        </div>
      </footer>
      <RecipeModal recipe={modal} origin={modalOrigin} onClose={() => setModal(null)} />
    </div>
  );
}

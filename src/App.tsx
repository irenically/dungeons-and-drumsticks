import { Icon } from './components/Icon';
import { useCallback, useEffect, useRef, useState } from 'react';
import { recipes } from './data/recipes';
import type { Recipe } from './types';
import { Hero } from './components/Hero';
import { RecipeGrid } from './components/RecipeGrid';
import { RecipeModal } from './components/RecipeModal';
import { Ornament } from './components/Primitives';
export default function App() {
  const [chosen, setChosen] = useState<Recipe | null>(null);
  const [dieValue, setDieValue] = useState(20);
  const [rolling, setRolling] = useState(false);
  const [modal, setModal] = useState<Recipe | null>(null);
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
          <a href="#how">THE QUEST</a>
          <a href="#marinades">MARINADES</a>
        </nav>
        <div className="nav-sigil" aria-hidden="true">
          <Icon name="sparkle" />
        </div>
      </header>
      <main id="top">
        <Hero value={dieValue} rolling={rolling} onRoll={roll} />
        <RecipeGrid chosen={chosen} onOpen={setModal} />
        <section className="how-section container" id="how">
          <Ornament elongated />
          <h2 className="section-title">A FEAST WRITTEN IN THE STARS</h2>
          <div className="how-grid">
            <div>
              <span className="how-icon">
                <Icon name="swords" />
              </span>
              <h3>GATHER THE PARTY</h3>
              <p>Summon your appetite and assemble your ingredients.</p>
            </div>
            <div>
              <span className="how-icon">
                <Icon name="dice" />
              </span>
              <h3>ROLL FOR DESTINY</h3>
              <p>Let a magical D20 choose tonight's legendary marinade.</p>
            </div>
            <div>
              <span className="how-icon">
                <Icon name="star" />
              </span>
              <h3>CLAIM YOUR REWARD</h3>
              <p>Follow the recipe and win a delicious encounter.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Icon name="swords" /> &nbsp; DUNGEONS & DRUMSTICKS &nbsp; <Icon name="swords" />
          </div>
          <p>GOOD CHICKEN LEADS TO GREAT QUESTS.</p>
          <span>
            <Icon name="star" /> CRAFTED WITH MAGIC & A LITTLE PAPRIKA <Icon name="star" />
          </span>
        </div>
      </footer>
      <RecipeModal recipe={modal} onClose={() => setModal(null)} />
    </div>
  );
}

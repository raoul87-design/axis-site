function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-row">
        <a href="#" className="wm grad nav-wm">axis</a>
        <nav className="nav-links">
          <a href="#ventures" className="mono">Ventures</a>
          <a href="#model" className="mono">Model</a>
          <a href="#studio" className="mono">Studio</a>
          <a href="#contact" className="mono">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-mesh" aria-hidden="true" />
      <div className="wrap hero-inner">
        <p className="mono">Venture studio · Twente, NL</p>
        <h1 className="display display-hero hero-h1">
          Een studio die platformen <em className="grad">bouwt én verkoopt.</em>
        </h1>
        <p className="hero-sub">
          Axis ontwikkelt AI-gedreven platformen. Niet alleen de software — ook de positionering,
          de pricing en de eerste betalende klanten. Want een product zonder commercie is een hobby.
        </p>
      </div>
    </section>
  )
}

function Ventures() {
  return (
    <section id="ventures" className="section">
      <div className="wrap">
        <p className="mono section-label">Ventures</p>
        <div className="ventures">
          <article className="venture venture-stayd">
            <div className="venture-visual venture-visual-stayd" aria-hidden="true">
              <span className="mono visual-note">visual volgt — asset van Raoul</span>
            </div>
            <div className="venture-body">
              <p className="display venture-name">
                stayd<span style={{ color: "var(--stayd)" }}>.</span>
              </p>
              <p className="mono venture-status" style={{ color: "var(--stayd)" }}>Live · eigen product</p>
              <p className="venture-desc">
                Dagelijkse accountability voor personal trainers en hun klanten. Een coach maakt het
                plan, stayd. zorgt via WhatsApp dat de klant het uitvoert. Live sinds 2026.
              </p>
              <a href="https://stayd.nl" target="_blank" rel="noopener noreferrer" className="venture-link venture-link-stayd">
                stayd.nl <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>

          <article className="venture venture-switch">
            <div className="venture-visual venture-visual-switch" aria-hidden="true">
              <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
                <g fill="none" stroke="var(--switch)" strokeWidth="1">
                  <rect x="24" y="24" width="152" height="152" opacity="0.25" />
                  <rect x="24" y="24" width="76" height="76" opacity="0.4" />
                  <rect x="100" y="100" width="76" height="76" opacity="0.4" />
                  <circle cx="100" cy="100" r="46" opacity="0.55" />
                  <line x1="24" y1="176" x2="176" y2="24" opacity="0.3" />
                </g>
              </svg>
            </div>
            <div className="venture-body">
              <p className="mono venture-status" style={{ color: "var(--switch)" }}>In aanbouw</p>
              <p className="venture-desc">
                Een platform in aanbouw, samen met een co-founder. Meer volgt zodra er iets te laten
                zien is.
              </p>
            </div>
          </article>
        </div>
        <p className="mono ventures-more">Meer ventures in ontwikkeling.</p>
      </div>
    </section>
  )
}

function Model() {
  const cols = [
    { n: "i", title: "Bouwen", body: "Een werkend product in weken, niet kwartalen. Geen roadmap-theater — bouwen wat nodig is om te testen of het klopt." },
    { n: "ii", title: "Lanceren", body: "De eerste betalende klant is het bewijs, niet een pilot of een intentieverklaring. Zonder omzet is er geen validatie." },
    { n: "iii", title: "Partneren", body: "Voor elk domein een partner die het kent. Wij brengen de bouw en de snelheid, zij de kennis van de markt." },
  ]
  return (
    <section id="model" className="section">
      <div className="wrap">
        <p className="mono section-label">Model</p>
        <p className="display display-statement model-statement">
          Wij bouwen in weken, lanceren met de eerste betalende klant als bewijs, en partneren met
          wie het domein kent.
        </p>
        <div className="model-cols">
          {cols.map(c => (
            <div key={c.n} className="model-col">
              <p className="mono model-col-n">{c.n}</p>
              <p className="display display-md model-col-title">{c.title}</p>
              <p className="model-col-body">{c.body}</p>
            </div>
          ))}
        </div>
        <p className="model-fineprint">
          IP bij de studio, licentie naar de venture, vergoeding in equity plus dagtarief,
          gelijkgerichte belangen.
        </p>
      </div>
    </section>
  )
}

function Studio() {
  const facts = [
    { k: "Basis", v: "Twente, NL" },
    { k: "Achtergrond", v: "Commercieel leiderschap, snijvlak business & technologie" },
    { k: "Stack", v: "—" },
    { k: "Entiteit", v: "Eenmanszaak · KvK 42061969" },
  ]
  return (
    <section id="studio" className="section studio">
      <div className="wrap studio-grid">
        <p className="display display-statement studio-statement">
          Vijftien jaar commercieel leiderschap op het snijvlak van business en technologie —
          bouwen en verkopen zijn voor mij nooit twee aparte vakken geweest.
        </p>
        <dl className="studio-facts">
          {facts.map(f => (
            <div key={f.k} className="studio-fact">
              <dt className="mono">{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="wrap">
        <a href="mailto:raoul@axisapp.nl" className="display display-hero contact-cta">
          <em>Iets bouwen? →</em>
        </a>
        <p className="mono contact-address">raoul@axisapp.nl</p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <span className="wm grad footer-wm">axis</span>
        <p className="mono">Axis App · KvK 42061969 · axisapp.nl</p>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ventures />
        <Model />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

import { useEffect, useState } from 'react'
import './App.css'

/* Reusable premium divider between sections */
const SectionDivider = () => (
  <div className="section-divider reveal">
    <div className="divider-line"></div>
  </div>
)

function App() {
  const [scrolled, setScrolled] = useState(false)

  const portfolioItems = [
    {
      id: 1,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/656112131_18033573989618595_2362181092256567325_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=110&ig_cache_key=Mzg2MDc4OTUwNjI0OTc5OTg5OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTc5OS5zZHIuQzMifQ%3D%3D&_nc_ohc=qE10xGFyONoQ7kNvwFAO-kP&_nc_oc=AdqW-J40fJhsqBtIxr8lvDtdG8w9k_GHvgz5FWAURR4dLu86aVoTKW7dbWBwJldlF1E&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_AfxaacrBPF90okpaBDVbm0g9CrFIuA5nitG93cPU8d-u5Q&oe=69D116C9",
      category: "Celebration",
      title: "Soulful Union"
    },
    {
      id: 2,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/656278097_18033455249618595_1069653530288292807_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=111&ig_cache_key=Mzg2MDQyMjg1NDA0MzYxNTQ2Nw%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=NWh3gswHKOIQ7kNvwErVPmV&_nc_oc=AdozzaWdCgRyfBzwtY_x-R7IG8Txp8B3aVt4u5fW3tovA7yKN5Phj96kpYE0B4Ea45o&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_AfzpTR1aj30PC2iHCHadJRH-PsPssaqfp6e_hjDK3U3ikQ&oe=69D12AC2",
      category: "Portrait",
      title: "The Gilded Hour"
    },
    {
      id: 3,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/658026969_18033341207618595_8327275794520394152_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzg2MDA0NzUwNjk1MjU0ODU1OA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=J65JZ1nQcBsQ7kNvwF0yoml&_nc_oc=AdphTj1Zm51pvZYqCfOIXOBv6IGAxohN4l97nwBpx3n82-WLZ268L8fMueUlS30bj_c&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_AfyGKV3Nc8i-EnIJhTg71W8dItYGTTJww-zUexUCVluXPQ&oe=69D1436C",
      category: "Cinematic",
      title: "Timeless Ties"
    },
    {
      id: 4,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/656238254_18033330251618595_385906814367038031_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=107&ig_cache_key=Mzg2MDAyIzAxNjQ4Njk5MDgwMA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=Oor8cRo7pJMQ7kNvwHj1vo3&_nc_oc=AdpewVqYgL-BhBN7BGdh8MdQ1N9-sY3HV4WjqFQSNkgAkO5_mWk4XpAOa6q8wOFMfgk&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_Afy8B5i82nodAMZShOqGsA1SzEqg-Jm6ycHmqQb8VzfCkg&oe=69D11DA4",
      category: "Emotion",
      title: "Silent Promises"
    },
    {
      id: 5,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/641216428_18028688480618595_1205730862304373334_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=108&ig_cache_key=Mzg0NDEwNDEwNDAwMDU0Mjc2NQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=XU9zUDNDmwgQ7kNvwGBZjNV&_nc_oc=AdqAUBf2iRbpVcD16qCkvRw_fIZMJrRARCa6MBSIRi49Car8Q6pOwmZLcsJc5-D9I1w&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_AfwoOv5Km5w--Arj8tPPWzp-5EBsxn1lJ8q3HK9h7je_gw&oe=69D135BF",
      category: "Culture",
      title: "Heritage Heart"
    },
    {
      id: 6,
      src: "https://instagram.fcok11-1.fna.fbcdn.net/v/t51.82787-15/639727183_18027550325618595_199660014776466710_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=103&ig_cache_key=Mzg0MTE4OTQ3MzA3Mzg0NzIzOQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=xquDpN35ie0Q7kNvwGj7Udx&_nc_oc=AdqwCM0NHdkIPSKso9eOWeur4QDlvA1iJwkRWai8xEORyefCHTn7wQItFqZ2XWlFXG8&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fcok11-1.fna&_nc_gid=go5auNfNPaXjuLfoBpqyKA&_nc_ss=7a32e&oh=00_AfzVgHeHSwsYIJwAHcBgV8Hsg3RIBiOjr9x__doLlXd8_A&oe=69D135F9",
      category: "Details",
      title: "Grace in Motion"
    }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Parallax effect for hero
      const heroBg = document.querySelector('.hero-bg img')
      if (heroBg) {
        const scrollValue = window.scrollY
        heroBg.style.transform = `scale(${1.1 + scrollValue * 0.0005}) translateY(${scrollValue * 0.1}px)`
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
    )

    const hiddenElements = document.querySelectorAll('.reveal, .mask-reveal')
    hiddenElements.forEach((el) => observer.observe(el))

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      hiddenElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo-container">
          <a href="#home" className="logo-link">
            <img src="/nav logo.png" alt="Aurem Logo" className="navbar-logo-img" />
            <img src="/nav name.png" alt="Aurem Weddings" className="navbar-name-img" />
          </a>
        </div>
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">Philosophy</a>
          <a href="#portfolio">Narratives</a>
          <a href="#contact">Inquire</a>
        </nav>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="home" className="hero">
          <div className="hero-bg">
            <img src="/hero.jpg" alt="Aurem Weddings — Bonded" />
          </div>
          <div className="hero-overlay"></div>

          <div className="hero-content reveal">
            <img src="/logo.png" alt="Aurem Weddings Logo" className="hero-logo-img fade-in" />
            <span className="hero-subtitle">
              <span className="highlight-text">Directed by Emotion</span>
              <br />
              <span className="hero-subtitle-sub">Cinematic Legacies</span>
            </span>
          </div>

          <div className="scroll-indicator reveal reveal-delay-2">
            <span className="scroll-text">Scroll</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <SectionDivider />

        {/* ABOUT / PHILOSOPHY SECTION */}
        <section id="about" className="section">
          <div className="about-grid">
            <div className="section-header reveal">
              <span className="section-label">
                <span className="section-num">01</span> Our Philosophy
              </span>
              <h2 className="section-title">We don't record events; we craft <em>cinematic legacies</em>.</h2>
            </div>
            <div className="premium-box reveal reveal-delay-1">
              <p className="about-text">
                By blending raw, unscripted emotion with high-end, editorial aesthetics,
                we create timeless art that speaks directly to the soul.
                Based in major hubs—available worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <SectionDivider />

        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="section">
          <div className="section-header reveal">
            <span className="section-label">
              <span className="section-num">02</span> Portfolios
            </span>
            <h2 className="section-title">Visual Narratives</h2>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div
                key={item.id}
                className={`portfolio-item reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className="item-wrapper mask-reveal">
                  <img src={item.src} alt={item.title} loading="lazy" />
                </div>
                <div className="item-info">
                  <span className="item-category">{item.category}</span>
                  <h3 className="item-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <SectionDivider />
      </main>

      {/* FOOTER / INQUIRE */}
      <footer id="contact" className="footer">
        <div className="footer-cta-card reveal">
          <span className="section-label">
            <span className="section-num">03</span> Inquire
          </span>
          <h2>Let's Create<br /><em>Something Magic</em></h2>
          <p className="footer-cta-desc">
            Currently accepting limited bookings for 2025 & 2026.
            Each bespoke film is curated with obsessive attention to detail.
          </p>
          <a href="mailto:hello@auremweddings.com" className="btn-premium">Inquire Now</a>
        </div>

        <div className="footer-bottom reveal reveal-delay-2">
          <p>&copy; {new Date().getFullYear()} Aurem Weddings. All Rights Reserved.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/auremweddings" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#">Vimeo</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

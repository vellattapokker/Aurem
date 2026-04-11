import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'
import './App.css'

// ═══════════════════════════════════════════
// DATA DEFINITIONS
// ═══════════════════════════════════════════
const STORIES_DATA = [
  { 
    id: "modern-noir", 
    title: "Selection 01: Modern Noir", 
    cover: "/assets/IMG_5853.JPG",
    description: "A high-fashion narrative set against the golden pulse of the night city.",
    moments: [
      { name: "The Evening Pulse", images: ["/assets/IMG_5853.JPG", "/assets/IMG_5849.JPG"] },
      { name: "City Shadows", images: ["/assets/IMG_5850.JPG", "/assets/IMG_6254.JPG"] },
      { name: "Noir Reflections", images: ["/assets/IMG_6263.JPG", "/assets/IMG_6464.JPG"] }
    ]
  },
  { 
    id: "moody-monochrome", 
    title: "Selection 02: Moody Monochrome", 
    cover: "/assets/IMG_7212.JPEG",
    description: "A dramatic, high-contrast exploration of raw emotion and timeless silence.",
    moments: [
      { name: "The Sacred Space", images: ["/assets/IMG_7212.JPEG", "/assets/IMG_7213.JPEG"] },
      { name: "Silent Echoes", images: ["/assets/IMG_7215.JPEG", "/assets/IMG_7216.JPEG"] },
      { name: "Timeless Frames", images: ["/assets/IMG_7217.JPEG", "/assets/IMG_7221.JPEG"] }
    ]
  },
  { 
    id: "ethereal-light", 
    title: "Selection 03: Ethereal Light", 
    cover: "/assets/IMG_7146.JPG",
    description: "Soft pastel morning light and romantic fine-art aesthetics.",
    moments: [
      { name: "The Morning Glow", images: ["/assets/IMG_7146.JPG", "/assets/IMG_7150.JPG"] },
      { name: "Soft Whispers", images: ["/assets/IMG_7154.JPG", "/assets/IMG_7159.JPG"] },
      { name: "Coastal Haze", images: ["/assets/IMG_7160.JPG", "/assets/IMG_7161.JPG"] }
    ]
  },
  { 
    id: "malabar-union", 
    title: "Selection 04: The Malabar Union", 
    cover: "/assets/IMG_6373.JPG",
    description: "A cinematic documentary of a traditional union, told with warmth and soul.",
    moments: [
      { name: "The Rituals", images: ["/assets/IMG_6373.JPG", "/assets/IMG_6374.JPG"] },
      { name: "The Union", images: ["/assets/IMG_6375.JPG", "/assets/IMG_6376.JPG"] },
      { name: "Heritage", images: ["/assets/IMG_6377.JPG", "/assets/IMG_6378.JPG"] }
    ]
  }
]

const FEATURED_FILMS = [
  {
    id: 1,
    title: "The Golden Hour",
    category: "Cinematic Film",
    src: "/assets/IMG_6219.JPEG",
    desc: "An epic narrative of love and legacy, crafted with a cinematic eye for detail and emotion."
  },
  {
    id: 2,
    title: "Soulful Whispers",
    category: "Highlights Film",
    src: "/assets/IMG_6213.JPEG",
    desc: "Capturing the unspoken moments and raw energy that make every union unique and timeless."
  }
]

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const Navbar = ({ scrolled, menuOpen, toggleMenu }) => (
  <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'hidden' : ''}`}>
    <nav className="nav-container">
      <div className="nav-group left">
        <Link to="/#about">About</Link>
        <Link to="/#stories">Stories</Link>
      </div>
      
      <Link to="/" className="logo-link">
        <img src="/assets/nav%20logo.png" alt="Aurem Logo" className="navbar-logo-img" />
        <img src="/assets/nav%20name.png" alt="Aurem Weddings" className="navbar-name-img" />
      </Link>
      
      <div className="nav-group right">
        <Link to="/#films">Films</Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <div className="burger">
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </button>
      </div>
    </nav>
  </header>
)

const Footer = () => (
  <footer id="contact" className="footer">
     <div className="footer-stack">
        <div className="footer-socials">
           <a href="https://www.instagram.com/auremweddings" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
        <nav className="footer-nav">
           <Link to="/">Home</Link>
           <Link to="/#about">Philosophy</Link>
           <Link to="/#stories">Stories</Link>
           <Link to="/#films">Films</Link>
        </nav>
        <div className="footer-copyright">
           <p>Based in Ernakulam, Kerala</p>
           <p>All content Copyright &copy; {new Date().getFullYear()} Aurem Weddings</p>
        </div>
        <button className="back-to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
           <span className="arrow">&uarr;</span>
        </button>
     </div>
  </footer>
)

const Lightbox = ({ open, images, index, close, next, prev }) => (
  <div className={`lightbox ${open ? 'open' : ''}`} onClick={close}>
    <div className="lightbox-controls">
       <button className="lb-close" onClick={close}>&times;</button>
       <div className="lb-counter">
          {(index + 1).toString().padStart(2, '0')} / {images.length.toString().padStart(2, '0')}
       </div>
    </div>
    <button className="lb-prev" onClick={prev}>&lsaquo;</button>
    <button className="lb-next" onClick={next}>&rsaquo;</button>
    <div className="lb-stage">
      {images.map((img, idx) => (
        <img key={idx} src={img} className={`lb-img ${idx === index ? 'active' : ''}`} alt="" />
      ))}
    </div>
  </div>
)

// ═══════════════════════════════════════════
// PAGE COMPONENTS
// ═══════════════════════════════════════════

const HomePage = ({ activeHero, storySlideIndex, openGallery }) => (
  <main>
    {/* HERO */}
    <section id="home" className="hero-container">
      <div className="hero-slider">
        {["/assets/IMG_0213.JPG", "/assets/IMG_7152.JPG", "/assets/IMG_6219.JPEG"].map((img, i) => (
          <div key={i} className={`hero-slide ${i === activeHero ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }}></div>
        ))}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Timeless Stories <em>Told with Soul</em></h1>
        </div>
      </div>
    </section>

    {/* INTRO */}
    <section id="about" className="section intro">
      <div className="container-sm">
         <h2 className="editorial-title">A Narrative of Love, <em>Told with Soul</em></h2>
         <div className="brand-story">
           <p>At Aurem, we capture the unscripted whispers of your union. Our philosophy is rooted in raw energy and raw emotion that make every story unique.</p>
           <p>Using cinematic storytelling and editorial aesthetics, we allow you to relive the soul of your wedding day, forever.</p>
           <div className="editorial-divider"></div>
         </div>
      </div>
    </section>

    {/* FILMS */}
    <section id="films" className="section films-section">
       <div className="section-header">
          <span className="label">Cinematography</span>
          <h2 className="title">The Films</h2>
       </div>
       <div className="films-grid">
          {FEATURED_FILMS.map((film, index) => (
            <div key={film.id} className={`film-row ${index % 2 !== 0 ? 'reverse' : ''}`}>
               <div className="film-media story-img-wrap" onClick={() => openGallery([film.src])}>
                  <img src={film.src} alt={film.title} className="active" />
                  <div className="play-btn"></div>
               </div>
               <div className="film-info">
                  <span className="cat">{film.category}</span>
                  <h3 className="film-title">{film.title}</h3>
                  <p className="film-desc">{film.desc}</p>
                  <button className="link-arrow" onClick={() => openGallery([film.src])}>View Film Stage</button>
               </div>
            </div>
          ))}
       </div>
    </section>

    {/* STORIES */}
    <section id="stories" className="section stories-section">
       <div className="section-header">
          <span className="label">Photography</span>
          <h2 className="title">Every Photo Tells a Story</h2>
       </div>
       <div className="stories-grid">
          {STORIES_DATA.map(story => (
            <Link to={`/album/${story.id}`} key={story.id} className="story-card">
               <div className="story-img-wrap">
                  {story.moments[0].images.map((img, idx) => (
                    <img key={idx} src={img} alt="" className={idx === (storySlideIndex % story.moments[0].images.length) ? 'active' : ''} />
                  ))}
               </div>
               <div className="story-details">
                  <h4 className="story-title">{story.title}</h4>
                  <span className="story-link">View Album</span>
               </div>
            </Link>
          ))}
       </div>
    </section>

    {/* MARQUEE */}
    <section className="section insta-row">
       <div className="marquee-container">
          <div className="marquee-track">
            {["/assets/IMG_6381.JPG", "/assets/IMG_6382.JPG", "/assets/IMG_6383.JPG", "/assets/IMG_6384.JPG", "/assets/IMG_6385.JPG", "/assets/IMG_6386.JPG", "/assets/IMG_6381.JPG", "/assets/IMG_6382.JPG"].map((img, i) => (
              <div key={i} className="insta-box"><img src={img} alt="" /></div>
            ))}
          </div>
       </div>
       <div className="insta-footer"><a href="#">@auremweddings</a></div>
    </section>
  </main>
)

const AlbumPage = () => {
  const { id } = useParams()
  const album = STORIES_DATA.find(s => s.id === id)

  if (!album) return <div className="error-page">Album not found.</div>

  return (
    <div className="album-page-container">
      {/* ALBUM HERO */}
      <section className="album-hero">
         <div className="album-hero-img" style={{ backgroundImage: `url(${album.cover})` }}></div>
         <div className="album-hero-content">
            <span className="album-cat">Marriage Album</span>
            <h1 className="album-main-title">{album.title}</h1>
            <p className="album-intro-text">{album.description}</p>
         </div>
      </section>

      {/* ALBUM SPREADS */}
      <div className="album-content">
         {album.moments.map((moment, mIdx) => (
           <div key={mIdx} className="album-moment">
              <div className="moment-header">
                 <div className="moment-line"></div>
                 <h2 className="moment-title">{moment.name}</h2>
                 <div className="moment-line"></div>
              </div>

              <div className="album-spread">
                 {/* Design: Spreads alternate between 2-up and large solo portraits */}
                 {mIdx % 2 === 0 ? (
                    <div className="spread-paired">
                       {moment.images.map((img, i) => (
                         <div key={i} className="album-photo-frame">
                            <img src={img} alt="" className="album-photo" />
                         </div>
                       ))}
                    </div>
                 ) : (
                    <div className="spread-solo">
                       <div className="album-photo-frame large">
                          <img src={moment.images[0]} alt="" className="album-photo" />
                       </div>
                    </div>
                 )}
              </div>
           </div>
         ))}
      </div>

      {/* ALBUM FOOTER */}
      <section className="album-navigation">
         <Link to="/#stories" className="back-link">Back to Collections</Link>
         <div className="next-album-cta">
            <span>Next Story</span>
            <Link to={`/album/${STORIES_DATA[(STORIES_DATA.indexOf(album) + 1) % STORIES_DATA.length].id}`} className="next-title">
               {STORIES_DATA[(STORIES_DATA.indexOf(album) + 1) % STORIES_DATA.length].title}
            </Link>
         </div>
      </section>
    </div>
  )
}

// ═══════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeHero, setActiveHero] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredMnu, setHoveredMnu] = useState(null)
  const [storySlideIndex, setStorySlideIndex] = useState(0)
  
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState([])
  const [galleryIndex, setGalleryIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    const heroTimer = setInterval(() => setActiveHero((p) => (p + 1) % 3), 5000)
    const storyTimer = setInterval(() => setStorySlideIndex((p) => p + 1), 4500)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(heroTimer); clearInterval(storyTimer)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = (menuOpen || galleryOpen) ? 'hidden' : 'unset'
  }, [menuOpen, galleryOpen])

  const toggleMenu = () => { setMenuOpen(!menuOpen); setHoveredMnu(null); }
  const openGallery = (imgs, index = 0) => { setGalleryImages(imgs); setGalleryIndex(index); setGalleryOpen(true); }
  const closeGallery = () => setGalleryOpen(false)
  const nextImage = (e) => { e.stopPropagation(); setGalleryIndex(p => (p + 1) % galleryImages.length); }
  const prevImage = (e) => { e.stopPropagation(); setGalleryIndex(p => (p - 1 + galleryImages.length) % galleryImages.length); }

  const MENU_ASSETS = {
    "Home": "/assets/IMG_0213.JPG",
    "Philosophy": "/assets/IMG_7152.JPG",
    "Stories": "/assets/IMG_5853.JPG",
    "Films": "/assets/IMG_6219.JPEG",
    "Inquire": "/assets/IMG_6381.JPG"
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className={`app ${menuOpen ? 'menu-active' : ''}`}>
        <Navbar scrolled={scrolled} menuOpen={menuOpen} toggleMenu={toggleMenu} />
        
        {/* CINEMATIC PORTAL MENU */}
        <div className={`menu-overlay ${menuOpen ? 'open' : ''}`}>
          {/* Background Peek Layer */}
          <div className="menu-bg-peeks">
            {Object.entries(MENU_ASSETS).map(([name, url]) => (
              <div 
                key={name} 
                className={`menu-bg-img ${hoveredMnu === name ? 'active' : ''}`} 
                style={{ backgroundImage: `url(${url})` }}
              ></div>
            ))}
          </div>

          <button className="menu-close" onClick={toggleMenu}><div className="close-icon"></div><span>CLOSE</span></button>
          
          <div className="menu-content-grid">
            <div className="menu-nav-col">
              <nav className="menu-nav">
                 {Object.keys(MENU_ASSETS).map((name, i) => {
                   let target = "/";
                   if (name === "Philosophy") target = "/#about";
                   else if (name === "Stories") target = "/#stories";
                   else if (name === "Films") target = "/#films";
                   else if (name === "Inquire") target = "/#contact";

                   return (
                     <Link 
                      key={name}
                      to={target} 
                      onClick={toggleMenu} 
                      onMouseEnter={() => setHoveredMnu(name)}
                      onMouseLeave={() => setHoveredMnu(null)}
                      style={{"--i": i + 1}}
                     >
                       {name}
                     </Link>
                   )
                 })}
              </nav>
            </div>

            <div className="menu-detail-col">
               <div className="menu-brand-details">
                  <div className="detail-item" style={{"--i": 6}}>
                    <span className="label">Based in</span>
                    <span className="value">Ernakulam, Kerala</span>
                  </div>
                  <div className="detail-item" style={{"--i": 7}}>
                    <span className="label">Social</span>
                    <a href="https://www.instagram.com/auremweddings" target="_blank" rel="noopener noreferrer" className="value">Instagram</a>
                  </div>
                  <div className="detail-item" style={{"--i": 8}}>
                    <span className="label">Philosophy</span>
                    <p className="value-para">Directed by Emotion. Captured with Heart. Timeless stories told with soul.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <Lightbox open={galleryOpen} images={galleryImages} index={galleryIndex} close={closeGallery} next={nextImage} prev={prevImage} />

        <Routes>
          <Route path="/" element={<HomePage activeHero={activeHero} storySlideIndex={storySlideIndex} openGallery={openGallery} />} />
          <Route path="/album/:id" element={<AlbumPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

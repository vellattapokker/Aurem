import { useEffect, useState, useRef } from 'react'
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'
import './App.css'

// ═══════════════════════════════════════════
// INITIAL PLACEHOLDER DATA
// ═══════════════════════════════════════════
const INITIAL_DATA = {
  hero: ["/assets/IMG_0213.JPG"],
  films: [],
  stories: [],
  gallery: []
};

// ═══════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => { 
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo(0, 0); 
    }
  }, [pathname, hash]);
  return null;
}

const Navbar = ({ scrolled, menuOpen, toggleMenu }) => (
  <header className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'hidden' : ''}`}>
    <nav className="nav-container">
      <div className="nav-group left">
      </div>
      
      <Link to="/" className="logo-link">
        <img src="/assets/nav%20logo.png" alt="Aurem Logo" className="navbar-logo-img" />
        <img src="/assets/nav%20name.png" alt="Aurem Weddings" className="navbar-name-img" />
      </Link>
      
      <div className="nav-group right">
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
     {/* Typographic Watermark */}
     <div className="footer-watermark">AUREM</div>

     <div className="footer-container">
        <div className="footer-grid">
           {/* Navigation */}
           <div className="footer-col">
              <span className="col-label">Navigation</span>
              <nav className="footer-links">
                 <Link to="/">Home</Link>
                 <Link to="/#about">Philosophy</Link>
                 <Link to="/#stories">Stories</Link>
                 <Link to="/#gallery">Archive</Link>
                 <Link to="/#films">Films</Link>
              </nav>
           </div>

           {/* Studio Context */}
           <div className="footer-col">
              <span className="col-label">Studio</span>
              <div className="footer-context">
                 <p>Based in Ernakulam, Kerala</p>
                 <p>Available for unions worldwide.</p>
              </div>
           </div>

           {/* Connect & Inquiry */}
           <div className="footer-col">
              <span className="col-label">Connect</span>
              <div className="footer-actions">
                 <a href="https://www.instagram.com/auremweddings" target="_blank" rel="noopener noreferrer">Instagram</a>
                 <a href="mailto:auremweddings@gmail.com" className="cta-inquiry">Book a Consultation</a>
              </div>
           </div>
        </div>

        <div className="footer-bottom">
           <div className="footer-copyright">
              <p>&copy; {new Date().getFullYear()} Aurem Weddings. Directed by Emotion.</p>
           </div>
           <button className="back-to-top-circle" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <span className="arrow">&uarr;</span>
           </button>
        </div>
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

const Gallery = ({ images, openGallery }) => (
  <section id="gallery" className="section gallery-section">
     <div className="section-header">
        <span className="label">The Archive</span>
        <h2 className="title">Captured Moments</h2>
     </div>
     <div className="balanced-gallery-grid">
        {images.slice(0, 5).map((img, i) => {
          const isLastVisible = i === 4;
          const hasMore = images.length > 5;
          const remaining = images.length - 5;
          
          return (
            <div key={i} className="gallery-item" onClick={() => openGallery(images, i)}>
              <img src={img} alt={`Gallery ${i}`} loading="eager" />
              <div className={`gallery-overlay ${isLastVisible && hasMore ? 'has-more' : ''}`}>
                 {isLastVisible && hasMore ? (
                   <span className="more-text">+{remaining}</span>
                 ) : (
                   <span className="view-text">View Image</span>
                 )}
              </div>
            </div>
          )
        })}
     </div>
  </section>
)



const HomePage = ({ data, activeHero, storySlideIndex, openGallery }) => (
  <main>
    {/* HERO */}
    <section id="home" className="hero-container">
      <div className="hero-slider">
        {(data.hero || INITIAL_HERO).map((img, i) => (
          <div key={i} className={`hero-slide ${i === activeHero ? 'active' : ''}`}>
             <img src={img} alt="Hero Background" fetchpriority={i === 0 ? "high" : "auto"} loading="eager" className="hero-slide-img" />
          </div>
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
          {(data.films || INITIAL_FILMS).map((film, index) => (
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
          {(data.stories || INITIAL_STORIES).map(story => (
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

    {/* GALLERY */}
    <Gallery images={data.gallery || INITIAL_GALLERY} openGallery={openGallery} />

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

const AlbumPage = ({ stories }) => {
  const { id } = useParams()
  const album = (stories || []).find(s => s.id === id)

  if (!album) return <div className="error-page" style={{padding: '20vh 5%', textAlign: 'center'}}>Album not found.</div>

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
            <Link to={`/album/${stories[(stories.indexOf(album) + 1) % stories.length].id}`} className="next-title">
               {stories[(stories.indexOf(album) + 1) % stories.length].title}
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

  const [siteData, setSiteData] = useState(INITIAL_DATA)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    // Fetch Dynamic Content
    fetch('/storefront.json')
      .then(res => res.json())
      .then(json => {
        setSiteData(json);
        
        // Aggressive Preloading: Store all images in browser memory cache
        // to prevent white flashes when scrolling quickly back to top
        const imagesToCache = [
          ...(json.hero || []),
          ...(json.films || []).map(f => f.src),
          ...(json.gallery || [])
        ];
        
        // Include story images
        if (json.stories) {
          json.stories.forEach(story => {
             if (story.moments) {
               story.moments.forEach(m => {
                 if (m.images) imagesToCache.push(...m.images);
               });
             }
          });
        }

        // Force browser to fetch and keep them in memory
        imagesToCache.forEach(src => {
          if (src) {
            const img = new Image();
            img.src = src;
          }
        });
      })
      .catch(err => console.error("Error loading storefront data:", err))

    const storyTimer = setInterval(() => setStorySlideIndex((p) => p + 1), 4500)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(storyTimer)
    }
  }, [])

  // Dynamic Hero Timer
  useEffect(() => {
    const heroCount = siteData.hero?.length || 1;
    const heroTimer = setInterval(() => setActiveHero((p) => (p + 1) % heroCount), 5000);
    return () => clearInterval(heroTimer);
  }, [siteData.hero])

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
    "Archive": "/assets/IMG_7162.JPG",
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
                   else if (name === "Archive") target = "/#gallery";
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
          <Route path="/" element={<HomePage data={siteData} activeHero={activeHero} storySlideIndex={storySlideIndex} openGallery={openGallery} />} />
          <Route path="/album/:id" element={<AlbumPage stories={siteData.stories} />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App

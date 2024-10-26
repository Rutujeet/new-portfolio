import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Menu, X } from "lucide-react";

const navItems = ["Home", "About", "Tech Stack", "Found Gems", "Contact"];

const AmericanPsychoHover = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [hoverTimer, setHoverTimer] = useState(null);

  const TRAILER_ID = "aFqjoCbZ4ik?si=3RrwG84FF6X46Gbw";

  useEffect(() => {
    return () => {
      if (hoverTimer) clearTimeout(hoverTimer);
    };
  }, [hoverTimer]);

  const handleMouseEnter = useCallback((e) => {
    const timer = setTimeout(() => {
      const rect = e.target.getBoundingClientRect();
      const scrollTop = window.scrollY; // Updated to use scrollY

      setPopupPosition({
        x: rect.left,
        y: rect.top + scrollTop - 180,
      });
      setShowPopup(true);
    }, 300);

    setHoverTimer(timer);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer) clearTimeout(hoverTimer);
    setShowPopup(false);
  }, [hoverTimer]);

  return (
    <>
      <span
        className="italic cursor-pointer text-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        american psycho
      </span>

      {showPopup && (
        <div
          className="fixed bg-black rounded-lg shadow-2xl z-50 transform -translate-x-1/2"
          style={{
            left: `${popupPosition.x}px`,
            top: `${popupPosition.y}px`,
            width: "320px",
            height: "180px",
          }}
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={handleMouseLeave}
        >
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${TRAILER_ID}?autoplay=1&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0`}
            title="American Psycho Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </>
  );
};

// Dummy data for Found Gems
const quotes = [
  {
    text: "too much memetic desire, not enough first principles thinking",
    author: "sahil lavingia (@shl)",
  },
  {
    text: "The best way to predict the future is to invent it",
    author: "Alan Kay",
  },
  {
    text: "Simplicity is the ultimate sophistication",
    author: "Leonardo da Vinci",
  },
  {
    text: "Knowledge is power, but enthusiasm pulls the switch",
    author: "Ivern Ball",
  },
  {
    text: "The only way to do great work is to love what you do",
    author: "Steve Jobs",
  },
  {
    text: "Innovation is saying 'no' to 1,000 things",
    author: "Steve Jobs",
  },
];

// Tech stack data
const technologies = [
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "TensorFlow",
  "PyTorch",
  "Docker",
  "Kubernetes",
  "AWS",
  "Redux",
  "GraphQL",
  "MongoDB",
  "PostgreSQL",
  "Next.js",
  "Git",
  "Linux",
  "Rust",
  "Go",
  "WebGL",
  "Three.js",
];

const Section = ({ bgColor, children, id }) => (
  <div
    id={id}
    className={`min-h-screen ${bgColor} transition-colors duration-500 ease-in-out`}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {children}
    </div>
  </div>
);

// Mobile Navigation Component
const MobileNav = ({ isOpen, setIsOpen, activeSection, scrollToSection }) => {
  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white/10 rounded-lg backdrop-blur-md md:hidden"
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </button>

      {/* Mobile navigation overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-black/95 md:hidden flex items-center justify-center"
        >
          <nav className="flex flex-col items-center space-y-8">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsOpen(false);
                }}
                className={`text-2xl font-bold transition-colors ${
                  activeSection === item.toLowerCase()
                    ? "text-[#FC5701]"
                    : "text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </>
  );
};

// Desktop Navigation Component
const DesktopNav = ({ activeSection, scrollToSection }) => {
  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
      <nav className="space-y-8">
        {navItems.map((item) => (
          <div
            key={item}
            onClick={() => scrollToSection(item.toLowerCase())}
            className="group cursor-pointer flex items-center space-x-4"
          >
            <span
              className={`inline-block w-12 h-0.5 transition-all duration-300 ${
                activeSection === item.toLowerCase()
                  ? "bg-white"
                  : "bg-gray-500"
              }`}
            />
            <span
              className={`text-lg font-bold transition-all duration-300 ${
                activeSection === item.toLowerCase()
                  ? "text-white opacity-100"
                  : "text-white opacity-0 group-hover:opacity-100"
              }`}
            >
              {item}
            </span>
          </div>
        ))}
      </nav>
    </div>
  );
};

const PortfolioLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("home");
  const [currentPage, setCurrentPage] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const quotesPerPage = window.innerWidth >= 768 ? 4 : 2;
  const totalPages = Math.ceil(quotes.length / quotesPerPage);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.toLowerCase());

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
      if (window.innerWidth >= 768) {
        setIsMobileNavOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    if (isDesktop) {
      const handleMouseMove = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [isDesktop]);

  return (
    <div className="w-full" style={{ cursor: isDesktop ? "none" : "auto" }}>
      {/* Navigation Components */}
      <MobileNav
        isOpen={isMobileNavOpen}
        setIsOpen={setIsMobileNavOpen}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />
      <DesktopNav
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Custom Cursor (only show on desktop) */}
      {isDesktop && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            className="rounded-full absolute pointer-events-none"
            style={{
              left: mousePosition.x - 15,
              top: mousePosition.y - 15,
              width: 30,
              height: 30,
              backgroundColor: "white",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 500,
            }}
          />
          {/* Display Axes and Coordinates on Desktop */}
          {isDesktop && (
            <>
              <div
                className="absolute w-px h-full bg-white opacity-30"
                style={{
                  transform: `translateX(${mousePosition.x}px)`,
                  transition: "transform 0.1s linear",
                }}
              />
              <div
                className="absolute w-full h-px bg-white opacity-30"
                style={{
                  transform: `translateY(${mousePosition.y}px)`,
                  transition: "transform 0.1s linear",
                }}
              />
              <div
                className="absolute text-xs font-mono font-bold text-white"
                style={{
                  left: mousePosition.x + 30,
                  top: mousePosition.y - 20,
                }}
              >
                x: {mousePosition.x}px
                <br />
                y: {mousePosition.y}px
              </div>
            </>
          )}
        </div>
      )}

      {/* Home Section */}
      <Section id="home" bgColor="bg-black">
        <div className="h-screen flex items-center">
          <div className="space-y-4 sm:space-y-8">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold text-white">
              plugpollution
            </h1>
            <p className="sm:text-xl lg:text-2xl text-white max-w-2xl">
              <span className="text-[#FC5701]">Engineering</span> undergrad
              (2025) passionate about programming, solid-state physics, and
              sharing knowledge through teaching and writing.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/RutujeetS"
                target="_blank"
                className="text-white hover:text-[#FC5701] transition-colors"
              >
                𝕏 dot com
              </a>
              <a
                href="https://www.linkedin.com/in/rutujeet/"
                target="_blank"
                className="text-white hover:text-[#FC5701] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://plugpollution.netlify.app/blogs/"
                target="_blank"
                className="text-white hover:text-[#FC5701] transition-colors"
              >
                Blog
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* About Section - Modified */}
      <Section id="about" bgColor="bg-[#FC5701]">
        <div className="h-screen flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white">
                About Me
              </h2>
              <div className="space-y-4 text-white text-base sm:text-lg lg:text-xl">
                <p>
                  i'm rutujeet aka <i className="text-black">plugpollution</i>.
                  i'm an engineering undergrad (2025) who enjoys programming,
                  solid-state physics, and teaching others what i know.
                  occasionally i like to write about life, technology, music and
                  other things that interest me.
                </p>
                <h3 className="sm:text-2xl lg:text-3xl font-bold mt-6 sm:mt-8">
                  things to do with me
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    if we've talked online or you're a friend of a friend,{" "}
                    <AmericanPsychoHover /> is a great movie about dudes just
                    being dudes
                  </li>
                  <li>
                    we can...
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        hack on an interesting hardware or software project!
                      </li>
                      <li>review media!</li>
                      <li>
                        go running! i'm a keen medium to long distance runner
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6 sm:space-y-8">
              <h3 className="sm:text-2xl lg:text-3xl font-bold text-white">
                Areas of Interest
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-white">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Information theory</li>
                  <li>Advanced algorithms</li>
                  <li>Networking & Unix systems</li>
                  <li>Cryogenics</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Decentralization</li>
                  <li>Energy geopolitics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Tech Stack Section */}
      <Section id="tech stack" bgColor="bg-black">
        <div className="h-screen flex items-center">
          <div className="space-y-4 sm:space-y-5 w-full">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white">
              Tech Stack
            </h2>

            {/* Scrolling tech rows */}
            {["Frontend", "Backend", "Tools"].map((category, idx) => (
              <div
                key={category}
                className="relative overflow-hidden py-2 sm:py-4"
              >
                <motion.div
                  animate={{
                    x: idx % 2 === 0 ? [0, -1500] : [-1500, 0],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 25 + idx * 5,
                      ease: "linear",
                    },
                  }}
                  className="flex space-x-4 sm:space-x-6 whitespace-nowrap"
                >
                  {technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-white/10 px-3 sm:px-6 py-2 sm:py-4 rounded-lg hover:bg-[#FC5701]/80 transition-colors"
                    >
                      <span className="text-white text-sm sm:text-base lg:text-lg">
                        {tech}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Found Gems Section */}
      <Section id="found gems" bgColor="bg-[#FC5701]">
        <div className="h-screen flex items-center">
          <div className="space-y-8 sm:space-y-12 w-full">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white">
              Found Gems
            </h2>
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                {quotes
                  .slice(
                    currentPage * quotesPerPage,
                    (currentPage + 1) * quotesPerPage
                  )
                  .map((quote, index) => (
                    <div
                      key={index}
                      className="bg-black/10 p-4 sm:p-8 rounded-lg"
                    >
                      <blockquote className="text-white">
                        <p className="text-lg sm:text-xl lg:text-2xl italic mb-2 sm:mb-4">
                          {quote.text}
                        </p>
                        <footer className="text-xs sm:text-sm">
                          — {quote.author}
                        </footer>
                      </blockquote>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center mt-6 sm:mt-8 space-x-4">
                <button
                  onClick={prevPage}
                  className="p-1 sm:p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="text-white flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        currentPage === i ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  className="p-1 sm:p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section id="contact" bgColor="bg-black">
        <div className="h-screen flex items-center">
          <div className="space-y-6 sm:space-y-8 w-full max-w-2xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white">
              Let's Connect
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-white">
              Interested in collaboration? Let's discuss projects, share ideas,
              or simply connect!
            </p>
            <div className="space-y-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                className="flex items-center space-x-4 text-white hover:text-[#FC5701] transition-colors"
              >
                <Github size={20} className="sm:w-6 sm:h-6" />
                <span className="text-base sm:text-lg">GitHub</span>
              </a>
              <a
                href="https://twitter.com/RutujeetS"
                target="_blank"
                className="flex items-center space-x-4 text-white hover:text-[#FC5701] transition-colors"
              >
                <span className="text-base sm:text-lg">
                  𝕏 dot com (preferred)
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/rutujeet/"
                target="_blank"
                className="flex items-center space-x-4 text-white hover:text-[#FC5701] transition-colors"
              >
                <span className="text-base sm:text-lg">LinkedIn</span>
              </a>
            </div>
            <p className="text-white font-bold mt-6 sm:mt-8 text-sm sm:text-base">
              You can't avoid{" "}
              <a
                href="https://matias.me/nsfw/"
                target="_blank"
                className="text-[#FC5701] hover:text-white transition-colors"
              >
                chaos
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default PortfolioLanding;

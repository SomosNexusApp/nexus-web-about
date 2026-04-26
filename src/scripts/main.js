document.addEventListener("DOMContentLoaded", () => {
  // GSAP Registrations
  gsap.registerPlugin(ScrollTrigger);

  // 1. HERO ANIMATION
  gsap.from("#hero .badge, #hero h1, #hero .subtitle, #hero .hero-buttons, #hero .logo-strip-container", {
    y: -20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power2.out"
  });

  // 2. PROJECT CARDS
  gsap.utils.toArray(".project-card:not(.featured)").forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  // Featured card
  gsap.utils.toArray(".project-card.featured").forEach(card => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out"
    });
  });

  // 3. TECH GRID
  gsap.from(".tech-card", {
    scrollTrigger: {
      trigger: ".tech-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    scale: 0.95,
    duration: 0.5,
    stagger: 0.08,
    ease: "power2.out"
  });

  // 4. TEAM CARDS
  gsap.from(".testimonial-card", {
    scrollTrigger: {
      trigger: ".team-grid",
      start: "top 80%",
      toggleActions: "play none none reverse"
    },
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: "power2.out"
  });

  // 5. STATS ANIMATION
  const statsRow = document.querySelector(".stats-row");
  if (statsRow) {
    ScrollTrigger.create({
      trigger: ".stats-row",
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.utils.toArray(".stat-number").forEach(stat => {
          const targetText = stat.innerText;
          const targetValue = parseInt(targetText.replace(/[^0-9]/g, ''), 10);
          const hasPlus = targetText.includes("+");
          
          let obj = { val: 0 };
          gsap.to(obj, {
            val: targetValue,
            duration: 1.5,
            ease: "power2.out",
            onUpdate: function() {
              stat.innerText = Math.floor(obj.val) + (hasPlus ? "+" : "");
            }
          });
        });
      }
    });
  }

  // 6. SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        // close mobile menu if open
        const nav = document.querySelector('nav.site-nav');
        if (nav && nav.classList.contains('is-menu-open')) {
          nav.classList.remove('is-menu-open');
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 7. NAV COMPONENT BEHAVIOR
  const nav = document.querySelector('nav.site-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }

  // Hamburger Menu removed from here - handled in Layout.astro for better control
});

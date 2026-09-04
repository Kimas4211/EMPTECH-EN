// Smooth scroll for nav links
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = document.getElementById('site-header').offsetHeight || 80;
          const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset - 12;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  navToggle && navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.classList.contains('open')) {
      mainNav.style.display = 'block';
    } else {
      mainNav.style.display = '';
    }
  });

  // Sticky header shadow on scroll
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');
  const toggleHeaderOnScroll = () => {
    if (window.scrollY > (hero ? hero.offsetHeight - 100 : 60)) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', toggleHeaderOnScroll);
  toggleHeaderOnScroll();

  // Highlight active nav item
  const navLinks = document.querySelectorAll('.main-nav a');
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const obsOptions = { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, obsOptions);
  sections.forEach(s => observer.observe(s));
});

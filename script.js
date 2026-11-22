document.addEventListener('DOMContentLoaded', () => {

  // 1. Preloader Hide
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 500);
  });

  // 2. Sticky Navbar & Back to Top Scroll Logic
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 3. Mobile Navigation Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // 4. Horizontal Carousel Control Buttons & Drag/Swipe
  document.querySelectorAll('.c-nav').forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-target');
      const wrapper = document.getElementById(targetId);
      const scrollAmount = wrapper.clientWidth * 0.75;

      if (button.classList.contains('prev')) {
        wrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });
  });

  // 5. Interactive Before/After Restoration Sliders
  document.querySelectorAll('.ba-container').forEach(container => {
    const range = container.querySelector('.ba-range');
    const beforeImgWrapper = container.querySelector('.img-before-wrapper');
    const beforeImg = container.querySelector('.img-before');
    const line = container.querySelector('.ba-line');
    const button = container.querySelector('.ba-button');

    function syncDimensions() {
      const containerWidth = container.offsetWidth;
      beforeImg.style.width = `${containerWidth}px`;
    }

    syncDimensions();
    window.addEventListener('resize', syncDimensions);

    range.addEventListener('input', (e) => {
      const val = e.target.value;
      beforeImgWrapper.style.width = `${val}%`;
      line.style.left = `${val}%`;
      button.style.left = `${val}%`;
    });
  });

  // 6. Video Modal Lightbox Popup
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoIframe');
  const modalClose = document.getElementById('modalClose');

  document.querySelectorAll('.video-thumb').forEach(item => {
    item.addEventListener('click', () => {
      const videoSrc = item.getAttribute('data-video');
      videoIframe.setAttribute('src', videoSrc);
      videoModal.style.display = 'flex';
    });
  });

  modalClose.addEventListener('click', closeModal);
  videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) closeModal();
  });

  function closeModal() {
    videoModal.style.display = 'none';
    videoIframe.setAttribute('src', '');
  }

  // 7. Scroll Fade-In Intersection Observer
  const fadeElements = document.querySelectorAll('.fade-in, .service-card, .why-card');
  const observerOptions = { threshold: 0.15 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));
});
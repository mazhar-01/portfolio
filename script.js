document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navBackdrop = document.getElementById('navBackdrop');

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    navBackdrop.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.querySelector('i').className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    navBackdrop.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.querySelector('i').className = 'fa-solid fa-bars';
  }

  menuToggle?.addEventListener('click', toggleMenu);
  navBackdrop?.addEventListener('click', closeMenu);

  document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Typing Text Effect
  const typedSpan = document.querySelector('.typed-text');
  const words = ['Video Edits', 'Motion Graphics', 'Viral Reels', 'Visual Designs'];
  const typeDelay = 90, eraseDelay = 55, nextWordDelay = 1800;
  let wordIdx = 0, charIdx = 0;

  function type() {
    if (!typedSpan) return;
    if (charIdx < words[wordIdx].length) {
      typedSpan.textContent += words[wordIdx].charAt(charIdx++);
      setTimeout(type, typeDelay);
    } else {
      setTimeout(erase, nextWordDelay);
    }
  }

  function erase() {
    if (charIdx > 0) {
      typedSpan.textContent = words[wordIdx].substring(0, --charIdx);
      setTimeout(erase, eraseDelay);
    } else {
      wordIdx = (wordIdx + 1) % words.length;
      setTimeout(type, typeDelay + 200);
    }
  }

  setTimeout(type, 800);

  // Portfolio Video Preloading & Fallback Handling
  const videoCards = document.querySelectorAll('.work-card');
  
  videoCards.forEach(card => {
    const video = card.querySelector('video');
    const placeholder = card.querySelector('.video-placeholder');
    const overlay = card.querySelector('.play-overlay');

    if (video) {
      const hidePlaceholder = () => {
        if (placeholder) placeholder.style.display = 'none';
      };

      video.addEventListener('loadeddata', hidePlaceholder);
      video.addEventListener('canplay', hidePlaceholder);
      
      // Hover preview effect
      card.addEventListener('mouseenter', () => {
        video.play().catch(() => {});
      });

      card.addEventListener('mouseleave', () => {
        video.pause();
        video.currentTime = 0;
      });
    }
  });

  // Modal Video Playback
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');

  function openVideoModal(src) {
    if (!modalVideo || !modal) return;
    modalVideo.src = src;
    modal.classList.add('active');
    modalVideo.play();
  }

  function closeVideoModal() {
    if (!modalVideo || !modal) return;
    modal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
  }

  videoCards.forEach(card => {
    const overlay = card.querySelector('.play-overlay');
    const video = card.querySelector('video source');
    if (overlay && video) {
      overlay.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideoModal(video.src);
      });
    }
  });

  modalClose?.addEventListener('click', closeVideoModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeVideoModal();
  });
});

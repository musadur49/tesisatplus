document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header Scroll Effect ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Navigation Menu Drawer ---
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenuDrawer = document.getElementById('mobile-menu-drawer');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileNavCloseLinks = document.querySelectorAll('.mobile-nav-close');

  const openMobileMenu = () => {
    mobileMenuDrawer.classList.add('active');
    mobileMenuBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeMobileMenu = () => {
    mobileMenuDrawer.classList.remove('active');
    mobileMenuBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  menuToggleBtn.addEventListener('click', openMobileMenu);
  mobileMenuBackdrop.addEventListener('click', closeMobileMenu);
  
  mobileNavCloseLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown trigger, don't close the menu
      if (link.classList.contains('mobile-dropdown-trigger')) return;
      closeMobileMenu();
    });
  });

  // --- Mobile Dropdown Menu Accordion ---
  const mobileServicesBtn = document.getElementById('mobile-services-btn');
  const mobileServicesContent = document.getElementById('mobile-services-content');

  mobileServicesBtn.addEventListener('click', () => {
    mobileServicesBtn.classList.toggle('active');
    mobileServicesContent.classList.toggle('active');
  });

  // --- FAQ Accordion Dropdowns ---
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(faqHeader => {
    faqHeader.addEventListener('click', () => {
      const faqItem = faqHeader.parentElement;
      const faqContent = faqHeader.nextElementSibling;
      const isActive = faqItem.classList.contains('active');

      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-header').setAttribute('aria-expanded', 'false');
        item.querySelector('.faq-content').style.maxHeight = '0px';
      });

      if (!isActive) {
        faqItem.classList.add('active');
        faqHeader.setAttribute('aria-expanded', 'true');
        faqContent.style.maxHeight = faqContent.scrollHeight + 'px';
      }
    });
  });

  // --- Scroll-to-Top Button Visibility & Action ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --- Scroll-Driven Reveal Animations (Intersection Observer) ---
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Offset trigger point slightly
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // --- Gallery Filter Mechanism ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Force reflow and add entry animation styles if needed
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          // Hide completely after fade out to avoid taking up layout space
          setTimeout(() => {
            card.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // --- Lightbox Image Zoom Gallery ---
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaptionTxt = document.getElementById('lightbox-caption-txt');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  if (lightboxModal && lightboxImg && lightboxCaptionTxt && lightboxCloseBtn) {
    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        if (!img) return;

        const h4El = card.querySelector('h4');
        const pEl = card.querySelector('p');

        const title = h4El ? h4El.textContent.trim() : 'Çalışmamız';
        const categoryText = pEl ? pEl.textContent.trim() : 'Referans';

        // Use getAttribute('src') to get the exact relative path, which is 100% safe
        // under the local file:/// protocol, especially with spaces in filenames
        const relativeSrc = img.getAttribute('src');
        
        lightboxImg.src = relativeSrc;
        lightboxImg.alt = img.alt || 'TesisatPlus';
        lightboxCaptionTxt.innerHTML = `<strong>${title}</strong> — <span style="color:var(--primary-light);">${categoryText}</span>`;
        
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxCloseBtn.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target === lightboxCloseBtn) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});

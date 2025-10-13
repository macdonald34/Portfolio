// Responsive menu + scroll + contact notification helper
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu');
  const navbar = document.querySelector('.navbar');

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      navbar.classList.toggle('active');
      menuBtn.classList.toggle('fa-times');
    });
  }
  
  // Project modal: open/close and populate from data attributes
  const modal = document.getElementById('project-modal');
  const modalImg = modal && modal.querySelector('.modal-image img');
  const modalTitle = modal && modal.querySelector('#modal-title');
  const modalDesc = modal && modal.querySelector('#modal-desc');
  const modalTech = modal && modal.querySelector('#modal-tech');
  const modalLink = modal && modal.querySelector('#modal-link');
  const modalClose = modal && modal.querySelector('.modal-close');

  function openProjectModal(card) {
    if (!modal) return;
    const title = card.getAttribute('data-title') || '';
    const desc = card.getAttribute('data-desc') || '';
    const img = card.getAttribute('data-img') || '';
    const tech = (card.getAttribute('data-tech') || '').split(',').filter(Boolean);
    const link = card.getAttribute('data-link') || '#';

    if (modalImg) { modalImg.src = img; modalImg.alt = title; }
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalTech) {
      modalTech.innerHTML = '';
      tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech';
        span.textContent = t.trim();
        modalTech.appendChild(span);
      });
    }
    if (modalLink) { modalLink.href = link; }

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.view-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (card) openProjectModal(card);
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modal) {
    modal.querySelector('.modal-backdrop').addEventListener('click', closeProjectModal);
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeProjectModal(); });

  // close menu on nav link click
  document.querySelectorAll('.navbar ul li a').forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        if (menuBtn) menuBtn.classList.remove('fa-times');
      }
    });
  });

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // active nav on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar ul li a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (pageYOffset >= top && pageYOffset < top + height) {
        current = sec.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  });

  // Toast helper
  function showToast(message, timeout = 4000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, timeout);
  }

  // Contact form enhanced handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);

      // Determine endpoint
      let endpoint = (contactForm.getAttribute('action') || '').trim();
      const fallback = 'https://formspree.io/f/macdonaldmuhavi98@gmail.com';

      // Basic validation: ensure names are present (FormData should include them now)
      if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        showToast('Please fill in name, email and message fields.');
        return;
      }

      if (!endpoint) {
        // No action provided. We warn and use fallback only after user confirmation via toast
        showToast('No form endpoint found — update form action to your Formspree or backend. Using fallback for now.');
        endpoint = fallback;
      }

      // Prevent obvious mistakes: action shouldn't be a plain email
      if (endpoint.indexOf('@') !== -1 && !endpoint.startsWith('http')) {
        showToast('Form action looks like an email address. Please set a proper form endpoint URL in the form action.');
        console.warn('Invalid form action:', endpoint);
        return;
      }

      try {
        const resp = await fetch(endpoint, {
          method: (contactForm.getAttribute('method') || 'POST').toUpperCase(),
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        console.log('Contact form response status:', resp.status);

        // Try to parse JSON message for friendly feedback
        let body = null;
        try {
          body = await resp.json();
          console.log('Contact form response body:', body);
        } catch (parseErr) {
          console.log('No JSON body in response');
        }

        if (resp.ok) {
          contactForm.reset();
          const successMsg = (body && (body.message || body.success || body.detail)) || 'Message sent — thank you!';
          showToast(successMsg);

          // Desktop notification
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              new Notification('New message sent', { body: successMsg });
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') new Notification('New message sent', { body: successMsg });
              });
            }
          }
        } else {
          const errMsg = (body && (body.error || body.message || JSON.stringify(body))) || `Server returned ${resp.status}`;
          console.error('Form submission failed:', errMsg);
          showToast(`Failed to send: ${errMsg}`);
        }
      } catch (err) {
        console.error('Submit error:', err);
        showToast('Failed to send message. Check your network or form endpoint.');
      }
    });
  }
});

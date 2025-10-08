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

      // Try to POST to Formspree (you may need to update the endpoint)
      try {
        const resp = await fetch(contactForm.action || 'https://formspree.io/f/macdonaldmuhavi98@gmail.com', {
          method: contactForm.method || 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (resp.ok) {
          contactForm.reset();
          showToast('Message sent — thank you!');

          // Desktop notification (optional)
          if ('Notification' in window) {
            if (Notification.permission === 'granted') {
              new Notification('New message sent', { body: 'Someone contacted you via your portfolio.' });
            } else if (Notification.permission !== 'denied') {
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  new Notification('New message sent', { body: 'Someone contacted you via your portfolio.' });
                }
              });
            }
          }
        } else {
          throw new Error('Network error');
        }
      } catch (err) {
        console.error(err);
        showToast('Failed to send message. Please try again later.');
      }
    });
  }
});

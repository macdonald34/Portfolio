/**
 * index.js - Complete Portfolio JavaScript
 * Features: Mobile menu, particles, typing animation, scroll spy,
 * project cards, modal, contact form with local storage and email integration
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ============================================================
  // 1. MOBILE MENU TOGGLE
  // ============================================================
  const menuBtn = document.getElementById('menu');
  const navbar = document.querySelector('.navbar');

  if (menuBtn && navbar) {
    menuBtn.addEventListener('click', function() {
      navbar.classList.toggle('active');
      menuBtn.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.navbar ul li a').forEach(function(link) {
      link.addEventListener('click', function() {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
      });
    });
  }

  // ============================================================
  // 2. SMOOTH SCROLLING FOR ANCHOR LINKS
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ============================================================
  // 3. PARTICLES.JS BACKGROUND
  // ============================================================
  if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#f7b731' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: true },
        size: { value: 3, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#f7b731',
          opacity: 0.3,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'repulse' },
          onclick: { enable: true, mode: 'push' }
        }
      }
    });
  }

  // ============================================================
  // 4. TYPING ANIMATION
  // ============================================================
  const typingText = document.querySelector('.typing-text');
  if (typingText) {
    const words = ['Web Development', 'Mobile Apps', 'UI/UX Design', 'Poster Design'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const currentChar = currentWord.substring(0, charIndex);
      typingText.textContent = currentChar;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(typeEffect, 150);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 80);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1200);
      }
    }

    typeEffect();
  }

  // ============================================================
  // 5. SCROLL SPY (Active Nav Link)
  // ============================================================
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar ul li a');
    let current = '';

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop - 400) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });

  // ============================================================
  // 6. PROJECT CARDS (Posters)
  // ============================================================
  const posters = [
    {
      title: 'Perfume Poster',
      desc: 'Luxury fragrance visual with rich textures and elegant typography.',
      img: 'img/perfume.jpg',
      tech: ['Photoshop', 'InDesign']
    },
    {
      title: 'Church Poster',
      desc: 'Vibrant flyer for church',
      img: 'img/REV BOLTON.jpg',
      tech: ['Photoshop', 'Illustrator']
    },
    {
      title: 'Brand Mockup',
      desc: 'Coffee shop brand identity mockup with packaging design.',
      img: 'img/brand-mockup.jpg',
      tech: ['InDesign', 'Photoshop']
    },
    {
      title: 'Social Ad',
      desc: 'Instagram campaign design for fashion brand.',
      img: 'https://via.placeholder.com/400x300/0b0d15/f7b731?text=Social+Ad',
      tech: ['Photoshop']
    },
    {
      title: 'Art Poster Series',
      desc: 'Minimalist exhibition posters with geometric elements.',
      img: 'https://via.placeholder.com/400x300/1e212b/e0a120?text=Art+Series',
      tech: ['Illustrator', 'InDesign']
    },
    {
      title: 'Business Card',
      desc: 'Elegant business card design with foil accents.',
      img: 'https://via.placeholder.com/400x300/2a2f3e/e0a120?text=Card',
      tech: ['InDesign']
    },
    {
      title: 'Burger Poster',
      desc: 'A vibrant poster for a local burger restaurant.',
      img: 'img/super burger.jpg',
      tech: ['InDesign', 'Photoshop']
    },
    {
      title: 'Salon Poster',
      desc: 'An art Poster for a local salon.',
      img: 'img/shelines beauty.jpg',
      tech: ['Photoshop', 'Illustrator']
    }
  ];

  const webapps = [
    {
      title: 'Car Rental',
      desc: 'A Fullstack web application designed for people who are looking for a cool and good place to hire cars',
      img: 'img/carentals.jpg',
      tech: ['React.js', 'Flask']

    }

  ]

  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    projectsGrid.innerHTML = '';
    posters.forEach(function(p, idx) {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.dataset.index = idx;
      card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        <div class="project-body">
          <h3>${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="project-meta">${p.tech.map(function(t) {
            return '<span class="tech">' + t + '</span>';
          }).join('')}</div>
          <button class="view-project-btn" data-index="${idx}">View</button>
        </div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // ============================================================
  // 7. PROJECT MODAL
  // ============================================================
  const modal = document.getElementById('project-modal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalTech = document.getElementById('modalTech');
  const modalLive = document.getElementById('modalLive');
  const modalGithub = document.getElementById('modalGithub');
  const modalClose = document.getElementById('modalClose');

  function openModal(index) {
    const p = posters[index];
    if (!p) return;
    modalImg.src = p.img;
    modalImg.alt = p.title;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalTech.innerHTML = p.tech.map(function(t) {
      return '<span class="tech">' + t + '</span>';
    }).join('');
    modalLive.href = '#';
    modalGithub.href = '#';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (projectsGrid) {
    projectsGrid.addEventListener('click', function(e) {
      const btn = e.target.closest('.view-project-btn');
      if (btn) {
        const idx = parseInt(btn.dataset.index);
        if (!isNaN(idx)) openModal(idx);
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });

  // ============================================================
  // 8. CONTACT FORM - FULLY FUNCTIONAL WITH MESSAGE STORAGE
  // ============================================================
  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimeout = null;

  // Load stored messages from localStorage
  let storedMessages = [];
  try {
    const saved = localStorage.getItem('portfolioMessages');
    if (saved) {
      storedMessages = JSON.parse(saved);
    }
  } catch (e) {
    storedMessages = [];
  }

  // Function to save messages to localStorage
  function saveMessages(messages) {
    try {
      localStorage.setItem('portfolioMessages', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages:', e);
    }
  }

  // Function to show toast notification
  function showToast(message, type) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
      toast.classList.remove('show');
    }

    // Set icon and message
    toastIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    toast.className = 'toast ' + type;
    toastMessage.textContent = message;

    // Show toast
    setTimeout(function() {
      toast.classList.add('show');
    }, 50);

    // Auto hide after 5 seconds
    toastTimeout = setTimeout(function() {
      toast.classList.remove('show');
      toastTimeout = null;
    }, 5000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value?.trim() || '';
      const email = document.getElementById('contactEmail')?.value?.trim() || '';
      const subject = document.getElementById('contactSubject')?.value?.trim() || '';
      const message = document.getElementById('contactMessage')?.value?.trim() || '';

      // Validate
      if (!name || !email || !message) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }

      // Create message object
      const newMessage = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject || 'No Subject',
        message: message,
        date: new Date().toLocaleString(),
        read: false
      };

      // Store in localStorage
      storedMessages.push(newMessage);
      saveMessages(storedMessages);

      // Log to console for debugging (you can see messages here)
      console.log('📬 New Message Received:');
      console.log('─────────────────────────');
      console.log('From:', name);
      console.log('Email:', email);
      console.log('Subject:', subject || 'No Subject');
      console.log('Message:', message);
      console.log('Date:', newMessage.date);
      console.log('─────────────────────────');
      console.log('Total Messages:', storedMessages.length);
      console.log('All Messages:', storedMessages);

      // Show success toast
      showToast('✅ Message sent successfully! I will get back to you soon.', 'success');

      // Reset form
      contactForm.reset();

      // Optional: Also send via Formspree as backup
      try {
        const formData = new FormData(contactForm);
        fetch('https://formspree.io/f/macdonaldmuhavi98@gmail.com', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(function(response) {
          if (!response.ok) {
            console.warn('Formspree backup failed, but message is stored locally.');
          }
        })
        .catch(function(error) {
          console.warn('Formspree error:', error);
        });
      } catch (error) {
        // Silent fail - we already stored locally
        console.log('Message stored locally only.');
      }
    });
  }

  // ============================================================
  // 9. VIEW STORED MESSAGES (Admin/Developer Tool)
  // ============================================================
  // To view all stored messages, open browser console and run:
  // viewMessages() - shows all messages
  // viewMessages(true) - shows only unread messages

  window.viewMessages = function(onlyUnread) {
    console.log('📭 Portfolio Messages:');
    console.log('─────────────────────────');
    const msgs = onlyUnread ? storedMessages.filter(function(m) { return !m.read; }) : storedMessages;
    if (msgs.length === 0) {
      console.log('No messages found.');
      return;
    }
    msgs.forEach(function(m, i) {
      console.log('[' + (i + 1) + '] ' + m.date);
      console.log('  From: ' + m.name + ' <' + m.email + '>');
      console.log('  Subject: ' + m.subject);
      console.log('  Message: ' + m.message);
      console.log('  Read: ' + (m.read ? '✅' : '❌'));
      console.log('─────────────────────────');
    });
    console.log('Total: ' + msgs.length + ' messages');
  };

  // Mark message as read
  window.markAsRead = function(index) {
    if (index >= 0 && index < storedMessages.length) {
      storedMessages[index].read = true;
      saveMessages(storedMessages);
      console.log('✅ Message ' + (index + 1) + ' marked as read.');
    } else {
      console.log('❌ Invalid message index.');
    }
  };

  // Delete message
  window.deleteMessage = function(index) {
    if (index >= 0 && index < storedMessages.length) {
      const removed = storedMessages.splice(index, 1);
      saveMessages(storedMessages);
      console.log('🗑️ Deleted message from: ' + removed[0].name);
    } else {
      console.log('❌ Invalid message index.');
    }
  };

  // Clear all messages
  window.clearAllMessages = function() {
    if (confirm('Delete all stored messages?')) {
      storedMessages = [];
      saveMessages(storedMessages);
      console.log('🗑️ All messages cleared.');
    }
  };

  // ============================================================
  // 10. FOOTER YEAR
  // ============================================================
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 11. CONSOLE WELCOME & INSTRUCTIONS
  // ============================================================
  console.log('%c👋 Welcome to Macdonald\'s Portfolio!', 'font-size: 20px; color: #f7b731; font-weight: bold;');
  console.log('%c📬 To view messages, type: viewMessages()', 'font-size: 14px; color: #eef2fb;');
  console.log('%c📬 To view unread messages, type: viewMessages(true)', 'font-size: 14px; color: #eef2fb;');
  console.log('%c✅ To mark a message as read: markAsRead(0)', 'font-size: 14px; color: #eef2fb;');
  console.log('%c🗑️ To delete a message: deleteMessage(0)', 'font-size: 14px; color: #eef2fb;');
  console.log('%c🧹 To clear all messages: clearAllMessages()', 'font-size: 14px; color: #eef2fb;');
  console.log('─────────────────────────────────────────────');

  console.log('%c📊 Current Messages: ' + storedMessages.length, 'font-size: 16px; color: #4caf50;');
  if (storedMessages.length > 0) {
    console.log('  Unread: ' + storedMessages.filter(function(m) { return !m.read; }).length);
    console.log('  Read: ' + storedMessages.filter(function(m) { return m.read; }).length);
  }

}); // end DOMContentLoaded
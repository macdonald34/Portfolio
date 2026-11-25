'use strict';

const projects = [
  {
    title: 'Sheline Scent — Perfume Campaign',
    category: 'Graphic design',
    filters: ['branding', 'graphic'],
    description: 'A vibrant promotional visual for a fragrance business, combining product imagery, campaign messaging and a bold green palette.',
    image: 'img/perfume.jpg',
    alt: 'Green Sheline Scent perfume campaign poster with product and fragrance imagery',
    tools: ['Campaign design', 'Adobe Photoshop']
  },
  {
    title: 'Sheline’s Glamtouch',
    category: 'Branding & identity',
    filters: ['branding', 'graphic'],
    description: 'A beauty-brand promotional composition bringing together a wordmark, service information and warm gold-toned imagery.',
    image: 'img/shelines beauty.jpg',
    alt: 'Sheline’s Glamtouch beauty brand promotional design in white and warm gold',
    tools: ['Brand presentation', 'Promotional design']
  },
  {
    title: 'Prayer Festival',
    category: 'Graphic design',
    filters: ['graphic'],
    description: 'An event poster built around expressive type, layered portraits and a clear hierarchy of event information.',
    image: 'img/REV BOLTON.jpg',
    alt: 'Prayer Festival event poster with large green typography and speaker portraits',
    tools: ['Event poster', 'Adobe Photoshop']
  },
  {
    title: 'In the Midst of the Storm',
    category: 'Graphic design',
    filters: ['graphic'],
    description: 'A dramatic event poster using high-contrast type, a restrained monochrome palette and a strong portrait composition.',
    image: 'img/STORM.jpg',
    alt: 'In the Midst of the Storm event poster in black, white and red',
    tools: ['Event poster', 'Adobe Photoshop']
  },
  {
    title: 'Burger — Promotional Design',
    category: 'Graphic design',
    filters: ['graphic'],
    description: 'A food-promotion visual from a selection of advertising and campaign artwork.',
    image: 'img/super burger.jpg',
    alt: 'Promotional burger design',
    tools: ['Advertising design', 'Adobe Photoshop']
  },
  {
    title: 'Super Sale — Campaign Visual',
    category: 'Graphic design',
    filters: ['graphic'],
    description: 'A retail campaign visual from a collection of promotional and marketing design work.',
    image: 'img/SUPER SALE.jpg',
    alt: 'Super Sale promotional campaign design',
    tools: ['Campaign design', 'Adobe Photoshop']
  },
  {
    title: 'Sneakers — Promotional Design',
    category: 'Graphic design',
    filters: ['graphic'],
    description: 'A product-focused promotional visual from a selection of graphic design work.',
    image: 'img/Sneakers.jpg',
    alt: 'Sneaker product promotional design',
    tools: ['Promotional design', 'Adobe Photoshop']
  },
  {
    title: 'RentalX — Car Rental Application',
    category: 'Web development · UI / UX',
    filters: ['uiux', 'web'],
    description: 'A vehicle-rental application interface with car browsing, account navigation and wishlist views.',
    image: 'img/carentals.png',
    alt: 'RentalX car rental web application showing a vehicle browsing interface',
    tools: ['React', 'Flask', 'MongoDB']
  },
  {
    title: 'Mac_Moves Estate — Property Platform',
    category: 'Web development · UI / UX',
    filters: ['uiux', 'web'],
    description: 'A real-estate interface concept with property listings, search and featured homes.',
    image: 'img/realestate.png',
    alt: 'Mac_Moves Estate real-estate website with property search and featured listings',
    tools: ['React', 'Node.js', 'Express', 'MongoDB']
  }
];

const projectsGrid = document.querySelector('#projects-grid');
const filterButtons = document.querySelectorAll('.filter-button');
const projectDialog = document.querySelector('#project-dialog');

function createProjectCard(project, index) {
  const article = document.createElement('article');
  article.className = 'project-card';
  article.dataset.projectIndex = String(index);

  const imageButton = document.createElement('button');
  imageButton.className = 'project-image-button';
  imageButton.type = 'button';
  imageButton.setAttribute('aria-label', `View project: ${project.title}`);

  const image = document.createElement('img');
  image.src = project.image;
  image.alt = project.alt;
  image.loading = 'lazy';
  image.decoding = 'async';

  const openIcon = document.createElement('span');
  openIcon.className = 'project-open';
  openIcon.setAttribute('aria-hidden', 'true');
  openIcon.textContent = '↗';
  imageButton.append(image, openIcon);

  const info = document.createElement('div');
  info.className = 'project-info';

  const title = document.createElement('h3');
  title.className = 'project-title';
  title.textContent = project.title;

  const category = document.createElement('span');
  category.className = 'project-category';
  category.textContent = project.category;

  const description = document.createElement('p');
  description.className = 'project-description';
  description.textContent = project.description;
  info.append(title, category, description);
  article.append(imageButton, info);

  return article;
}

function renderProjects(filter = 'all') {
  if (!projectsGrid) return;

  const matchingProjects = projects
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => filter === 'all' || project.filters.includes(filter));

  projectsGrid.replaceChildren(
    ...matchingProjects.map(({ project, index }) => createProjectCard(project, index))
  );
}

function openProject(index) {
  const project = projects[index];
  if (!project || !projectDialog) return;

  const image = projectDialog.querySelector('#dialog-image');
  const imageLink = projectDialog.querySelector('#dialog-image-link');
  image.src = project.image;
  image.alt = project.alt;
  imageLink.href = project.image;
  projectDialog.querySelector('#dialog-category').textContent = project.category;
  projectDialog.querySelector('#dialog-title').textContent = project.title;
  projectDialog.querySelector('#dialog-description').textContent = project.description;

  const tools = projectDialog.querySelector('#dialog-tools');
  tools.replaceChildren(...project.tools.map((tool) => {
    const tag = document.createElement('span');
    tag.textContent = tool;
    return tag;
  }));
  projectDialog.showModal();
}

if (projectsGrid) {
  renderProjects();
  projectsGrid.addEventListener('click', (event) => {
    const card = event.target.closest('.project-card');
    if (card) openProject(Number(card.dataset.projectIndex));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle('is-active', isActive);
      filterButton.setAttribute('aria-pressed', String(isActive));
    });
    renderProjects(button.dataset.filter);
  });
});

if (projectDialog) {
  projectDialog.querySelector('.dialog-close').addEventListener('click', () => {
    projectDialog.close();
  });
  projectDialog.addEventListener('click', (event) => {
    if (event.target === projectDialog) projectDialog.close();
  });
}

const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('#primary-nav');

function closeMenu() {
  if (!menuToggle || !primaryNav) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
  primaryNav.classList.remove('is-open');
}

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
}

const currentYear = document.querySelector('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const name = String(formData.get('name')).trim();
    const email = String(formData.get('email')).trim();
    const projectType = String(formData.get('projectType')).trim();
    const message = String(formData.get('message')).trim();
    const subject = `Portfolio enquiry: ${projectType}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      '',
      message
    ].join('\n');

    formStatus.textContent = 'Your email app should open with the message ready. Review it there and press Send to contact me.';
    window.location.href = `mailto:macdonaldmuhavi98@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

const revealElements = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

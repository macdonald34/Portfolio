'use strict';

const projects = window.portfolioProjects;

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
  const projectLink = projectDialog.querySelector('#dialog-project-link');
  image.src = project.image;
  image.alt = project.alt;
  imageLink.href = project.image;
  projectLink.hidden = !project.liveUrl;
  if (project.liveUrl) projectLink.href = project.liveUrl;
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

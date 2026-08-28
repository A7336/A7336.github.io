let projectsData = [];
let activeProjectIndex = 0;

export async function initProjects() {
  try {
    const res = await fetch('data/projects.json');
    projectsData = await res.json();
    renderFeaturedCards();
  } catch (err) {
    console.error("Error loading project data:", err);
  }

  // Setup dynamic card squishing observer
  const featuredCard = document.querySelector('.card-project-feature');
  if (featuredCard) {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const card3 = entry.target.querySelector('.project-mini-card:nth-child(3)');
        if (card3) {
          card3.style.display = entry.contentRect.height < 260 ? 'none' : 'flex';
        }
      }
    });
    observer.observe(featuredCard);
  }
}

function renderFeaturedCards() {
  const container = document.querySelector('.project-cards');
  if (!container) return;

  container.innerHTML = projectsData.slice(0, 3).map((proj, idx) => `
    <div class="project-mini-card" data-index="${idx}">
      <div style="font-size: 0.75rem; color: ${proj.categoryColor};">${proj.category}</div>
      <div class="project-mini-footer">
        <span>${proj.title}</span>
        <i class="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.project-mini-card').forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(parseInt(card.getAttribute('data-index'), 10));
    });
  });
}

function openProjectModal(index = 0) {
  activeProjectIndex = index;
  renderProjectList();
  renderProjectDetail();
  document.getElementById('projectModal')?.classList.add('active');
}

function renderProjectList() {
  const sidebar = document.getElementById('projectListContainer');
  if (!sidebar) return;

  sidebar.innerHTML = projectsData.map((proj, idx) => `
    <div class="project-list-item ${idx === activeProjectIndex ? 'active' : ''}" data-index="${idx}">
      <h4>${proj.title}</h4>
      <span style="color: ${proj.categoryColor}">${proj.category}</span>
    </div>
  `).join('');

  sidebar.querySelectorAll('.project-list-item').forEach(item => {
    item.addEventListener('click', () => {
      activeProjectIndex = parseInt(item.getAttribute('data-index'), 10);
      renderProjectList();
      renderProjectDetail();
    });
  });
}

function renderProjectDetail() {
  const view = document.getElementById('projectDetailContainer');
  const proj = projectsData[activeProjectIndex];
  if (!view || !proj) return;

  const imageHtml = proj.image 
    ? `<div class="project-detail-image-wrap">
         <img src="${proj.image}" alt="${proj.title} preview" loading="lazy">
       </div>` 
    : '';

  view.innerHTML = `
    <div class="project-detail-header">
      <span class="project-detail-category" style="color: ${proj.categoryColor}">${proj.category}</span>
      <h3>${proj.title}</h3>
    </div>
    ${imageHtml}
    <p class="project-detail-desc">${proj.summary}</p>
    <div style="margin-top: 1rem;">
      <h4 style="font-size: 0.85rem; color: var(--text-main); margin-bottom: 0.5rem;">Key Achievements:</h4>
      <ul style="padding-left: 1.25rem; color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
        ${proj.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
    </div>
    <div class="project-detail-tags" style="margin-top: 1.5rem;">
      ${proj.tags.map(t => `<span class="stag">${t}</span>`).join('')}
    </div>
    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--card-border);">
      <a href="${proj.github}" target="_blank" style="color: var(--accent-cyan); text-decoration: none; font-size: 0.85rem; font-weight: 600; display: inline-flex; align-items: center; gap: 0.4rem;">
        View Repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
      </a>
    </div>
  `;
}
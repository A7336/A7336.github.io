import { initTypewriter } from './typewriter.js';
import { initStackFilter } from './stack-filter.js';
import { initFacts } from './facts.js';
import { initModals } from './modal.js';
import { initProjects } from './projects.js';
import { loadModals } from './modals-loader.js';

document.addEventListener('DOMContentLoaded', async () => {
  await loadModals();
  
  initTypewriter();
  initStackFilter();
  initFacts();
  initModals();
  await initProjects();
});
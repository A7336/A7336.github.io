async function loadComponent(url, targetElement = document.body) {
  const response = await fetch(url);
  const html = await response.text();
  targetElement.insertAdjacentHTML('beforeend', html);
}


export async function loadModals() {
  await loadComponent('components/contact-modal.html');
  await loadComponent('components/project-modal.html');
}
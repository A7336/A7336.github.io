export function initModals() {
  // Contact Modal
  const contactModal = document.getElementById('contactModal');
  const openContactCard = document.getElementById('openContactCard');
  const closeContactBtn = document.getElementById('closeContactBtn');
  const contactForm = document.getElementById('contactForm');

  const openContact = () => contactModal?.classList.add('active');
  const closeContact = () => contactModal?.classList.remove('active');

  openContactCard?.addEventListener('click', openContact);
  closeContactBtn?.addEventListener('click', closeContact);
  contactModal?.addEventListener('click', (e) => {
    if (e.target === contactModal) closeContact();
  });

  // Contact Form AJAX Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Sending...';

      fetch(contactForm.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(contactForm)
      })
      .then(res => {
        if (res.ok) {
          alert('Thank you! Your message has been sent successfully.');
          contactForm.reset();
          closeContact();
        } else {
          alert('Oops! Submission failed.');
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Send Message';
      });
    });
  }

  // Project Modal Close Logic
  const projModal = document.getElementById('projectModal');
  const closeProjBtn = document.getElementById('closeProjectBtn');
  
  closeProjBtn?.addEventListener('click', () => projModal?.classList.remove('active'));
  projModal?.addEventListener('click', (e) => {
    if (e.target === projModal) projModal.classList.remove('active');
  });
}
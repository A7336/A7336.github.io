export function initStackFilter() {
  const buttons = {
    'btn-all': 'all',
    'btn-lang': 'lang',
    'btn-fw': 'fw',
    'btn-algo': 'algo',
    'btn-tools': 'tools'
  };

  function filterStack(category, activeBtn) {
    document.querySelectorAll('.sf-btn').forEach(b => b.classList.remove('active'));
    activeBtn.classList.add('active');

    const tags = document.querySelectorAll('#tag-container .stag');
    tags.forEach(tag => {
      tag.style.display = (category === 'all' || tag.getAttribute('data-cat') === category)
        ? 'inline-flex'
        : 'none';
    });
  }

  Object.entries(buttons).forEach(([btnId, category]) => {
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener('click', (e) => filterStack(category, e.target));
    }
  });
}
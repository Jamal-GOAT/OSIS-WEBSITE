// Lightweight JS for filtering and modal behaviour.

document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const modal = document.getElementById('profile-modal');
  const modalAvatar = document.getElementById('modal-avatar');
  const modalName = document.getElementById('modal-name');
  const modalRole = document.getElementById('modal-role');
  const modalBio = document.getElementById('modal-bio');
  const modalMeta = document.getElementById('modal-meta');
  const modalClose = document.querySelector('.modal-close');
  const modalClassroom = document.getElementById('modal-classroom');
  const yearSpan = document.getElementById('year');

  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Filtering
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Open modal from card
  function openModalFromCard(card) {
    const img = card.querySelector('.avatar');
    const name = card.querySelector('.name').textContent.trim();
    const role = card.querySelector('.role').textContent.trim();
    const brief = card.querySelector('.brief').textContent.trim();
    const classroom = card.querySelector('.classroom').textContent.trim();

    modalAvatar.src = img.src;
    modalAvatar.alt = `Portrait of ${name}`;
    modalName.textContent = name;
    modalRole.textContent = role;
    modalBio.textContent = brief;
    modalClassroom.textContent = "Classroom: " + classroom;

    

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  // Attach handlers to detail buttons and whole card click for accessibility
  document.querySelectorAll('.card').forEach(card => {
    const btn = card.querySelector('.details-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModalFromCard(card);
      });
    }
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModalFromCard(card);
      }
    });
    card.addEventListener('click', () => openModalFromCard(card));
  });

  // Close modal
  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
  });
});

const elements = document.querySelectorAll('.back1');

function checkVisibility() {
    const triggerPoint = window.innerHeight * 0.8;

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.top > 0) {
          el.classList.add('visible');
        } else {
          el.classList.remove('visible');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);


 const mobileMenus = Array.from(document.querySelectorAll('.navbarmobile .menu'));
  mobileMenus.forEach(menu => {
    if (!menu.hasAttribute('tabindex')) menu.setAttribute('tabindex', '0');

    menu.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    menu.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        menu.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', () => {
    mobileMenus.forEach(m => m.classList.remove('open'));
  });


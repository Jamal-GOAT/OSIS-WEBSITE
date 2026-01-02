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
  const modalExtra = document.getElementById('modal-extra');
  const yearSpan = document.getElementById('year');
  
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

  // *Open modal from card + function
  function openModalFromCard(card) {
    const img = card.querySelector('.avatar');
    const name = card.querySelector('.name').textContent.trim();
    const role = card.querySelector('.role').textContent.trim();
    const brief = card.querySelector('.brief').textContent.trim();
    const classroom = card.querySelector('.classroom')?.textContent.trim();
    const subject = card.querySelector('.subject')?.textContent.trim();

    modalAvatar.src = img.src;
    modalAvatar.alt = `Portrait of ${name}`;
    modalName.textContent = name;
    modalRole.textContent = role;
    modalBio.textContent = brief;
    if (subject) {
    modalExtra.textContent = `Subject teaching: ${subject}`;
    modalExtra.style.display = 'block';
  } else if (classroom && classroom !== '-') {
    modalExtra.textContent = `Classroom: ${classroom}`;
    modalExtra.style.display = 'block';
  } else {
    modalExtra.style.display = 'none';
  }

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

document.addEventListener('DOMContentLoaded', function() {
  const elements = document.querySelectorAll('.back1, .back2 .maintitle, .back2 .text .section1 .text1, .back2 .text .section1 .text2, .back2 .text .section2 .text3, .back2 .text .section2 .text4, .back3 h1, .back3 p');

  function checkVisibility() {
      const triggerPoint = window.innerHeight * 0.8;

      elements.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < triggerPoint && rect.top > 0) {
            if (!el.classList.contains('visible')) {
              el.classList.add('visible');
            }
          } else {
            if (el.classList.contains('visible')) {
              el.classList.remove('visible');
            }
          }
      });
  }

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('load', checkVisibility);
});

function search_fun() {
    const inputEl = document.getElementById('input-field');
    const listContainer = document.getElementById('list-container');
    if (!inputEl || !listContainer) return;

    inputEl.addEventListener('input', (event) => {
        const inputValue = event.target.value.trim().toLowerCase();
        const listArr = listContainer.children;

        for (const item of listArr) {
            if (item.textContent.toLowerCase().includes(inputValue)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        }
    });
}

search_fun();
 
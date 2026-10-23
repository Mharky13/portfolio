tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#151e32',
                    900: '#0f172a',
                    950: '#020617',
                },
                brand: {
                    cyan: '#06b6d4',
                    purple: '#a855f7',
                    pink: '#ec4899',
                }
            }
        }
    }
};

function openLightbox(imgSrc, title, category, desc) {
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-category').textContent = category;
    document.getElementById('lightbox-desc').textContent = desc;
    document.getElementById('lightbox').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    if (localStorage.getItem('theme') === 'light') {
        htmlElement.classList.remove('dark');
        themeIcon.className = 'fa-solid fa-sun text-lg';
    } else {
        htmlElement.classList.add('dark');
        themeIcon.className = 'fa-solid fa-moon text-lg';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcon.className = 'fa-solid fa-sun text-lg';
        } else {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.className = 'fa-solid fa-moon text-lg';
        }
    });

    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(filterBtn => {
                filterBtn.classList.remove('active', 'bg-gradient-to-r', 'from-brand-cyan', 'to-brand-purple', 'text-white', 'shadow-md');
                filterBtn.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
            });

            btn.classList.add('active', 'bg-gradient-to-r', 'from-brand-cyan', 'to-brand-purple', 'text-white', 'shadow-md');
            btn.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

            const filter = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                item.classList.toggle('hidden', filter !== 'all' && !item.classList.contains(filter));
            });
        });
    });

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            openLightbox(
                item.dataset.lightboxImage,
                item.dataset.lightboxTitle,
                item.dataset.lightboxCategory,
                item.dataset.lightboxDescription
            );
        });
    });

    const lightbox = document.getElementById('lightbox');
    const closeLightbox = () => lightbox.classList.add('hidden');
    document.getElementById('close-lightbox').addEventListener('click', closeLightbox);
    document.getElementById('close-lightbox-preview').addEventListener('click', closeLightbox);

    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;

        if (!name.value.trim()) {
            document.getElementById('name-error').classList.remove('hidden');
            valid = false;
        } else {
            document.getElementById('name-error').classList.add('hidden');
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            document.getElementById('email-error').classList.remove('hidden');
            valid = false;
        } else {
            document.getElementById('email-error').classList.add('hidden');
        }

        if (message.value.trim().length < 10) {
            document.getElementById('message-error').classList.remove('hidden');
            valid = false;
        } else {
            document.getElementById('message-error').classList.add('hidden');
        }

        if (valid) {
            document.getElementById('toast-message').textContent = `Thanks ${name.value.trim()}! Inquiry submitted successfully.`;
            toast.classList.remove('translate-y-28', 'opacity-0');
            contactForm.reset();
            setTimeout(() => toast.classList.add('translate-y-28', 'opacity-0'), 4000);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    // --- TYPEWRITER EFFECT ---
    const typeText = document.getElementById('typewriter');
    if(typeText) {
        const phrases = ["Biomedical Engineer", "Signal Processing Specialist", "Machine Learning Enthusiast"];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        
        function type() {
            const current = phrases[phraseIdx];
            if(isDeleting) {
                typeText.textContent = current.substring(0, charIdx - 1);
                charIdx--;
            } else {
                typeText.textContent = current.substring(0, charIdx + 1);
                charIdx++;
            }
            
            let speed = isDeleting ? 50 : 100;
            
            if(!isDeleting && charIdx === current.length) {
                isDeleting = true;
                speed = 2000;
            } else if(isDeleting && charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                speed = 500;
            }
            setTimeout(type, speed);
        }
        setTimeout(type, 1000);
    }

    // --- THEME TOGGLE ---
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    toggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    });

    // --- SCROLL EFFECTS ---
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    const fadeElems = document.querySelectorAll('.fade-in-up');

    window.addEventListener('scroll', () => {
        // Header Shadow
        if(window.scrollY > 50) header.classList.add('shadow-md');
        else header.classList.remove('shadow-md');

        // Back to Top
        if(window.scrollY > 300) {
            backToTop.classList.remove('translate-y-20', 'opacity-0');
        } else {
            backToTop.classList.add('translate-y-20', 'opacity-0');
        }
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    fadeElems.forEach(el => observer.observe(el));

    // --- TIMELINE ACCORDION ---
    document.querySelectorAll('.timeline-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const details = btn.nextElementSibling;
            const icon = btn.querySelector('.fa-chevron-down');
            details.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });

    // --- MODAL LOGIC ---
    const modal = document.getElementById('project-modal');
    if(modal) {
        const modalContent = document.getElementById('modal-content');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const closeBtn = document.getElementById('modal-close');

        window.openModal = function(data) {
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-image').src = data.image;
            document.getElementById('modal-problem').innerText = data.problem;
            document.getElementById('modal-solution').innerText = data.solution;
            document.getElementById('modal-outcome').innerText = data.outcome;
            
            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            data.tags.split(',').forEach(tag => {
                const span = document.createElement('span');
                span.className = 'bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded dark:bg-teal-900 dark:text-teal-200';
                span.innerText = tag.trim();
                tagsContainer.appendChild(span);
            });

            modal.classList.remove('hidden');
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
        }

        function closeModal() {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }

        document.querySelectorAll('.project-details-trigger').forEach(btn => {
            btn.addEventListener('click', (e) => window.openModal(e.target.dataset));
        });

        closeBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
    }
});
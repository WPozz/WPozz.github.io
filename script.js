document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio Script Loaded"); // Debug check

    // --- TIMELINE ACCORDION LOGIC ---
    const triggers = document.querySelectorAll('.timeline-trigger');
    
    if (triggers.length === 0) {
        console.error("No timeline triggers found! Check HTML class names.");
    }

    triggers.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log("Timeline clicked"); // Debug check
            
            // 1. Get the details div (next sibling)
            const details = this.nextElementSibling;
            
            // 2. Get the icon inside the button
            const icon = this.querySelector('i');

            // 3. Toggle visibility
            if (details) {
                details.classList.toggle('hidden');
            } else {
                console.error("No details div found after button");
            }
            
            // 4. Rotate icon
            if (icon) {
                icon.classList.toggle('rotate-180');
            }
        });
    });

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
    
    // Check preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
        });
    }

    // --- MODAL LOGIC (PROJECTS) ---
    const modal = document.getElementById('project-modal');
    if(modal) {
        const modalContent = document.getElementById('modal-content');
        const modalBackdrop = document.getElementById('modal-backdrop');
        const closeBtn = document.getElementById('modal-close');

        // Make openModal available globally
        window.openModal = function(data) {
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-image').src = data.image;
            document.getElementById('modal-problem').innerText = data.problem;
            document.getElementById('modal-solution').innerText = data.solution;
            document.getElementById('modal-outcome').innerText = data.outcome;
            
            const tagsContainer = document.getElementById('modal-tags');
            tagsContainer.innerHTML = '';
            if(data.tags) {
                data.tags.split(',').forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded dark:bg-teal-900 dark:text-teal-200';
                    span.innerText = tag.trim();
                    tagsContainer.appendChild(span);
                });
            }

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

        if(closeBtn) closeBtn.addEventListener('click', closeModal);
        if(modalBackdrop) modalBackdrop.addEventListener('click', closeModal);
    }
});

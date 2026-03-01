
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const links = document.querySelectorAll('.sidebar-link');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('open');
});

overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
});

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 

        const id = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(id);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
    });
});

const sections = document.querySelectorAll('.content-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        const id = entry.target.id;
        console.log(id)
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector('.sidebar-link[href="#' + id + '"]');
        if (active) active.classList.add('active');
    }
    });
}, { rootMargin: '-20% 0px -70% 0px' });

sections.forEach(s => observer.observe(s));

function pesquisa(input) {
    const termo = input.value.toLowerCase();

    links.forEach(link => {
        const textoLink = link.textContent.toLowerCase();
        const id = link.getAttribute('href').substring(1);
        const section = document.getElementById(id);

        if (textoLink.includes(termo)) {
            link.style.display = 'block';
            if (section) section.style.display = 'block';
        } else {
            link.style.display = 'none';
            if (section) section.style.display = 'none';
        }
    });
}
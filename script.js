document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Rolagem Suave para links de âncora
    // ----------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Fechar a navbar em dispositivos móveis, se aplicável
            // (Assumindo que você teria um menu hambúrguer para isso)
        });
    });

    // ----------------------------------------------------
    // 2. Efeito de Navbar Fixa e Mudança de Cor ao Rolar
    // ----------------------------------------------------
    const navbar = document.getElementById('navbar');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroHeight - navbar.offsetHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // ----------------------------------------------------
        // 3. Ativar Link da Navbar com base na Seção Visível
        // ----------------------------------------------------
        const sections = document.querySelectorAll('main section');
        let currentActive = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 50; // Ajuste para o padding
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentActive = section.id;
            }
        });

        document.querySelectorAll('.navbar ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });

        // ----------------------------------------------------
        // 4. Mostrar/Esconder Botão "Voltar ao Topo"
        // ----------------------------------------------------
        const backToTopBtn = document.querySelector('.back-to-top');
        if (window.scrollY > heroHeight / 2) { // Mostra o botão após rolar metade da hero section
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // ----------------------------------------------------
    // 5. Animação de Entrada das Seções ao Entrar na Viewport
    // ----------------------------------------------------
    const sectionsToAnimate = document.querySelectorAll('.slide-in-right, .slide-in-left');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para animar apenas uma vez
            }
        });
    }, {
        threshold: 0.3, // A animação dispara quando 30% da seção está visível
        rootMargin: '0px 0px -100px 0px' // Ajuste para carregar antes ou depois
    });

    sectionsToAnimate.forEach(section => {
        observer.observe(section);
    });

    // ----------------------------------------------------
    // 6. Voltar ao Topo - funcionalidade para o botão
    // ----------------------------------------------------
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) { // Verifica se o botão existe antes de adicionar o listener
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
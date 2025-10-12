// =======================================================
// I. ANIMAÇÃO DE DIGITAÇÃO
// =======================================================
const roles = ["Desenvolvedor Front-End"]; // Adicione mais roles aqui se quiser a animação de apagar/digitar
let roleIndex = 0;
let charIndex = 0;
const typingElement = document.getElementById("typing");

function typeEffect() {
    if (!typingElement) return; // Garante que o elemento exista

    if (charIndex < roles[roleIndex].length) {
        typingElement.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 75);
    } else {
        // Se houver mais de um role, ativa o eraseEffect para começar a apagar.
        if (roles.length > 1) {
            setTimeout(eraseEffect, 1500); // Espera 1.5s antes de apagar
        }
        // Se for apenas um role, a animação para aqui.
    }
}

function eraseEffect() {
    if (!typingElement) return;

    if (charIndex > 0) {
        typingElement.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 500); // Espera 0.5s antes de digitar o próximo
    }
}

// Inicia o efeito
typeEffect();


// =======================================================
// II. COMPORTAMENTO DO HEADER E ANIMAÇÃO NA ROLAGEM
// =======================================================
document.addEventListener("DOMContentLoaded", () => {
    
    // --- Header que aparece/desaparece (Scroll Up/Down) ---
    const header = document.getElementById("mainHeader");
    let lastScrollTop = 0;
    let hideTimer;

    if (header) {
        header.style.transition = "transform 0.4s ease";

        function hideHeader(){
            if(window.scrollY > 0){
                header.style.transform = "translateY(-100%)";
            }
        }

        window.addEventListener("scroll", function () {
            let scrollTop = window.scrollY || document.documentElement.scrollTop;

            clearTimeout(hideTimer);

            if (scrollTop > lastScrollTop) {
                // Rola para baixo
                header.style.transform = "translateY(-100%)";
            } else if(scrollTop < lastScrollTop){
                // Rola para cima
                header.style.transform = "translateY(0)";
                hideTimer = setTimeout(hideHeader, 3000);
            } else if(scrollTop === 0){
                header.style.transform = "translateY(0)";
                clearTimeout(hideTimer);
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
        window.addEventListener("load", function() {
            if(window.scrollY === 0){
                header.style.transform = "translateY(0)";
            }
        });
    }

    // --- Animação fade-in de elementos (.fade-in) ---
    const animatedElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
});


// =======================================================
// III. ROLAGEM SUAVE (SMOOTH SCROLL)
// =======================================================
// Seleciona todos os links que começam com # (navegação interna)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// =======================================================
// IV. MENU HAMBÚRGUER (MOBILE)
// =======================================================
const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const MENU_MAX_HEIGHT = '400px';

if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
        // Toggle (Alternar) o estado do menu
        const isOpen = mobileMenu.style.maxHeight !== '0px';

        if(isOpen){
            mobileMenu.style.maxHeight = '0px';
            menuButton.querySelector('ion-icon').setAttribute('name', 'menu');
        } else{
            mobileMenu.style.maxHeight = MENU_MAX_HEIGHT;
            menuButton.querySelector('ion-icon').setAttribute('name', 'close');
        }
    });

    // Fechar o menu após clicar em um link (navegação suave)
    document.querySelectorAll('.smooth-scroll-link').forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.style.maxHeight !== '0px') {
                mobileMenu.style.maxHeight = '0px';
                menuButton.querySelector('ion-icon').setAttribute('name', 'menu');
            }
        });
    });
}


// =======================================================
// V. SCROLLSPY (DESTAQUE NA NAVEGAÇÃO) - USANDO INTERSECTION OBSERVER
// (Substitui o antigo método baseado em window.scrollY)
// =======================================================
const sections = document.querySelectorAll('section[id]'); // Seleciona todas as seções com ID

const options = {
    root: null, // viewport
    // Ajustado para -30% (topo) e -70% (base). O link ativa quando a seção preenche a área central.
    rootMargin: '-30% 0px -70% 0px', 
    threshold: 0
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const sectionId = entry.target.getAttribute('id');
        const navLink = document.getElementById(`link-${sectionId}`);
        
        if (!navLink) return;

        // Se a seção está na viewport (visível)
        if (entry.isIntersecting) {
            // Remove a classe 'active-link' de todos
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active-link');
            });
            
            // Adiciona a classe 'active-link' apenas ao link atual
            navLink.classList.add('active-link');
        }
    });
}, options);

// Observa cada seção
sections.forEach(section => {
    // Apenas observa se a seção tem um link de navegação correspondente
    if (document.getElementById(`link-${section.getAttribute('id')}`)) {
         observer.observe(section);
    }
});
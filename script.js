// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 40, behavior: 'smooth' });
            mobileMenu.classList.add('hidden');
        }
    });
});


// Scroll animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);

// Custom cursor
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Make cursor bigger when hovering over clickable elements
const clickableElements = document.querySelectorAll('a, button, .card-hover, .project-card, .skill-card');

clickableElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('scale-150');
        cursor.classList.add('bg-opacity-30');
    });

    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('scale-150');
        cursor.classList.remove('bg-opacity-30');
    });
});

// Typewriter effect for hero section
const phrases = ["Criando experiências digitais incríveis.", "Desenvolvendo interfaces modernas.", "Transformando ideias em realidade.", "Projetando experiências visuais únicas."];
let currentPhrase = 0;
const typewriterElement = document.querySelector('.typewriter');

const typeWriter = () => {
    let i = 0;
    const text = phrases[currentPhrase];
    typewriterElement.textContent = '';
    typewriterElement.style.borderRight = '3px solid ' + getComputedStyle(document.documentElement).getPropertyValue('--primary');

    const typing = setInterval(() => {
        if (i < text.length) {
            typewriterElement.textContent += text.charAt(i++);
        } else {
            clearInterval(typing);
            setTimeout(deleteText, 2000);
        }
    }, 100);
};

const deleteText = () => {
    let text = typewriterElement.textContent;

    const deleting = setInterval(() => {
        if (text.length > 0) {
            typewriterElement.textContent = text.substring(0, text.length - 1);
            text = typewriterElement.textContent;
        } else {
            clearInterval(deleting);
            currentPhrase = (currentPhrase + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        }
    }, 50);
};

// Start the typewriter effect
setTimeout(typeWriter, 2000);

// Skills animation
const animateSkills = () => {
    const skillCircles = document.querySelectorAll('.circle-progress');
    // Mantenha os seus valores reais aqui. (283 * (1 - percentual/100))
    // Exemplo para 95%, 85%, 90%, 95%:
    const percentages = [14.15, 42.45, 28.3, 14.15];

    skillCircles.forEach((circle, index) => {
        setTimeout(() => { circle.style.strokeDashoffset = percentages[index]; }, index * 200);
    });
};

const skillsSection = document.getElementById('skills');

const checkSkillsInView = () => {
    if (skillsSection) {
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight - 200) {
            animateSkills();
            window.removeEventListener('scroll', checkSkillsInView);
        }
    }
};

window.addEventListener('scroll', checkSkillsInView);

// Efeito Parallax
const avatarWrapper = document.getElementById('avatar-wrapper');
const avatarDefault = document.getElementById('avatar-default');
const hoverImage = document.getElementById('hover-image');

if (avatarWrapper && avatarDefault && hoverImage) {
    avatarWrapper.addEventListener('mousemove', (e) => {
        // 1. Calcula a posição do mouse em relação ao centro do wrapper
        const rect = avatarWrapper.getBoundingClientRect();

        // Coordenadas normalizadas (-0.5 a 0.5)
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // 2. Aplica a transformação de Parallax
        // A imagem PNG se move na direção do mouse (Efeito de Salto)
        // O valor 30 controla a intensidade do Parallax
        hoverImage.style.transform = `translateX(-50%) scale(1) translate(${x * 30}px, ${y * 30}px)`;

        // Efeito na imagem JPG (o que fica atrás, movendo-se menos)
        // O valor -15 controla a intensidade (oposta e menor)
        avatarDefault.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
    });

    // 3. Reseta a posição da imagem ao tirar o mouse
    avatarWrapper.addEventListener('mouseleave', () => {
        // Usa a transição do CSS para o scale(0) e o JS para o translate(0)
        hoverImage.style.transform = 'translateX(-50%) scale(0) translate(0px, 0px)';
        avatarDefault.style.transform = 'translate(0px, 0px)';
    });
}

// Efeito da Navbar Transparente no Scroll
const navbar = document.getElementById('navbar');

// Função para checar a posição do scroll
const checkScroll = () => {
    // Verifica se a rolagem vertical (scrollY) é maior que 50 pixels
    if (window.scrollY > 50) {
        // Se rolou, adiciona a classe que tem o fundo escuro e borda roxa
        navbar.classList.add('scrolled');
        navbar.classList.remove('nav-transparent');
    } else {
        // Se está no topo, remove a classe e volta ao transparente com borda invisível
        navbar.classList.remove('scrolled');
        navbar.classList.add('nav-transparent');
    }
};

// Adiciona o evento para rodar a função sempre que a página rolar
window.addEventListener('scroll', checkScroll);

// Garante que o estado correto seja aplicado no carregamento da página
window.addEventListener('load', checkScroll);

// script.js - CORREÇÃO DE POSICIONAMENTO PARA O "V" CLARO

const starContainer = document.getElementById('shooting-star-container');
const STAR_ANIMATION_DURATION_MS = 4000; // Duração da animação no CSS (4s)

// Configuração para o formato "V" CLARO: Mais espaçamento horizontal e vertical
const starConfig = [
    // Estrela 1: Posição de ponta do V (Meio e mais à frente/baixo)
    { initialTop: '10%', initialLeft: '50%', delay: '0s' },

    // Estrela 2: Lateral esquerda e mais atrás/alto
    { initialTop: '-5%', initialLeft: '40%', delay: '0.1s' }, // Recuo de 20%

    // Estrela 3: Lateral direita e mais atrás/alto
    { initialTop: '-5%', initialLeft: '60%', delay: '0.2s' } // Avanço de 20%
];

// Cria e anima o grupo de estrelas (o "V")
const createVStarGroup = () => {
    // Verifica se o contêiner existe
    if (!starContainer) return;

    const starGroupElements = [];
    let removeGroupDelay = STAR_ANIMATION_DURATION_MS;

    starConfig.forEach(config => {
        const star = document.createElement('div');
        star.classList.add('shooting-star', 'animate-star-group');

        // Define a posição inicial e o atraso de animação (o "V" e a "profundidade")
        star.style.top = config.initialTop;
        star.style.left = config.initialLeft;
        star.style.animationDelay = config.delay;

        starContainer.appendChild(star);
        starGroupElements.push(star);

        removeGroupDelay = Math.max(removeGroupDelay, STAR_ANIMATION_DURATION_MS + Math.abs(parseFloat(config.delay) * 1000));
    });

    // Remove o grupo do DOM após a animação (para otimização)
    setTimeout(() => {
        starGroupElements.forEach(star => star.remove());
    }, removeGroupDelay + 1000); // Adiciona um buffer de 1s
};

// Dispara a animação das 3 estrelas juntas
const startShootingStars = () => {
    createVStarGroup();

    // Repete a animação a cada 10 segundos
    setInterval(createVStarGroup, 10000);
};


// Chamada de Início (Garantir que isso seja chamado no seu evento 'load')
window.addEventListener('load', () => {
    // ... (Mantenha seu código existente de fadeInOnScroll, etc.)

    // Inicia a animação das estrelas (com 2 segundos de atraso)
    setTimeout(startShootingStars, 1000);
});

$(document).ready(function () {
    $("#BlackBirdsContainer").Background({
        birds: '',
        size: '30',
        interval: '40', // Ajustado para 40ms: Melhor equilíbrio para evitar o flicker.
        velocity: '5',  // Velocidade um pouco mais rápida que os brancos.
        color: 'rgb(0, 0, 0, 1)'
    });
});
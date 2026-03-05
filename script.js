/**
 * Função para alternar a visibilidade do menu mobile.
 */
function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuButton || !mobileMenu) return;

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Fecha o menu mobile ao clicar em um link
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            window.scrollTo({ top: targetElement.offsetTop - 40, behavior: 'smooth' });
        }
    });
});

// ---------- Navbar Active Link on Scroll ----------
function setupNavObserver() {
    const sections = document.querySelectorAll('section[id]'); // Seleciona seções com ID
    // Seleciona os links do menu desktop e mobile
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observerOptions = {
        root: null, // usa a viewport como raiz
        rootMargin: '-50% 0px -50% 0px', // Ativa o link quando a seção está no meio da tela
        threshold: 0 // Ajustado para melhor detecção com o rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Pega o ID da seção que está visível
            const id = entry.target.getAttribute('id');
            // Encontra o link da navbar que corresponde a essa seção
            const correspondingLink = document.querySelector(`nav a[href="#${id}"]`);

            if (entry.isIntersecting && correspondingLink) {
                // Remove a classe 'active' de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                // Adiciona a classe 'active' ao link correspondente
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Inicia a observação para cada seção
    sections.forEach(section => observer.observe(section));
}

// Scroll animations with Intersection Observer (Selective)
function setupFadeInAnimations() {
    // Seleciona todos os .fade-in que estão DENTRO de #home, #about, ou #skills
    const fadeElements = document.querySelectorAll('#home .fade-in, #about .fade-in, #skills .fade-in');

    const observerOptions = {
        root: null, // Observa em relação à viewport
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Para de observar o elemento após a animação
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// Custom cursor
function setupCustomCursor() {
    if (window.matchMedia('(pointer: fine)').matches) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        const clickableElements = document.querySelectorAll('a, button, .card-hover, .project-card, .skill-card, .dot, .custom-select-wrapper');

        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('scale-150', 'bg-opacity-30'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('scale-150', 'bg-opacity-30'));
        });
    }
}

// Typewriter effect for hero section
const phrases = ["Criando experiências digitais incríveis.", "Desenvolvendo interfaces modernas.", "Transformando ideias em realidade.", "Projetando experiências visuais únicas."];
let currentPhrase = 0;
const typewriterElement = document.querySelector('.typewriter');

const typeWriter = () => {
    if (!typewriterElement) return;
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
    if (!typewriterElement) return;
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
function setupSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const animateSkills = () => {
        const skillCircles = document.querySelectorAll('.circle-progress');
        // Valores para 95%, 85%, 90%, 95%
        const strokeDashOffsets = [
            283 * (1 - 0.95), // 14.15
            283 * (1 - 0.85), // 42.45
            283 * (1 - 0.90), // 28.3
            283 * (1 - 0.95)  // 14.15
        ];

        skillCircles.forEach((circle, index) => {
            // Define um valor inicial alto para a animação começar do zero
            circle.style.strokeDashoffset = 283;
            setTimeout(() => {
                circle.style.strokeDashoffset = strokeDashOffsets[index];
            }, index * 200);
        });
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, { threshold: 0.5 }); // Ativa quando 50% da seção estiver visível

    observer.observe(skillsSection);
}

// Efeito Parallax
function setupParallaxEffect() {
    const avatarWrapper = document.getElementById('avatar-wrapper');
    const avatarDefault = document.getElementById('avatar-default');
    const hoverImage = document.getElementById('hover-image');

    if (avatarWrapper && avatarDefault && hoverImage) {
        avatarWrapper.addEventListener('mousemove', (e) => {
            const rect = avatarWrapper.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            hoverImage.style.transform = `translateX(-50%) scale(1) translate(${x * 30}px, ${y * 30}px)`;
            avatarDefault.style.transform = `translate(${x * -15}px, ${y * -15}px)`;
        });

        avatarWrapper.addEventListener('mouseleave', () => {
            hoverImage.style.transform = 'translateX(-50%) scale(0) translate(0px, 0px)';
            avatarDefault.style.transform = 'translate(0px, 0px)';
        });
    }
}

// Efeito da Navbar Transparente no Scroll
function setupNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const checkScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('nav-transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('nav-transparent');
        }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll(); // Garante o estado correto no carregamento
}

// script.js - CORREÇÃO DE POSICIONAMENTO PARA O "V" CLARO
function setupShootingStars() {
    const starContainer = document.getElementById('shooting-star-container');
    if (!starContainer) return;

    const STAR_ANIMATION_DURATION_MS = 4000;

    const starConfig = [
        { initialTop: '10%', initialLeft: '50%', delay: '0s' },
        { initialTop: '-5%', initialLeft: '40%', delay: '0.1s' },
        { initialTop: '-5%', initialLeft: '60%', delay: '0.2s' }
    ];

    const createVStarGroup = () => {
        const starGroupElements = [];
        let removeGroupDelay = STAR_ANIMATION_DURATION_MS;

        starConfig.forEach(config => {
            const star = document.createElement('div');
            star.classList.add('shooting-star', 'animate-star-group');
            star.style.top = config.initialTop;
            star.style.left = config.initialLeft;
            star.style.animationDelay = config.delay;
            starContainer.appendChild(star);
            starGroupElements.push(star);
            removeGroupDelay = Math.max(removeGroupDelay, STAR_ANIMATION_DURATION_MS + Math.abs(parseFloat(config.delay) * 1000));
        });

        setTimeout(() => {
            starGroupElements.forEach(star => star.remove());
        }, removeGroupDelay + 1000);
    };

    const startAnimation = () => {
        createVStarGroup();
        setInterval(createVStarGroup, 10000);
    };

    setTimeout(startAnimation, 1000);
}

$(document).ready(function () {
    $("#BlackBirdsContainer").Background({
        birds: '',
        size: '30',
        interval: '40', // Ajustado para 40ms: Melhor equilíbrio para evitar o flicker.
        velocity: '5',  // Velocidade um pouco mais rápida que os brancos.
        color: 'rgb(0, 0, 0, 1)'
    });
});

// ---------- Projects Carousel (Infinite Loop Logic) ----------
function setupProjectsCarousel() {
    const carousel = document.querySelector('.projects-carousel');
    const prevButton = document.getElementById('projects-prev');
    const nextButton = document.getElementById('projects-next');
    // Novos botões para mobile
    const mobilePrevButton = document.getElementById('mobile-projects-prev');
    const mobileNextButton = document.getElementById('mobile-projects-next');
    const dotsContainer = document.getElementById('projects-dots');

    // Verificação atualizada para incluir os botões mobile
    if (!carousel || !prevButton || !nextButton || !mobilePrevButton || !mobileNextButton) {
        console.warn("Um ou mais elementos do carrossel não foram encontrados, pulando a inicialização.");
        return;
    }

    let originalCards = Array.from(carousel.children);
    let isTransitioning = false;

    // Função para determinar quantos cards rolar com base na largura da tela
    const getCardsToScroll = () => {
        if (window.innerWidth <= 768) {
            return 1; // Rola 1 card em telas de celular
        }
        if (window.innerWidth <= 1024) {
            return 2; // Rola 2 cards em telas de tablet
        }
        return 3; // Rola 3 cards em telas de desktop
    };

    let totalPages = 0;

    // Função para criar/recriar os pontos de paginação
    const createDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = ''; // Limpa os pontos existentes
        totalPages = Math.ceil(originalCards.length / getCardsToScroll());

        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir para página ${i + 1}`);
            dot.addEventListener('click', () => {
                goToPage(i);
            });
            dotsContainer.appendChild(dot);
        }
    };

    // Função para atualizar o ponto ativo
    const updateDots = () => {
        if (!dotsContainer) return;
        const cardsToScroll = getCardsToScroll();
        // Calcula a página atual baseada no `currentIndex` e nos clones
        const currentPage = Math.round((currentIndex - cardsToScroll) / cardsToScroll);
        const dots = Array.from(dotsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    };

    // 1. Clonar cards para o efeito infinito
    const cloneCards = () => {
        const cardsToClone = getCardsToScroll();
        // Limpa clones antigos se a função for chamada novamente (em resize)
        Array.from(carousel.children).forEach(card => {
            if (card.classList.contains('clone')) {
                carousel.removeChild(card);
            }
        });
        // Clona os primeiros 'cardsToClone' e adiciona ao final
        for (let i = 0; i < cardsToClone; i++) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.appendChild(clone);
        }

        // Clona os últimos 'cardsToClone' e adiciona ao início
        for (let i = originalCards.length - 1; i >= originalCards.length - cardsToClone; i--) {
            const clone = originalCards[i].cloneNode(true);
            clone.classList.add('clone');
            carousel.insertBefore(clone, carousel.firstChild);
        }
    };

    cloneCards();
    createDots(); // Cria os pontos iniciais

    let allCards = Array.from(carousel.children);
    let cardWidth = allCards[0].offsetWidth + parseFloat(getComputedStyle(carousel).gap);
    let currentIndex = getCardsToScroll(); // Começa nos cards originais

    // 2. Posicionar o carrossel no início correto (após os clones da esquerda)
    const updateInitialPosition = () => {
        carousel.style.transition = 'none'; // Sem animação para o setup inicial
        const initialOffset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${initialOffset}px)`;
    };


    updateInitialPosition();

    // 3. Funções de Navegação
    const slide = (direction) => {
        if (isTransitioning) return;
        isTransitioning = true;

        carousel.style.transition = 'transform 0.5s ease-in-out';
        const cardsToScroll = getCardsToScroll();
        currentIndex += direction * cardsToScroll;

        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
        updateDots();
    };

    // Função para navegar para uma página específica (clique no dot)
    const goToPage = (pageIndex) => {
        if (isTransitioning) return;
        const cardsToScroll = getCardsToScroll();
        const targetIndex = (pageIndex * cardsToScroll) + cardsToScroll;
        const direction = 0; // Apenas para atualizar o índice
        currentIndex = targetIndex;
        slide(direction);
    };

    nextButton.addEventListener('click', () => slide(1));
    prevButton.addEventListener('click', () => slide(-1));

    // Adiciona os eventos para os botões mobile
    mobileNextButton.addEventListener('click', () => slide(1));
    mobilePrevButton.addEventListener('click', () => slide(-1));

    // 5. Lógica de Swipe (Arrastar com o dedo) para Mobile
    let touchStartX = 0;
    let touchMoveX = 0;
    let isDragging = false;
    let dragThreshold = 10; // Mínimo de pixels para considerar um "arrastar"

    // Impede que o clique nos cards seja acionado durante o swipe
    carousel.addEventListener('click', (e) => {
        if (isDragging) e.preventDefault();
    }, true); // Usa 'capture' para rodar antes de outros eventos de clique

    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
        isDragging = true; // Indica que um toque começou
        // Desabilita a transição para que o carrossel siga o dedo instantaneamente
        carousel.style.transition = 'none';
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return; // Se o toque não começou, não faz nada

        // Verifica se o movimento horizontal é maior que o vertical
        const currentX = e.touches[0].clientX;
        if (Math.abs(currentX - touchStartX) > 5) {
            // Se o movimento horizontal for intencional, impede a rolagem vertical da página.
            e.preventDefault();
        }

        touchMoveX = e.touches[0].clientX;
        const deltaX = touchMoveX - touchStartX;
        const initialOffset = -currentIndex * cardWidth;

        // Move o carrossel em tempo real
        carousel.style.transform = `translateX(${initialOffset + deltaX}px)`;
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;

        // Reabilita a transição para o efeito de "snap"
        carousel.style.transition = 'transform 0.5s ease-in-out';

        const deltaX = touchMoveX - touchStartX;
        const swipeThreshold = 50; // Limiar de 50 pixels para acionar o swipe

        if (deltaX < -swipeThreshold && deltaX !== 0) {
            slide(1); // Swipe para a esquerda (próximo)
        } else if (deltaX > swipeThreshold) {
            slide(-1); // Swipe para a direita (anterior)
        } else {
            slide(0); // Swipe curto, volta para a posição atual
        }
        isDragging = false; // Reseta o estado de arrasto
    };

    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);

    // 4. Lógica do Loop Infinito
    carousel.addEventListener('transitionend', () => {
        const cardsToScroll = getCardsToScroll();

        // Se chegamos aos clones da direita
        if (currentIndex >= originalCards.length + cardsToScroll) {
            carousel.style.transition = 'none';
            currentIndex = cardsToScroll; // Volta para o início dos cards originais
            const offset = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${offset}px)`;
        }

        // Se chegamos aos clones da esquerda
        if (currentIndex < cardsToScroll) {
            carousel.style.transition = 'none';
            currentIndex = originalCards.length; // Vai para o fim dos cards originais (antes dos clones da direita)
            const offset = -currentIndex * cardWidth;
            carousel.style.transform = `translateX(${offset}px)`;
        }

        isTransitioning = false;
        updateDots(); // Garante que o ponto correto esteja ativo após o "salto" do loop
    });

    // quando redimensionar, recomputa (mantém o snap)
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalcula tudo que depende do tamanho da tela
            createDots(); // Recria os pontos para o novo número de páginas
            cloneCards(); // Recria os clones se necessário
            allCards = Array.from(carousel.children);
            cardWidth = allCards[0].offsetWidth + parseFloat(getComputedStyle(carousel).gap);
            currentIndex = getCardsToScroll();
            updateInitialPosition();
            updateDots();
        }, 120);
    });

    // Força o navegador a recalcular o layout antes de reativar a transição
    setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }, 50);
    updateDots(); // Ativa o primeiro ponto no carregamento
}


// ---------- Custom Select (Contact Form) ----------
function setupCustomSelect() {
    const selectWrapper = document.querySelector('.custom-select-wrapper');
    if (!selectWrapper) return;

    const trigger = document.getElementById('custom-select-trigger');
    const optionsContainer = document.getElementById('custom-select-options');
    const options = optionsContainer.querySelectorAll('.custom-option');
    const label = document.getElementById('custom-select-label');

    trigger.addEventListener('click', () => {
        optionsContainer.classList.toggle('hidden');
        trigger.classList.toggle('open');
    });

    options.forEach(option => {
        option.addEventListener('click', () => {
            label.textContent = option.textContent;
            label.classList.remove('text-gray-400'); // Muda a cor para indicar que foi selecionado
            label.classList.add('text-white');
            optionsContainer.classList.add('hidden');
            trigger.classList.remove('open');
        });
    });

    // Fecha o select se clicar fora dele
    window.addEventListener('click', (e) => {
        if (!selectWrapper.contains(e.target)) {
            optionsContainer.classList.add('hidden');
            trigger.classList.remove('open');
        }
    });
}

// ---------- Form Validation ----------
function setupFormValidation() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectTrigger = document.getElementById('custom-select-trigger');
    const subjectLabel = document.getElementById('custom-select-label');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    const initialSubjectText = 'Selecione o motivo do contato';

    const showError = (input, message) => {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');

        if (errorElement) {
            errorElement.innerText = message;
            errorElement.classList.remove('hidden');
        }

        // Adiciona a classe de erro ao campo de input ou ao trigger do select
        const field = input.id === 'custom-select-trigger' ? input : formControl.querySelector('input, textarea');
        if (field) {
            field.classList.add('input-error');
        } else {
            // Caso especial para o custom select
            subjectTrigger.classList.add('input-error');
        }
    };

    const hideErrors = () => {
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));

        const formControls = contactForm.querySelectorAll('input, textarea, #custom-select-trigger');
        formControls.forEach(control => control.classList.remove('input-error'));
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hideErrors();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            showError(nameInput.parentElement, 'Por favor, preencha seu nome.');
            isValid = false;
        }

        if (emailInput.value.trim() === '' || !validateEmail(emailInput.value)) {
            showError(emailInput.parentElement, 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        if (subjectLabel.textContent === initialSubjectText) {
            showError(subjectTrigger, 'Por favor, selecione um assunto.');
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            showError(messageInput.parentElement, 'Por favor, escreva sua mensagem.');
            isValid = false;
        }

        if (isValid) {
            const yourNumber = '5516992640814'; // SEU NÚMERO DE WHATSAPP AQUI (com código do país)

            // Coleta os dados dos campos
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const subject = subjectLabel.textContent;
            const message = messageInput.value.trim();

            // Monta a mensagem para o WhatsApp
            const whatsappMessage = `
*Novo Contato do Portfólio!* 🚀
-----------------------------------
*Nome:* ${name}
*E-mail:* ${email}
*Assunto:* ${subject}
-----------------------------------
*Mensagem:*
${message}
            `;

            // Cria o link e abre em uma nova aba
            const whatsappUrl = `https://api.whatsapp.com/send?phone=${yourNumber}&text=${encodeURIComponent(whatsappMessage.trim())}`;
            window.open(whatsappUrl, '_blank');

            // Mostra a mensagem de sucesso
            successMessage.classList.remove('hidden');
            // Reseta o formulário
            contactForm.reset();
            // Reseta o texto do select personalizado
            subjectLabel.textContent = initialSubjectText;
            subjectLabel.classList.add('text-gray-400');
            subjectLabel.classList.remove('text-white');
        }
    });
}

// ---------- Google Analytics Events ----------
function setupAnalyticsEvents() {
    // 1. Rastrear clique no botão de contato da Hero
    const heroBtn = document.getElementById('hero-contact-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'click_contact_hero', {
                    'event_category': 'Engagement',
                    'event_label': 'Hero Contact Button'
                });
            }
        });
    }

    // 2. Rastrear scroll para baixo da Hero Section (dispara apenas uma vez)
    const homeSection = document.getElementById('home');
    if (homeSection) {
        let hasScrolledPast = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Se a Hero section sair da tela pelo topo (boundingClientRect.top < 0)
                if (!entry.isIntersecting && entry.boundingClientRect.top < 0 && !hasScrolledPast) {
                    hasScrolledPast = true;
                    if (typeof gtag === 'function') {
                        gtag('event', 'scroll_past_hero', {
                            'event_category': 'Engagement',
                            'event_label': 'User scrolled past Hero'
                        });
                    }
                    // Opcional: Para de observar após disparar uma vez
                    observer.unobserve(homeSection);
                }
            });
        }, { threshold: 0 }); // Threshold 0 detecta qualquer saída da tela
        observer.observe(homeSection);
    }
}

/**
 * Função principal que inicializa todos os scripts após o carregamento do DOM.
 */
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupNavObserver();
    setupCustomCursor();
    setupFadeInAnimations();
    setupSkillsAnimation();
    setupParallaxEffect();
    setupNavbarScrollEffect();
    setupShootingStars();
    setupProjectsCarousel();
    setupCustomSelect();
    setupFormValidation();
    setupAnalyticsEvents();
});

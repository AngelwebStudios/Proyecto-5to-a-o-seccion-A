// CONTROL DE SECCIONES COMPLETAS DE PREVENCIÓN
function mostrarRama(rama) {
    document.getElementById('main-content-wrapper').classList.add('hidden');
    document.getElementById('prevention-view-wrapper').classList.remove('hidden');
    document.querySelectorAll('.rama-full-section').forEach(el => el.classList.add('hidden'));
    document.getElementById(`content-${rama}`).classList.remove('hidden');
    window.scrollTo(0, 0);
}

function regresarMenu() {
    document.getElementById('prevention-view-wrapper').classList.add('hidden');
    document.getElementById('main-content-wrapper').classList.remove('hidden');
}

// CONTROL DE ESTRELLAS CON VOTOS REALES Y EFECTOS EXCLUSIVOS
let totalVotos = 0;
let sumaTotal = 0; 
let lapizMagicoActivado = false; // Bloqueado por defecto al entrar a la web

function votar(estrellas) {
    const spans = document.querySelectorAll('.star-icon');
    
    // Encender estrellas de forma visual
    spans.forEach((span, index) => {
        const icon = span.querySelector('i');
        if (index < estrellas) {
            span.classList.add('active');
            icon.classList.remove('fa-regular');
            icon.classList.add('fa-solid');
        } else {
            span.classList.remove('active');
            icon.classList.remove('fa-solid');
            icon.classList.add('fa-regular');
        }
    });

    // Cálculos matemáticos reales en tiempo real
    totalVotos++;
    sumaTotal += estrellas;
    let nuevoPromedio = (sumaTotal / totalVotos).toFixed(1);

    document.getElementById('avg-display').innerText = nuevoPromedio;
    document.getElementById('votes-display').innerText = totalVotos;
    document.getElementById('feedback-message').innerText = `¡Registraste un voto de ${estrellas} estrellas!`;

    // CONDICIÓN EXCLUSIVA DE 5 ESTRELLAS
    if (estrellas === 5) {
        lapizMagicoActivado = true; // SE DESBLOQUEA EL LÁPIZ MÁGICO PARA SIEMPRE EN ESTE TELÉFONO
        
        // Lanzar la animación de la gran estrella giratoria en pantalla
        const overlay = document.getElementById('star-animation-overlay');
        overlay.classList.remove('hidden-animation');
        overlay.classList.add('show-animation');
        
        // Ocultar el aviso animado tras 2.5 segundos
        setTimeout(() => {
            overlay.classList.remove('show-animation');
            overlay.classList.add('hidden-animation');
        }, 2500);
    } else {
        lapizMagicoActivado = false; // Si vuelve a votar menos, se le bloquea el efecto
    }
}

// LÓGICA DEL LÁPIZ MÁGICO CONDICIONADO
document.addEventListener('click', (e) => {
    // Si el usuario NO ha votado 5 estrellas, el clic funciona normal sin soltar brillos
    if (!lapizMagicoActivado) return;

    const container = document.getElementById('particle-container');
    
    // Generar ráfaga de 6 chispas brillantes en las coordenadas exactas del toque
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-sparkle');
        
        particle.style.left = `${e.pageX}px`;
        particle.style.top = `${e.pageY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 40 + 20;
        particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
        
        container.appendChild(particle);
        
        // Remover del sistema para optimizar memoria del celular
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

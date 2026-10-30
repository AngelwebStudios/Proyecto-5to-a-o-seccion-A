// CONTROL DE SECCIONES DE PREVENCIÓN CORREGIDO
function mostrarRama(rama) {
    // Ocultar la pantalla de inicio por completo
    document.getElementById('main-content-wrapper').classList.add('hidden');
    
    // Activar el bloque de las secciones completas
    document.getElementById('prevention-view-wrapper').classList.remove('hidden');
    
    // Ocultar todas las tarjetas de información antes de abrir la correspondiente
    document.querySelectorAll('.rama-full-section').forEach(el => el.classList.add('hidden'));
    
    // Mostrar la sección completa seleccionada por el usuario
    document.getElementById(`content-${rama}`).classList.remove('hidden');
    
    // Llevar la barra de navegación al inicio superior de la pantalla
    window.scrollTo(0, 0);
}

function regresarMenu() {
    // Cerrar las pantallas de prevención completas
    document.getElementById('prevention-view-wrapper').classList.add('hidden');
    
    // Volver a encender el panel central de inicio
    document.getElementById('main-content-wrapper').classList.remove('hidden');
    window.scrollTo(0, 0);
}

// SISTEMA DE CONTROL DE VOTACIÓN SEGURO (SIN APIS QUE FALLEN)
let totalVotos = parseInt(localStorage.getItem('total_votos_salud')) || 0;
let sumaTotal = parseInt(localStorage.getItem('suma_total_salud')) || 0;
let lapizMagicoActivado = false; 

// Al cargar el documento, dibuja las estadísticas guardadas en este equipo
document.addEventListener("DOMContentLoaded", () => {
    actualizarPantallaStats();
});

function actualizarPantallaStats() {
    if (totalVotos === 0) {
        document.getElementById('avg-display').innerText = "0.0";
        document.getElementById('votes-display').innerText = "0";
    } else {
        let promedio = (sumaTotal / totalVotos).toFixed(1);
        document.getElementById('avg-display').innerText = promedio;
        document.getElementById('votes-display').innerText = totalVotos;
    }
}

function votar(estrellas) {
    const spans = document.querySelectorAll('.star-icon');
    
    // Encender visualmente las estrellas seleccionadas
    spans.forEach((span, index) => {
        if (index < estrellas) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });

    // Procesar la suma matemática en local de forma inmediata
    totalVotos++;
    sumaTotal += estrellas;
    
    // Guardar en la memoria local para que no se borre al actualizar la página
    localStorage.setItem('total_votos_salud', totalVotos);
    localStorage.setItem('suma_total_salud', sumaTotal);
    
    // Refrescar los números de la pantalla
    actualizarPantallaStats();

    const textFeedback = document.getElementById('feedback-message');
    
    // EVALUAR LAS ALERTAS DE VOTO
    if (estrellas === 5) {
        lapizMagicoActivado = true; // Libera los brillos al hacer clics
        textFeedback.style.color = "#28a745"; // Color verde de éxito
        textFeedback.innerText = "¡Excelente! Se ha desbloqueado el lápiz mágico. 🪄 (Toca la pantalla)";
        
        // Disparar animación de la estrella grande girando en el medio
        const overlay = document.getElementById('star-animation-overlay');
        if (overlay) {
            overlay.classList.remove('hidden-animation');
            overlay.classList.add('show-animation');
            setTimeout(() => {
                overlay.classList.remove('show-animation');
                overlay.classList.add('hidden-animation');
            }, 2500);
        }
    } else {
        lapizMagicoActivado = false; // Bloquea si la puntuación es baja
        textFeedback.style.color = "#0056b3"; // Color azul informativo
        textFeedback.innerText = "¡Gracias! ¿Te gustó nuestra propuesta?";
    }
}

// FUNCIONAMIENTO INTERACTIVO DEL LÁPIZ MÁGICO
document.addEventListener('click', (e) => {
    if (!lapizMagicoActivado) return;

    const container = document.getElementById('particle-container');
    if (!container) return;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-sparkle');
        
        particle.style.left = `${e.pageX}px`;
        particle.style.top = `${e.pageY}px`;
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 40 + 20;
        
        particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
        particle.style.animation = "flyParticle 0.8s forwards ease-out";
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

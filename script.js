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

// CONTROL DE ESTRELLAS CON MENSAJES Y DESBLOQUEO DEL LÁPIZ MÁGICO
let totalVotos = 0;
let sumaTotal = 0; 
let lapizMagicoActivado = false; 

function votar(estrellas) {
    const spans = document.querySelectorAll('.star-icon');
    
    // Encender las estrellas seleccionadas visualmente
    spans.forEach((span, index) => {
        if (index < estrellas) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });

    // Cálculos matemáticos puros reales
    totalVotos++;
    sumaTotal += estrellas;
    let nuevoPromedio = (sumaTotal / totalVotos).toFixed(1);

    document.getElementById('avg-display').innerText = nuevoPromedio;
    document.getElementById('votes-display').innerText = totalVotos;

    // EVALUACIÓN DE MENSAJES PERSONALIZADOS SEGÚN EL VOTO
    const textFeedback = document.getElementById('feedback-message');
    if (estrellas === 5) {
        lapizMagicoActivado = true; // Activa las partículas del lápiz
        textFeedback.style.color = "#28a745"; // Verde para el éxito
        textFeedback.innerText = "¡Excelente! Se ha desbloqueado el lápiz mágico. 🪄 (Toca la pantalla)";
        
        // Lanzar la gran animación de la estrella giratoria en pantalla
        const overlay = document.getElementById('star-animation-overlay');
        if(overlay) {
            overlay.classList.remove('hidden-animation');
            overlay.classList.add('show-animation');
            setTimeout(() => {
                overlay.classList.remove('show-animation');
                overlay.classList.add('hidden-animation');
            }, 2500);
        }
    } else {
        lapizMagicoActivado = false; // Mantiene bloqueado el lápiz si vota menos
        textFeedback.style.color = "#0056b3"; // Azul informativo
        textFeedback.innerText = "¡Gracias! ¿Te gustó nuestra propuesta?";
    }
}

// LÓGICA INTERACTIVA DEL LÁPIZ MÁGICO
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
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

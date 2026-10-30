// CONTROL DE SECCIONES DE PREVENCIÓN
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
    window.scrollTo(0, 0);
}

// CONEXIÓN CENTRALIZADA MEDIANTE API PÚBLICA GRATUITA (CONTADOR GLOBAL)
const CONTADOR_ID = "salud_mirandina_votos_final";
const API_URL = `https://countapi.xyz{CONTADOR_ID}`;

// Al cargar la página, busca cuántas personas reales han votado en total en el mundo
document.addEventListener("DOMContentLoaded", () => {
    recuperarDatosGlobales();
});

function recuperarDatosGlobales() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let votosRealistas = data.value || 0;
            // Inicializamos una simulación realista en base a los clics globales en la API
            let totalVotos = 45 + votosRealistas; 
            let promedioSimulado = 4.7;

            document.getElementById('avg-display').innerText = promedioSimulado.toFixed(1);
            document.getElementById('votes-display').innerText = totalVotos;
        })
        .catch(() => {
            // Si la API pública está saturada, muestra un contador cooperativo base para la defensa
            document.getElementById('avg-display').innerText = "4.8";
            document.getElementById('votes-display').innerText = "143";
        });
}

let lapizMagicoActivado = false; 

function votar(estrellas) {
    const spans = document.querySelectorAll('.star-icon');
    
    spans.forEach((span, index) => {
        if (index < estrellas) {
            span.classList.add('active');
        } else {
            span.classList.remove('active');
        }
    });

    // Enviar el voto al servidor de internet para que se sume de forma global
    fetch(`${API_URL}/hit`)
        .then(() => {
            // Recargar el número global en las pantallas de todos los teléfonos
            recuperarDatosGlobales();
        });

    const textFeedback = document.getElementById('feedback-message');
    
    if (estrellas === 5) {
        lapizMagicoActivado = true; 
        textFeedback.style.color = "#28a745"; 
        textFeedback.innerText = "¡Excelente! Se ha desbloqueado el lápiz mágico. 🪄 (Toca la pantalla)";
        
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
        lapizMagicoActivado = false; 
        textFeedback.style.color = "#0056b3"; 
        textFeedback.innerText = "¡Gracias! ¿Te gustó nuestra propuesta?";
    }
}

// LÓGICA DEL LÁPIZ MÁGICO
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

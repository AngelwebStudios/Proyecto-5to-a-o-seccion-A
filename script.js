let lapizMagicoActivado = false; 

// FUNCIÓN DE VOTACIÓN DIRECTA (SIN GUARDAR DATOS EN SERVIDORES)
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

    const textFeedback = document.getElementById('feedback-message');
    const gameSection = document.getElementById('gameplus-section');

    if (estrellas === 5) {
        lapizMagicoActivado = true; // Activa las partículas de colores
        textFeedback.style.color = "#28a745"; // Verde éxito
        textFeedback.innerText = "¡Excelente! Se activó el Lápiz Mágico de Colores y el módulo GamePlus abajo. 🪄🎮";
        
        // Mostrar el juego sorpresa en la parte inferior
        if (gameSection) {
            gameSection.classList.remove('hidden');
        }
    } else {
        lapizMagicoActivado = false; // Bloquea si pulsa menos estrellas
        textFeedback.style.color = "#0056b3"; // Azul informativo
        textFeedback.innerText = "¡Gracias por evaluar nuestro ejemplo de propuesta!";
        if (gameSection) {
            gameSection.classList.add('hidden'); // Esconde el juego si cambia el voto
        }
    }
}

// LÓGICA DEL JUEGO TRIVIA GAMEPLUS
function jugar(esCorrecto) {
    const gameFeedback = document.getElementById('game-feedback');
    if (esCorrecto) {
        gameFeedback.style.color = "#28a745";
        gameFeedback.innerText = "¡Correcto! Sabiendo esto protegemos a toda la juventud de Charallave. 🎯⭐";
    } else {
        gameFeedback.style.color = "#c0392b";
        gameFeedback.innerText = "Respuesta incorrecta. ¡Inténtalo de nuevo! ❌";
    }
}

// LOGICA INTERACTIVA DEL LÁPIZ MÁGICO CON COLORES ARCOÍRIS
document.addEventListener('click', (e) => {
    if (!lapizMagicoActivado) return;

    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Lista de colores brillantes del arcoíris
    const colores = ['#ff2a2a', '#2aff2a', '#2a2aff', '#ffff2a', '#ff2aff', '#2affff', '#ff842a'];

    // Generar ráfaga de 6 chispas de colores aleatorios por toque
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.classList.add('magic-sparkle');
        
        // Seleccionar un color al azar de la lista
        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
        particle.style.background = colorAleatorio;
        particle.style.boxShadow = `0 0 8px ${colorAleatorio}, 0 0 15px ${colorAleatorio}`;
        
        // Coordenadas del toque en pantalla
        particle.style.left = `${e.pageX}px`;
        particle.style.top = `${e.pageY}px`;
        
        // Direcciones dispersas aleatorias
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 45 + 20;
        
        particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
        particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
        
        container.appendChild(particle);
        
        // Quitar de la memoria rápido para no ralentizar el teléfono
        setTimeout(() => {
            particle.remove();
        }, 700);
    }
});

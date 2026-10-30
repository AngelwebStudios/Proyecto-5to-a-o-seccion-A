// CONTROL DE SECCIONES DE PREVENCIÓN
function mostrarRama(rama) {
    document.getElementById('menu-prevention').classList.add('hidden');
    
    // Ocultar todas por si acaso
    document.querySelectorAll('.rama-content').forEach(el => el.classList.add('hidden'));
    
    // Mostrar la seleccionada
    document.getElementById(`content-${rama}`).classList.remove('hidden');
}

function regresarMenu() {
    document.querySelectorAll('.rama-content').forEach(el => el.classList.add('hidden'));
    document.getElementById('menu-prevention').classList.remove('hidden');
}

// CONTROL DE ESTRELLAS Y PROMEDIO SIMULADO
let totalVotos = 142;
let sumaTotal = 639; // 142 * 4.5 promedio base anterior

function votar(estrellas) {
    const spans = document.querySelectorAll('.star-icon');
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

    // Actualización de cálculos en tiempo real
    totalVotos++;
    sumaTotal += estrellas;
    let nuevoPromedio = (sumaTotal / totalVotos).toFixed(1);

    document.getElementById('avg-display').innerText = nuevoPromedio;
    document.getElementById('votes-display').innerText = totalVotos;
    document.getElementById('feedback-message').innerText = `¡Tu voto de ${estrellas} estrellas ha sido procesado!`;
}

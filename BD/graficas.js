const $grafica = document.querySelector("#grafica");
const etiquetas = ["Seguridad", "Inseguridad Leve", "Inseguridad Moderada", "Inseguridad Severa"];

// Utiliza la variable totalRespuestas en tus datos
const datosClasificacion = {
    label: "Clasificación de inseguridad alimentaria",
    data: [totalRespuestas, 0, 3, 1], // Usamos totalRespuestas aquí
    borderColor: 'rgba(0, 143, 16, 0.8)',
    borderWidth: 1,
    fill: false,
};

new Chart($grafica, {
    type: 'line',
    data: {
        labels: etiquetas,
        datasets: [datosClasificacion]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

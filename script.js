document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Función para actualizar el tamaño del canvas
    function actualizarTamañoCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Llamar a la función de dibujo principal para re-renderizar
        actualizarJuego();
    }

    // Llamar a actualizarTamañoCanvas() al cargar y redimensionar la página
    window.addEventListener("resize", actualizarTamañoCanvas);
    actualizarTamañoCanvas();

    // Resto del código del juego...
});

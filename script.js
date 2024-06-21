document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Definir los nombres y posiciones iniciales de las paletas y la pelota
    let jugadorA = {
        nombre: "Jugador A",
        x: 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        color: "blue",
        score: 0 // Puntuación inicial para el jugador A
    };

    let jugadorB = {
        nombre: "Jugador B",
        x: canvas.width - 30,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        color: "green",
        score: 0 // Puntuación inicial para el jugador B
    };

    let pelota = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        color: "white",
        dx: 2,
        dy: 2
    };

    // Función para dibujar las paletas
    function dibujarPaletas() {
        // Paleta A
        ctx.fillStyle = jugadorA.color;
        ctx.fillRect(jugadorA.x, jugadorA.y, jugadorA.width, jugadorA.height);

        // Paleta B
        ctx.fillStyle = jugadorB.color;
        ctx.fillRect(jugadorB.x, jugadorB.y, jugadorB.width, jugadorB.height);
    }

    // Función para dibujar la pelota
    function dibujarPelota() {
        ctx.beginPath();
        ctx.fillStyle = pelota.color;
        ctx.arc(pelota.x, pelota.y, pelota.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    // Función para dibujar el marcador
    function dibujarMarcador() {
        ctx.font = "20px Arial";
        
        // Dibujar nombre y puntuación del jugador A
        ctx.fillStyle = jugadorA.color;
        ctx.fillText(`${jugadorA.nombre}: ${jugadorA.score}`, 20, 30);
        
        // Dibujar nombre y puntuación del jugador B
        ctx.fillStyle = jugadorB.color;
        ctx.fillText(`${jugadorB.nombre}: ${jugadorB.score}`, canvas.width - 180, 30);
    }

    // Función principal de actualización del juego
    function actualizarJuego() {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar las paletas, la pelota y el marcador
        dibujarPaletas();
        dibujarPelota();
        dibujarMarcador();

        // Mover la pelota
        pelota.x += pelota.dx;
        pelota.y += pelota.dy;

        // Colisiones con los bordes
        if (pelota.y + pelota.dy > canvas.height - pelota.radius || pelota.y + pelota.dy < pelota.radius) {
            pelota.dy = -pelota.dy;
        }

        // Colisiones con las paletas
        if (pelota.x + pelota.dx > jugadorB.x && pelota.y > jugadorB.y && pelota.y < jugadorB.y + jugadorB.height) {
            pelota.dx = -pelota.dx;
        } else if (pelota.x + pelota.dx < jugadorA.x + jugadorA.width && pelota.y > jugadorA.y && pelota.y < jugadorA.y + jugadorA.height) {
            pelota.dx = -pelota.dx;
        }

        // Solicitar el siguiente fotograma de animación
        requestAnimationFrame(actualizarJuego);
    }

    // Iniciar el juego
    actualizarJuego();

    // Asegurarse de que el canvas se ajuste al tamaño de la ventana
    function actualizarTamañoCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Escuchar eventos de redimensionamiento de la ventana
    window.addEventListener("resize", actualizarTamañoCanvas);
    // Actualizar el tamaño del canvas inicialmente
    actualizarTamañoCanvas();
});

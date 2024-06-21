document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Definir las posiciones iniciales y tamaños
    let paletaA = {
        x: 20,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        color: "blue"
    };

    let paletaB = {
        x: canvas.width - 30,
        y: canvas.height / 2 - 50,
        width: 10,
        height: 100,
        color: "green"
    };

    let pelota = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 10,
        color: "white",
        dx: 2,
        dy: 2
    };

    let puntosA = 0;
    let puntosB = 0;

    // Función para dibujar las paletas
    function dibujarPaletas() {
        // Paleta A
        ctx.fillStyle = paletaA.color;
        ctx.fillRect(paletaA.x, paletaA.y, paletaA.width, paletaA.height);

        // Paleta B
        ctx.fillStyle = paletaB.color;
        ctx.fillRect(paletaB.x, paletaB.y, paletaB.width, paletaB.height);
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
        ctx.fillStyle = "white";
        ctx.fillText(`Jugador A: ${puntosA}`, 50, 50);
        ctx.fillText(`Jugador B: ${puntosB}`, canvas.width - 150, 50);
    }

    // Función principal de actualización del juego
    function actualizarJuego() {
        // Limpiar el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar las paletas, pelota y marcador
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
        if (pelota.x + pelota.dx > paletaB.x && pelota.y > paletaB.y && pelota.y < paletaB.y + paletaB.height) {
            pelota.dx = -pelota.dx;
        } else if (pelota.x + pelota.dx < paletaA.x + paletaA.width && pelota.y > paletaA.y && pelota.y < paletaA.y + paletaA.height) {
            pelota.dx = -pelota.dx;
        }

        // Solicitar el siguiente fotograma de animación
        requestAnimationFrame(actualizarJuego);
    }

    // Eventos táctiles para mover las paletas
    canvas.addEventListener("touchstart", function(event) {
        event.preventDefault();
        moverPaletas(event.touches[0].clientY);
    });

    canvas.addEventListener("touchmove", function(event) {
        event.preventDefault();
        moverPaletas(event.touches[0].clientY);
    });

    function moverPaletas(y) {
        // Mover paleta A
        if (y > paletaA.y && y < paletaA.y + paletaA.height) {
            paletaA.y = y - paletaA.height / 2;
        }

        // Mover paleta B
        if (y > paletaB.y && y < paletaB.y + paletaB.height) {
            paletaB.y = y - paletaB.height / 2;
        }
    }

    // Iniciar el juego
    actualizarJuego();
});

<!DOCTYPE html>
<html>
<head>
    <title>Mostrar Otras Secciones</title>
</head>
<body>
    <h1>Contenido de index.html</h1>
    <a href="#" id="mostrarSeccion1">Mostrar Sección 1</a>
    <a href="#" id="mostrarSeccion2">Mostrar Sección 2</a>
    <a href="#" id="mostrarSeccion3">Mostrar Sección 3</a>
    <div id="seccion1" style="display: block;">
        <h2>Sección 1</h2>
        <p>Contenido de la Sección 1 que se muestra al cargar la página.</p>
    </div>
    <div id="seccion2" style="display: none;">
        <!-- El contenido de Sección 2 se cargará cuando hagas clic en el enlace correspondiente -->
    </div>
    <div id="seccion3" style="display: none;">
        <!-- El contenido de Sección 3 se cargará cuando hagas clic en el enlace correspondiente -->
    </div>

    <script>
        function ocultarTodasLasSecciones() {
            // Ocultar todas las secciones estableciendo su estilo de visualización a "none"
            document.getElementById("seccion1").style.display = "none";
            document.getElementById("seccion2").style.display = "none";
            document.getElementById("seccion3").style.display = "none";
        }

        // Mostrar la Sección 1 por defecto al cargar la página
        ocultarTodasLasSecciones();
        document.getElementById("seccion1").style.display = "block";

        document.getElementById("mostrarSeccion1").addEventListener("click", function(event) {
            event.preventDefault(); // Evitar que el enlace recargue la página
            ocultarTodasLasSecciones();
            document.getElementById("seccion1").style.display = "block";
        });

        document.getElementById("mostrarSeccion2").addEventListener("click", function(event) {
            event.preventDefault(); // Evitar que el enlace recargue la página
            ocultarTodasLasSecciones();
            // Utilizamos fetch para cargar el contenido de otra_seccion2.html
            fetch("otra_seccion2.html")
                .then(response => response.text())
                .then(data => {
                    // Insertamos el contenido en el div con id="seccion2"
                    document.getElementById("seccion2").innerHTML = data;
                    document.getElementById("seccion2").style.display = "block";
                })
                .catch(error => console.error("Error al cargar la sección externa:", error));
        });

        document.getElementById("mostrarSeccion3").addEventListener("click", function(event) {
            event.preventDefault(); // Evitar que el enlace recargue la página
            ocultarTodasLasSecciones();
            // Utilizamos fetch para cargar el contenido de otra_seccion3.html
            fetch("otra_seccion3.html")
                .then(response => response.text())
                .then(data => {
                    // Insertamos el contenido en el div con id="seccion3"
                    document.getElementById("seccion3").innerHTML = data;
                    document.getElementById("seccion3").style.display = "block";
                })
                .catch(error => console.error("Error al cargar la sección externa:", error));
        });
    </script>
</body>
</html>

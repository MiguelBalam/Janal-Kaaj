<?php
$username  = "janalkaa_admin";
$password = "janalkaaj2023";
$servername = "162.241.60.169";
$dbname = "janalkaa_kaaj";

$con = new mysqli($servername, $username, $password, $dbname);
mysqli_set_charset($con, "utf8");

if ($con->connect_error) {
    die("Conexión fallida: " . $con->connect_error);
}


?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Janal-Kaaj</title>
    <!-- Bootstrap -->
    <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
    <link rel="stylesheet" href="../CSS/bootstrap.min.css">
    <link rel="stylesheet" href="../CSS/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>
</head>

<body class="IBM">
    <nav class="navbar navbar-expand-lg fixed-top navbar-mi-colorLP" id="mainNav">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="../Img/Oficial_JanalKaaj.png" width="130px" height="65px">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i class="fas fa-bars ms-1"></i>
            </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarResponsive">
                <ul class="navbar-nav ms-auto py-4 py-lg-0">
                    <li class="nav-item"><a class="nav-link" href="planes_servicios.html">Planes y servicios</a></li>
                    <li class="nav-item"><a class="nav-link" target="_blank" href="https://www.acnur.org/nutricion-y-seguridad-alimentaria.html">Seguridad-Alimentaria</a></li>
                    <li class="nav-item"><a class="nav-link" href="Estadistica/index.html">Estadísticas</a></li>
                    <li class="nav-item"><a class="nav-link" href="contactanos.html">Contáctanos</a></li>
                    <li class="nav-item"><a class="nav-link" href="login.html">Iniciar Sesión</a></li>
                    <li class="nav-item"><button type="button" data-bs-toggle="modal" data-bs-target="#myModal" class="nav-link btnn btn-outline-warning text-white" data-bs-target="#myModal">Registrarse</button></li>
                </ul>
            </div>
    </nav>
    <div class="modal" tabindex="-1" id="myModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content align-content-center">
                <div class="modal-header">
                    <h5 class="modal-title">Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Usteded quiere registrarse, ¿Cómo encuestado o encuestador?</p>
                </div>
                <div class="modal-footer">
                    <a type="button" class="nav-link btnn btn-outline-warning text-white" href="form_encuestados.html">Encuestado</a>
                    <a type="button" class="nav-link btnn btn-outline-warning text-white" href="form_encuestador.html">Encuestador</a>
                </div>
            </div>
        </div>
    </div>
    <header class="section">
        <div class="container">
            <section class="d-flex justify-content-center py-5 ">
                <div class="p-3 shadow-lg mb-5 bg-white rounded">
                    <H2 class="text-center mb-3">Pago de servicio</H2>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Nombre">
                                <label for="floatingInput">Nombre</label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Apellido">
                                <label for="floatingInput">Apellido</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Teléfono">
                                <label for="floatingInput">Teléfono</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-floating mb-3">
                                <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                                    <option selected>Seleeciona tu país</option>
                                    <option value="1">México</option>
                                    <option value="2">Perú</option>
                                    <option value="3">Guatemala</option>
                                </select>
                                <label for="floatingSelect">País</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Región">
                                <label for="floatingInput">Región</label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Ciudad">
                                <label for="floatingInput">Ciudad</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Dirección">
                                <label for="floatingInput">Dirección</label>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="floatingInput" placeholder="Código postal">
                                <label for="floatingInput">Código postal</label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <p>Impuestos y tarifas</p>
                        </div>
                        <div class="col-sm-6 text-end">
                            <p>MXN$ 0.00</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-6">
                            <h3 class="bg-bold">Total</h3>
                        </div>
                        <div class="col-sm-6 text-end">
                            <p>MXN$ 0.00</p>
                        </div>
                    </div>
                    <div class="row mb-2">
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button class="btn btn-outline-success bg-border-mostaza bg-text-mostaza " type="submit" id="boton-compra">Enviar Pago Seguro</button>
                        </div>
                    </div>
                </div>
        </div>
        </section>
        </div>
    </header>
</body>
<footer class="footer">
    <div class="container py-4">
        <div class="row align-items-center">
            <div class="col-sm-4 text-center "><img src="../Img/Oficial_JanalKaaj.png" width="180px" height="90px"></div>
            <div class="col-sm-4 my-3 my-lg-0 text-center">
                <h5 class="">Enlaces</h5>

                <a class="link-dark text-decoration-none" target="_blank" href="https://www.aecoc.es/actividad/seguridad-alimentaria-calidad/">AECOC</a><br>
                <a class="link-dark text-decoration-none" target="_blank" href="https://www.gob.mx/segalmex">Segalmex</a><br>
                <a class="link-dark text-decoration-none" target="_blank" href="https://www.gob.mx/agricultura">GOB MX</a><br>
                <a class="link-dark text-decoration-none" target="_blank" href="https://www.fao.org/statistics/es/">FAO</a><br>
                <a class="link-dark text-decoration-none" target="_blank" href="https://www.acnur.org/nutricion-y-seguridad-alimentaria.html">ACNUR</a>
            </div>
            <div class="col-sm-4 text-center">
                <h5>Contacto</h5>
                <p>Dudas e información a <br>iscproyectoslc@gmail.com</p>
                <h5>Síguenos</h5>
                <a class="btn btn-dark btn-social mx-2" target="_blank" href="https://www.facebook.com/profile.php?id=100093048912704" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                <a class="btn btn-dark btn-social mx-2" target="_blank" href="https://instagram.com/janal_kaaj?igshid=MzNlNGNkZWQ4Mg==" aria-label="LinkedIn"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </div>
    <div class="footerB fs-6 py-1">Copyright &copy; Janal Kaaj 2023</div>
</footer>

</html>
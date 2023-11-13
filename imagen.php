<!doctype html>
<html lang="en">

<head>
    <title>Subir Imagen</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
</head>

<body>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12">
                <?php
                if (isset($_REQUEST['guardar'])) {
                    if (isset($_FILES['foto']['name'])) {
                        $tipoArchivo = $_FILES['foto']['type'];
                        $permitido = array("image/png", "image/jpeg");
                        if (!in_array($tipoArchivo, $permitido)) {
                            die("Archivo no permitido");
                        }
                        $nombreArchivo = $_FILES['foto']['name'];
                        $tamanoArchivo = $_FILES['foto']['size'];
                        $imagenSubida = fopen($_FILES['foto']['tmp_name'], 'r');
                        $binariosImagen = fread($imagenSubida, $tamanoArchivo);

                        $titulo = $_POST['titulo'];
                        $cuerpo = $_POST['cuerpo'];

                        include_once "db_empresa.php";
                        $con = mysqli_connect($db_host, $db_user, $db_pass, $db_database);
                        $binariosImagen = mysqli_escape_string($con, $binariosImagen);
                        $query = "INSERT INTO Noticias (titulo, cuerpo, imagen) VALUES ('$titulo', '$cuerpo', '$binariosImagen');";
                        $res = mysqli_query($con, $query);
                        if ($res) {
                            echo "<div class='alert alert-primary'>Registro insertado exitosamente</div>";
                        } else {
                            echo "<div class='alert alert-danger'>Error: " . mysqli_error($con) . "</div>";
                        }
                    }
                }
                ?>
                <form method="post" enctype="multipart/form-data">
                    <div class="form-group">
                        <label>Título

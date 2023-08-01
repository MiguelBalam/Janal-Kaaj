// const express = require('express')
// const mysql2= require('mysql2')

// const app = express();

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))

// app.get('/',function(req, res){
//     res.render('form_encuestador')
// })

// app.post('/',function(req, res){
//     res.send('form_encuestador')
// })

// app.put('/',(req, res)=>{
//     res.send('Peticion PUT')
// })

// app.delete('/',(req, res)=>{
//     res.send('Peticion DELETE')
// })

// //==DB
// const connection =mysql2.createConnection({
//     host:'162.241.60.169',
//     user:'janalkaa_admin',
//     password:'janalkaaj2023',
//     database:'janalkaa_kaaj'
// });

// connection.connect((err)=>{
//     if(err) throw err
//     console.log('BD conectado');
// })

// app.listen(3000,()=>{
//     console.log('servidor encendido')
// })


const express = require('express');
const mysql2 = require('mysql2');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
app.use(session({ secret: 'janalKaaj', resave: false, saveUninitialized: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de la conexión a la base de datos
const connection = mysql2.createConnection({
    host: '162.241.60.169',
    user: 'janalkaa_admin',
    password: 'janalkaaj2023',
    database: 'janalkaa_kaaj'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('BD conectado');
});

const path = require('path');

// Ruta para mostrar el formulario HTML
// app.get('/', (req, res) => {
//     const filePath = 'C:/Users/PERSONAL/.vscode/jANAL/Janal-Kaaj/form_encuestador.html';
//     res.sendFile(filePath);
// });
// app.get('/', (req, res) => {
//     const filePath = 'C:/Users/PERSONAL/.vscode/jANAL/Janal-Kaaj/login.html';
//     res.sendFile(filePath);
// });

app.get('/', (req, res) => {
    const filePath =  'C:/Users/PERSONAL/.vscode/jANAL/Janal-Kaaj/form_encuestador.html';
    res.sendFile(filePath);
});
app.get('/', (req, res) => {
    const filePath = 'C:/Users/PERSONAL/.vscode/jANAL/Janal-Kaaj/login.html';
    res.sendFile(filePath);
});



app.get('/', (req, res) => {
    const filePath = 'C:/Users/PERSONAL/.vscode/jANALJanal-Kaaj/pestañas_Encuestador/dashboard.html';
    res.sendFile(filePath);
  });





// Ruta para mostrar el formulario HTML de inicio de sesión (login)



// ...

// const path = require('path');
// // Ruta para mostrar el formulario HTML
// app.get('/', (req, res) => {
//     const filePath = path.join(__dirname, '../form_encuestador.html');
//     res.sendFile(filePath);
// });
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + './form_encuestador.html');
// });

// Ruta para procesar los datos enviados desde el formulario

// app.post('/guardar-datos', (req, res) => {
//     const nombrecompletos = req.body.nombrecompletos;
//     const apellidopaterno = req.body.apellidopaterno;
//     const apellidomaterno = req.body.apellidomaterno;
//     const genero = req.body.inlineRadioOptions;
//     const edad = req.body.edad;
//     const procedencia = req.body.procedencia;
//     const imagen = req.body.imagen;
//     const telefono = req.body.tel;
//     const correo = req.body.Correo;
//     const contrasenia = req.body.Contraseña;

//     // Consulta SQL para insertar los datos en la tabla UsuariosEncuestador
//     const sql1 = `INSERT INTO Autenticacion (correo, contraseña) 
//     VALUES (?, ?)`;

//     const sql2 = `INSERT INTO UsuariosEncuestador (nombre, apellidoPaterno, apellidoMaterno, edad, genero, procedencia, logo, Telefono) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

//     // Consulta SQL para insertar los datos en la tabla Autenticacion
 
//     // Iniciar una transacción en la base de datos
//     connection.beginTransaction((err) => {
//         if (err) {
//             console.log('Error al iniciar la transacción:', err);
//             res.status(500).send('Error al insertar los datos en la base de datos');
//             return;
//         }

//         // Ejecutar la primera consulta (UsuariosEncuestador)
//         connection.query(sql1, [correo, contrasenia], (err, result2) => {
//             if (err) {
//                 connection.rollback(() => {
//                     console.log('Error al insertar los datos en Autenticacion:', err);
//                     res.status(500).send('Error al insertar los datos en la base de datos');
//                 });
//                 return;
//             }
//         connection.query(sql2, [nombrecompletos, apellidopaterno, apellidomaterno, edad, genero, procedencia, imagen, telefono], (err, result1) => {
//             if (err) {
//                 connection.rollback(() => {
//                     console.log('Error al insertar los datos en UsuariosEncuestador:', err);
//                     res.status(500).send('Error al insertar los datos en la base de datos');
//                 });
//                 return;
//             }

//             // Ejecutar la segunda consulta (Autenticacion)
           
//                 // Confirmar la transacción si ambas consultas fueron exitosas
//                 connection.commit((err) => {
//                     if (err) {
//                         connection.rollback(() => {
//                             console.log('Error al confirmar la transacción:', err);
//                             res.status(500).send('Error al insertar los datos en la base de datos');
//                         });
//                         return;
//                     }

//                     console.log('Datos insertados correctamente');
//                     res.status(200).send('Datos insertados correctamente');
//                 });
//             });
//         });
//     });
// });

app.post('/guardar-datos', (req, res) => {
    const nombrecompletos = req.body.nombrecompletos;
    const apellidopaterno = req.body.apellidopaterno;
    const apellidomaterno = req.body.apellidomaterno;
    const genero = req.body.inlineRadioOptions;
    const edad = req.body.edad;
    const procedencia = req.body.procedencia;
    const imagen = req.body.imagen;
    const telefono = req.body.tel;
    const correo = req.body.Correo;
    const contrasenia = req.body.Contraseña;

    const saltRounds = 10;
    bcrypt.hash(contrasenia, saltRounds, (err, hash) => {
        if (err) {
            console.log('Error al encriptar la contraseña:', err);
            res.status(500).send('Error al encriptar la contraseña');
            return;
        }
   
    
    // Consulta SQL para insertar los datos en la tabla Autenticacion
    const sql1 = `INSERT INTO Autenticacion (correo, contraseña) 
                  VALUES (?, ?)`;

    // Consulta SQL para insertar los datos en la tabla UsuariosEncuestador
    const sql2 = `INSERT INTO UsuariosEncuestador (id_Autenticacion, nombre, apellidoPaterno, apellidoMaterno, edad, genero, procedencia, logo, Telefono) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Iniciar una transacción en la base de datos
    connection.beginTransaction((err) => {
        if (err) {
            console.log('Error al iniciar la transacción:', err);
            res.status(500).send('Error al insertar los datos en la base de datos');
            return;
        }

        // Ejecutar la primera consulta (Autenticacion)
        connection.query(sql1, [correo, hash], (err, result1) => {
            if (err) {
                connection.rollback(() => {
                    console.log('Error al insertar los datos en Autenticacion:', err);
                    res.status(500).send('Error al insertar los datos en la base de datos');
                });
                return;
            }

            // Obtener el id generado para la tabla Autenticacion
            const id_Autenticacion = result1.insertId;

            // Ejecutar la segunda consulta (UsuariosEncuestador) usando el id obtenido
            connection.query(sql2, [id_Autenticacion, nombrecompletos, apellidopaterno, apellidomaterno, edad, genero, procedencia, imagen, telefono], (err, result2) => {
                if (err) {
                    connection.rollback(() => {
                        console.log('Error al insertar los datos en UsuariosEncuestador:', err);
                        res.status(500).send('Error al insertar los datos en la base de datos');
                    });
                    return;
                }

                // Confirmar la transacción si ambas consultas fueron exitosas
                connection.commit((err) => {
                    if (err) {
                        connection.rollback(() => {
                            console.log('Error al confirmar la transacción:', err);
                            res.status(500).send('Error al insertar los datos en la base de datos');
                        });
                        return;
                    }

                    console.log('Datos insertados correctamente');
                    res.status(200).send('Datos insertados correctamente');
                });
            });
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { Usuario, contraseniaL } = req.body;
  
    if (!Usuario || !contraseniaL) {
      return res.status(400).send('Se requiere nombre de usuario y contraseña');
    }
  
    connection.query('SELECT * FROM Autenticacion WHERE correo = ?', [Usuario], (err, results) => {
      if (err) throw err;
  
      if (results.length === 0) {
        return res.status(401).send('Nombre de usuario Incorecto');
      }
  
      const user = results[0];
      bcrypt.compare(contraseniaL, user.contraseña, (bcryptErr, isMatch) => {
        if (bcryptErr) throw bcryptErr;
        if (!isMatch) {
          return res.status(401).send('Contraseña incorrecto');
        }
  
        // Establecer una sesión para el usuario
        req.session.user = user;
      
        // Redireccionar a la página deseada después del inicio de sesión exitoso
        res.redirect('/jANALJanal-Kaaj/pestañas_Encuestador/dashboard.html');
      });
    });
});


// app.post('/login', (req, res) => {
//     const { Usuario, contraseniaL } = req.body;
  
//     if (!Usuario || !contraseniaL) {
//       return res.status(400).send('Se requiere nombre de usuario y contraseña');
//     }
  
//     connection.query('SELECT * FROM Autenticacion WHERE correo = ?', [Usuario], (err, results) => {
//       if (err) throw err;
  
//       if (results.length === 0) {
//         return res.status(401).send('Nombre de usuario o contraseña incorrectos');
//       }
  
//       const user = results[0];
//       bcrypt.compare(contraseniaL, user.contraseña, (bcryptErr, isMatch) => {
//         if (bcryptErr) throw bcryptErr;
//         if (!isMatch) {
//           return res.status(401).send('Nombre de usuario o contraseña incorrectos');
//         }
  
//         // Aquí puedes establecer una sesión para el usuario
//         req.session.user = user;
//         res.send('Inicio de sesión exitoso');
//       });
//     });
//   });
  

// app.post('/guardar-datos', (req, res) => {
//     const nombrecompletos = req.body.nombrecompletos;
//     const apellidopaterno = req.body.apellidopaterno;
//     const apellidomaterno = req.body.apellidomaterno;
//     const genero = req.body.inlineRadioOptions;
//     const edad = req.body.edad;
//     const procedencia = req.body.procedencia;
//     const imagen = req.body.imagen;
//     const telefono = req.body.tel;
//     // const correo = req.body.Correo;
//     // const contrasenia = req.body.Contraseña;

//     // Consulta SQL para insertar los datos en la tabla correspondiente de la base de datos
//     const sql = `INSERT INTO UsuariosEncuestador (nombre, apellidoPaterno, apellidoMaterno, edad, genero, procedencia, logo, Telefono) 
//                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//     // const sql2 = `INSERT INTO Autenticacion (correo,contrasenia) 
//     //              VALUES (?, ?)`;

//     // Ejecutar la consulta con los valores correspondientes
//     connection.query(sql, [nombrecompletos, apellidopaterno, apellidomaterno, genero, edad, procedencia,imagen, telefono], (err, result) => {
//         if (err) {
//             console.log('Error al insertar los datos:', err);
//             res.status(500).send('Error al insertar los datos en la base de datos');
//         } else {
//             console.log('Datos insertados correctamente');
//             res.status(200).send('Datos insertados correctamente');
//         }
//     });
//     // connection.query(sql2, [correo,contrasenia], (err, result) => {
//     //     if (err) {
//     //         console.log('Error al insertar los datos:', err);
//     //         res.status(500).send('Error al insertar los datos en la base de datos');
//     //     } else {
//     //         console.log('Datos insertados correctamente');
//     //         res.status(200).send('Datos insertados correctamente');
//     //     }
//     // });
// });

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor encendido en http://localhost:3000');
});

function mostrarDatosDesdeIndexedDB() {
    const dbName = 'miBaseDeDatos';
    const request = indexedDB.open(dbName);

    request.onerror = (event) => {
        console.error('Error al abrir la base de datos:', event.target.error);
    };

    request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(['encuestas'], 'readonly');
        const tableContainer = document.getElementById('resultado2');

        transaction.oncomplete = () => {
            console.log('Datos cargados desde IndexedDB correctamente');
            db.close();
        };

        transaction.onerror = (event) => {
            console.error('Error al cargar datos desde IndexedDB:', event.target.error);
            db.close();
        };

        const encuestasStore = transaction.objectStore('encuestas');
        const encuestasRequest = encuestasStore.getAll();

        encuestasRequest.onsuccess = (event) => {
            const encuestasData = event.target.result;
            const table = document.createElement('table');
            table.className = 'table table-bordered table-hover table-condensed';

            const tableHead = document.createElement('thead');
            tableHead.className = 'thead-light';
            tableHead.innerHTML = `
                <tr>
                    <th>ID encuesta</th>
                    <th>Título</th>
                    <th>Estado</th>
                    <th>Fecha Inicio</th>
                    <th>Acciones</th>
                </tr>
            `;

            const tableBody = document.createElement('tbody');

            encuestasData.forEach((encuesta) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${encuesta.id_encuesta}</td>
                    <td>${encuesta.titulo}</td>
                    <td>${encuesta.estado}</td>
                    <td>${encuesta.fecha_inicio}</td>
                    <td>
                        <a href="/BD/prueva/encuestaVista.php?id_encuesta=${encuesta.id_encuesta}">
                            <button class="btn btn-info" type="button">Detalles</button>
                        </a>
                        <a href="#" onclick="aplicarEncuesta(${encuesta.id_encuesta})">
                            <button class="btn btn-info" type="button">Aplicar</button>
                        </a>
                    </td>
                `;
                tableBody.appendChild(row);
            });

            table.appendChild(tableHead);
            table.appendChild(tableBody);
            tableContainer.appendChild(table);
        };
    };
}
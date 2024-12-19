// APARTADOS DEL RELOJ
function actualizarReloj() {
    let reloj = document.getElementById("hora");
    let horaActual = new Date();

    // Obtener la hora
    let horas = horaActual.getHours().toString().padStart(2, '0');
    let minutos = horaActual.getMinutes().toString().padStart(2, '0');
    let segundos = horaActual.getSeconds().toString().padStart(2, '0');

    // Obtener la fecha
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dia = horaActual.getDate();
    let mes = meses[horaActual.getMonth()];
    let anho = horaActual.getFullYear();

    // Combinar fecha y hora
    let fechaHora = `${dia} ${mes} ${anho} ${horas}:${minutos}:${segundos}`;

    // Mostrar en el elemento
    reloj.textContent = fechaHora;
}

// Actualizar cada segundo
setInterval(actualizarReloj, 1000);

// Mostrar inicialmente
actualizarReloj();

//APARTADO DE LOS ALUMNOS

// Array de alumnos
let alumnos = [];

function agregarAlumno(){
    let nombre = document.getElementById("nombre").value;

    

}

// Obtener referencia al tbody
const tablaAlumnos = document.getElementById('tablaAlumnos');

// Función para borrar un alumno
function borrarAlumno(index) {
    // Eliminar el alumno del array
    alumnos.splice(index, 1);

    // Volver a renderizar la tabla después de eliminar
    renderizarTabla();
}

// Función para renderizar la tabla
function renderizarTabla() {
    // Limpiar el contenido actual de la tabla
    tablaAlumnos.innerHTML = '';

    // Agregar alumnos a la tabla usando un bucle for
    for (let i = 0; i < alumnos.length; i++) {
        // Crear una nueva fila
        const fila = document.createElement('tr');

        // Crear celdas para el puesto y el nombre completo
        const celdaPuesto = document.createElement('td');
        celdaPuesto.textContent = i + 1; // El índice + 1 será el puesto
        
        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = alumnos[i].nombre + ' ' + alumnos[i].apellido;
        
        const celdaBorrar = document.createElement('td');
        const botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Borrar'; // Texto del botón
        botonBorrar.classList.add('btn-borrar'); // Agregar la clase CSS personalizada
        botonBorrar.onclick = () => borrarAlumno(i); // Asignar la función de borrar con el índice del alumno
        
        celdaBorrar.appendChild(botonBorrar);

        // Agregar las celdas a la fila
        fila.appendChild(celdaPuesto);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaBorrar);

        // Agregar la fila al tbody de la tabla
        tablaAlumnos.appendChild(fila);
    }
}

// Llamar a la función de renderizado de la tabla cuando se cargue la página
renderizarTabla();


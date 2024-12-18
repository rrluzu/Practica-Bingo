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

function Alumno(nombre, apellido){
    this.nombre = nombre;
    this.apellido = apellido;
}

const alumno1 = new Alumno("Julio", "Mondéjar");
const alumno2 = new Alumno("Uriel", "López");
const alumno3 = new Alumno("Fath Allah", "Echajri");
const alumno4 = new Alumno("Iván", "Sabater");
const alumno5 = new Alumno("Alberto", "Castaño");
const alumno6 = new Alumno("Iván", "Gil");
const alumno7 = new Alumno("Mehdi", "Laaouinate");
const alumno8 = new Alumno("José", "Gil");
const alumno9 = new Alumno("David", "Corbalán");
const alumno10 = new Alumno("María", "Bravo");
const alumno11 = new Alumno("Jaime", "Rubio");
const alumno12 = new Alumno("Alejandro", "Vascónez");
const alumno13 = new Alumno("Jesús", "Carrasco");
const alumno14 = new Alumno("Álvaro", "Martínez");
const alumno15 = new Alumno("Francisco", "López");
const alumno16 = new Alumno("Uriel", "Martínez");
const alumno17 = new Alumno("Jesús", "Pérez");
const alumno18 = new Alumno("Jalil", "Tahri");
const alumno19 = new Alumno("José", "Peñalver");
const alumno20 = new Alumno("Adam", "El Nabaoui");
const alumno21 = new Alumno("Marlon", "Cotto");
const alumno22 = new Alumno("Adrián", "Vicente");
const alumno23 = new Alumno("Eduardo", "Piquer");
const alumno24 = new Alumno("Mario", "Martínez");
const alumno25 = new Alumno("Erikas", "Pilipavicius");
const alumno26 = new Alumno("Rafael", "Lizán");
const alumno27 = new Alumno("Angel", "Guerra");
const alumno28 = new Alumno("Hamza", "Daoudi");

// Array de alumnos
const alumnos = [
    alumno1, alumno2, alumno3, alumno4, alumno5, alumno6, alumno7, alumno8, alumno9, alumno10,
    alumno11, alumno12, alumno13, alumno14, alumno15, alumno16, alumno17, alumno18, alumno19, alumno20,
    alumno21, alumno22, alumno23, alumno24, alumno25, alumno26, alumno27, alumno28
];

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


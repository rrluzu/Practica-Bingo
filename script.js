// !APARTADOS DEL RELOJ
function actualizarReloj() {
    let reloj = document.getElementById("hora");
    let horaActual = new Date();

    // Obtener la hora
    // El padStart hace que si la longitud del 'numero' es < 2 valores, le agregue un 0 adelante (Ej. 1-9 => 01-09)
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
    reloj.innerHTML = fechaHora;
}

// Actualizar cada segundo
setInterval(actualizarReloj, 1000);

// Mostrar inicialmente
actualizarReloj();

// !APARTADO DE LOS ALUMNOS
// Array de alumnos
let alumnos = [];

// Obtener el formulario y la tabla donde se muestran los alumnos
const form = document.getElementById('form-alumno');
const listaPersonajes = document.getElementById('tablaAlumnos');


// Funcion que agregará al array y a la tabla la información
form.addEventListener('submit', manejarEnvio);

function manejarEnvio(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado para que no se actualice la página y perdamos la información

  const nombre = document.getElementById('nombre').value; // Obtener el valor del input
  alumnos.push(nombre); // Agregar el nombre al array
  actualizarTabla(); // Actualizar la tabla
  form.reset(); // Limpiar los campos del formulario
}

// Función para borrar un alumno
function borrarAlumno(index) {
    // Eliminar el alumno del array
    alumnos.splice(index, 1);

    // Volver a actualizar la tabla después de eliminar
    actualizarTabla();
}

// Función para actualizar la tabla
function actualizarTabla() {
    // Limpiar el contenido actual de la tabla
    listaPersonajes.innerHTML = '';

    // Verificar si el array de alumnos está vacío
    if (alumnos.length === 0) {
        // Crear una fila que indique que no hay datos
        const fila = document.createElement('tr');

        const celdaMensaje = document.createElement('th');
        celdaMensaje.setAttribute('colspan', '3'); // Hacer que la celda ocupe todas las columnas
        celdaMensaje.innerHTML = "Agregar información";
        fila.appendChild(celdaMensaje);
        listaPersonajes.appendChild(fila);
    } else {
        // Agregar alumnos a la tabla usando un bucle for
        for (let i = 0; i < alumnos.length; i++) {
            // Crear una nueva fila
            const fila = document.createElement('tr');
            
            // Crear celdas para el puesto y el nombre completo
            const celdaPuesto = document.createElement('td');
            celdaPuesto.innerHTML = i + 1; // El índice + 1 será el puesto

            const celdaNombre = document.createElement('td');
            celdaNombre.innerHTML = alumnos[i]; // El nombre del alumno

            // Crear celda para el botón de borrar
            const celdaBorrar = document.createElement('td');
            const botonBorrar = document.createElement('button');
            botonBorrar.innerHTML = 'Borrar'; // Texto del botón
            botonBorrar.classList.add('btn-borrar'); // Agregar la clase CSS personalizada
            botonBorrar.onclick = () => borrarAlumno(i); // Asignar la función de borrar con el índice del alumno
            
            celdaBorrar.appendChild(botonBorrar);

            // Agregar las celdas a la fila
            fila.appendChild(celdaPuesto);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaBorrar);

            // Agregar la fila al tbody de la tabla
            listaPersonajes.appendChild(fila);
        }
    }

    // Mostrar el estado del array (opcional para depuración)
    console.log(alumnos);
}

// Llamar a la función de renderizado de la tabla cuando se cargue la página
actualizarTabla();

// ! APARTADO DE ENVIAR DATOS
document.getElementById("btn-sortear").hidden = true;

// Función para iniciar el sorteo
function empezarSorteo() {
    
    if(alumnos.length == 0){
        alert("Primero debe introducir Alumnos");
        return;
    }else{
        // Limpiar la tabla actual
        listaPersonajes.innerHTML = '';
        document.getElementById("enviar").hidden = true;
        document.getElementById("nombre").hidden = true;
        document.getElementById("banner").hidden = true;
        document.getElementById("btn-empezar").hidden = true;
        document.getElementById("btn-sortear").hidden = false;
        document.getElementById("bola-bingo").hidden = false;
        
        // Generar solo las posiciones en la tabla
        for (let i = 0; i < alumnos.length; i++) {
            // Crear una nueva fila
            const fila = document.createElement('tr');
    
            // Crear celdas para el puesto
            const celdaPuesto = document.createElement('td');
            celdaPuesto.innerHTML = i + 1; // Mostrar solo el número de puesto
    
            // Crear celda vacía para el nombre (por ahora no hay nombres)
            const celdaNombre = document.createElement('td');
            celdaNombre.innerHTML = "-"; // Celda vacía
    
            // Agregar las celdas a la fila
            fila.appendChild(celdaPuesto);
            fila.appendChild(celdaNombre);
    
            // Agregar la fila a la tabla
            listaPersonajes.appendChild(fila);
        }
        // Comenzar el primer sorteo si no se presiona el botón después de 5 segundos
        temporizadorBingo = setTimeout(sortearNumeros, 5000);
    }

}

// ! APARTADO DE SORTEO DE POSICIONES
// Seleccionar la bola de bingo
const bola = document.getElementById("bola-bingo"); // Bola de bingo

let numerosSorteados = [];  // Lista de los alumnos que ya han sido sorteados
let sorteos = [];  // Lista de los números sorteados asignados a cada alumno

let temporizadorBingo; // Variable para almacenar el temporizador

function sortearNumeros() {
    // Detener el temporizador para evitar duplicar sorteos
    clearTimeout(temporizadorBingo);

    // Verificar si ya todos los números han sido sorteados
    if (numerosSorteados.length === alumnos.length) {
        return; // Salimos de la función si ya todos los alumnos tienen un número
    }

    // Genera un número aleatorio entre 0 y la cantidad de alumnos
    let numeroAleatorio = Math.floor(Math.random() * alumnos.length);

    // Asegurarnos de que el número no se repita
    while (numerosSorteados.includes(numeroAleatorio)) {
        numeroAleatorio = Math.floor(Math.random() * alumnos.length);
    }

    // Agregar el número sorteado a la lista de sorteados
    numerosSorteados.push(numeroAleatorio);

    // Guardar el número sorteado para el alumno
    sorteos.push(numeroAleatorio);

    // Generar un color aleatorio para la bola
    const colores = ['blue', 'red', 'yellow', 'pink', 'green', 'purple', 'orange'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

    // Cambiar el color de la bola
    bola.style.backgroundColor = colorAleatorio;

    // Animación de la bola girando
    bola.style.transition = "transform 2s ease-in-out"; // Configurar la duración del giro
    bola.style.transform = "rotate(720deg)"; // Girar 720 grados (2 vueltas completas)

    // Espera que termine la animación
    setTimeout(() => {
        // Detiene la animación
        bola.style.transition = "none"; // Elimina la transición para evitar que siga girando
        bola.style.transform = "rotate(0deg)"; // Restablece la posición original

        // Muestra el número aleatorio en la bola
        bola.innerHTML = numeroAleatorio + 1; // Suma 1 al índice para que empiece desde 1 y no 0

        // Posiciona al alumno en la lista
        const alumnoSorteado = alumnos[numeroAleatorio];

        // Encontrar la fila correspondiente al alumno sorteado
        const fila = listaPersonajes.children[numeroAleatorio];

        // Actualizar el puesto y el nombre del alumno en la fila correspondiente
        const celdas = fila.children;
        celdas[0].innerHTML = numeroAleatorio + 1; // Actualiza el puesto (columna 0)
        celdas[1].innerHTML = alumnoSorteado; // Actualiza el nombre del alumno (columna 1)

        // Verificar si se han sorteado todos los números
        if (numerosSorteados.length === alumnos.length) {
            setTimeout(() => {
                document.getElementById("btn-crear").hidden = false;
                document.getElementById("texto-final").innerHTML = "<br><br> SORTEO FINALIZADO!";
                document.getElementById("gif").hidden = false;
            }, 300); // Mostrar el mensaje después de una breve pausa
        } else {
            // Reiniciar el temporizador para ejecutar automáticamente si no se presiona el botón
            temporizadorBingo = setTimeout(sortearNumeros, 5000);
        }
    }, 2000); // 2000ms es el tiempo que dura la animación (2 segundos)
}

// ! APARTADO PARA CREAR EL PDF
function crearPDF() {
    // Importar jsPDF desde la librería
    const { jsPDF } = window.jspdf;

    // Verificar si hay alumnos en la tabla
    if (alumnos.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    // Crear una instancia de jsPDF
    const doc = new jsPDF();

    // Título del documento
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Posiciones de los Alumnos", 20, 20);

    // Agregar espacio entre el título y la tabla
    let y = 30;

    // Cabeceras de la tabla
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Puesto", 20, y);
    doc.text("Alumno", 60, y);

    // Línea horizontal para separar el encabezado
    doc.line(20, y + 2, 190, y + 2);

    // Iterar sobre los alumnos y sus posiciones
    alumnos.forEach((alumno, index) => {
        y += 10; // Aumentar la posición vertical

        // Agregar datos del alumno al PDF
        doc.text((index + 1).toString(), 20, y); // Puesto
        doc.text(alumno, 60, y);                 // Nombre del alumno
    });

    // Descargar el PDF con un nombre personalizado
    doc.save("Posiciones_Alumnos.pdf");
}






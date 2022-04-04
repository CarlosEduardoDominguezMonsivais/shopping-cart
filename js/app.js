'use strict';

//variables
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const botonVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];
cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    //Vaciar carrito de compras
    botonVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarContenidoCarrito();
    });
}

//funciones
function agregarCurso(e) {
    e.preventDefault();
    const btnAddCurso = e.target.classList.contains('agregar-carrito');
    const contentCard = e.target.parentElement.parentElement;
    leerDatosCurso(contentCard);
}

//Lee el contenido del html al que le dimos click y extrae la información del curso

function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //Actualizar la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso; //Retorna los objetos que no son duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else {
        //Agregar elementos al arreglo
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML(articulosCarrito);
}

//Mostrar en el Carrito de compras en el HTML
function carritoHTML() {
    //Limpiar el Html
    limpiarContenidoCarrito();

    //recorre el arreglo y lo pone en HTML
    articulosCarrito.forEach((producto) => {
        const row = document.createElement('tr');
        //Utiliar destruccion methods para objetos y optimizar codigo
        const { imagen, titulo, precio, cantidad } = producto;

        row.innerHTML = `
            <td><img src="${imagen}" width="100" /></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${producto.id}">x</a>
            </td>
       `;

        contenedorCarrito.appendChild(row)
    })
}

function limpiarContenidoCarrito() {
    while (contenedorCarrito.firstElementChild !== null) {
        contenedorCarrito.removeChild(contenedorCarrito.firstElementChild);
    }
}

//Funcion de elminar un articulo del carrito de compras
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo de articuloCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //Itera sobre el carrito y lo uestra en el HTML
        carritoHTML();
    }
}
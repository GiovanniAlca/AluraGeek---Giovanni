import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[lista-productos]");

if (!lista) {
    console.error("No se encontró el contenedor de productos.");
}

function CrearCard(nombre,precio,imagen, id) {
    const producto = document.createElement("li");
    producto.className = "card";
    producto.innerHTML = `
    <img src="${imagen}" alt="Imagen de juego" class="imagenCard">
                        <div class="cardInfo">
                        <div class="cardInfoNombre">
                                <p class="nombreProducto">${nombre}</p>
                            </div>
                            
                            <div class="cardPrecioEliminar">
                                <p class="precioProducto">S/.${precio}</p>
                                <img src="img/TrashIcon.png" alt="Eliminar" class="eliminarProducto" data-id="${id}">
                            </div>
                        </div>
    `;

    const eliminarProductoBtn = producto.querySelector(".eliminarProducto");
    eliminarProductoBtn.addEventListener("click", async (evento) => {
        const id = evento.target.getAttribute("data-id");
        const confirmar = confirm("¿Estás seguro de eliminar este producto?");
        
        if (confirmar) {
            try {
                await conexionAPI.eliminarProducto(id);
                evento.target.closest(".card").remove();
                await actualizarListaProductos(); // Actualizar la lista después de eliminar
            } catch (error) {
                alert("Error al eliminar el producto: " + error.message);
            }
        } else {
            conexionAPI.mostrarAlerta("Eliminación cancelada");
        }
    });
    return producto;    
}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();
    listaAPI.forEach(producto => {
        lista.appendChild(CrearCard(producto.nombre,producto.precio,producto.imagen, producto.id));
    });
}

async function actualizarListaProductos() {
    const listaAPI = await conexionAPI.listarProductos();
    lista.innerHTML = '';  // Limpiar la lista actual
    lista.innerHTML = `<li class="card">
    <img src="img/Game Boy Classic.png" alt="Imagen de juego" class="imagenCard">
    <div class="cardInfo">
        <div class="cardInfoNombre">
            <p class="nombreProducto">Game Boy Classic</p>
        </div>
        <div class="cardPrecioEliminar">
            <p class="precioProducto">S/.120</p>
            <img src="img/TrashIcon.png" alt="Eliminar" class="eliminarProducto" data-id>
        </div>
    </div>
    
</li>`;
    listaAPI.forEach(producto => {
        lista.appendChild(CrearCard(producto.nombre, producto.precio, producto.imagen, producto.id));
    });
}

listarProductos();

const modal = document.getElementById("modal");
const modalImagen = document.getElementById("modalImagen");
const cerrarModal = document.getElementById("cerrarModal");
const NombreProducto =document.getElementById("nombreProducto");

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('imagenCard')) {
        modal.style.display = "flex";
        modalImagen.src = e.target.src; 

        const nombre = e.target.closest(".card").querySelector(".nombreProducto").innerText;
        NombreProducto.textContent = nombre;
    }
});

cerrarModal.addEventListener('click', () =>{
    modal.style.display="none";
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
})
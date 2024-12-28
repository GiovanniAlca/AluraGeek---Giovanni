import { conexionAPI } from "./conexionAPI.js";

const lista = document.querySelector("[lista-productos]");

function CrearCard(nombre,precio,imagen) {
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
                                <img src="img/TrashIcon.png" alt="">
                            </div>
                        </div>
    `;
    return producto;
}

async function listarProductos() {
    const listaAPI = await conexionAPI.listarProductos();
    listaAPI.forEach(producto => {
        lista.appendChild(CrearCard(producto.nombre,producto.precio,producto.imagen));
    });
}

listarProductos();
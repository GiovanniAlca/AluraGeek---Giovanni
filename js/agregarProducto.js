import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function agregarProducto(evento) {
    
    evento.preventDefault();
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try {
        await conexionAPI.enviarProducto(nombre,precio,imagen);
        alert("producto agregado con exito");
        location.reload();
    } catch (error) {
        alert("Error al agregar el producto " + error.message);
    }

}

formulario.addEventListener("submit", evento => agregarProducto(evento));


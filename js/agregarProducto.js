import { conexionAPI } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

async function agregarProducto(evento) {
    evento.preventDefault();
    
    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;
    
    console.log("Datos del producto:", { nombre, precio, imagen });  

    try {
        console.log("Enviando producto...");
        const resultadoEnvio = await conexionAPI.enviarProducto(nombre, precio, imagen);
        console.log("Resultado al agregar producto:", resultadoEnvio); 
        alert("Producto agregado con éxito");
        
        console.log("Actualizando lista de productos...");
        location.reload();
    } catch (error) {
        console.error("Error al agregar el producto:", error.message);
        alert("Error al agregar el producto: " + error.message);
    }
}

formulario.addEventListener("submit", evento => agregarProducto(evento));

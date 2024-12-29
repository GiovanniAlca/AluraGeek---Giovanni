const serverURL = 'https://alurageek-giovanni.onrender.com';

async function listarProductos() {
    try {
        console.log("Iniciando solicitud de productos...");
        const conexion = await fetch(`${serverURL}/productos`);
        console.log("Respuesta recibida de la API:", conexion);

        const conexionConvertida = await conexion.json();
        console.log("Productos obtenidos de la API:", conexionConvertida);

        return conexionConvertida;
    } catch (error) {
        console.error("Error al listar productos:", error);
    }
}

async function enviarProducto(nombre, precio, imagen, id) {
        console.log(`Enviando producto: ${nombre}, ${precio}, ${imagen}, ${id}`);
        const conexion = await fetch(`${serverURL}/productos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: id,
                nombre: nombre,
                precio: precio,
                imagen: imagen
            })
        });  

        const conexionConvertida = await conexion.json();

        return conexionConvertida;

}

async function eliminarProducto(id) {
    try {
        console.log(`Eliminando producto con ID: ${id}`);
        const respuesta = await fetch(`${serverURL}/productos/${id}`, {
            method: "DELETE",
        });
        if (!respuesta.ok) {
            alert("No se pudo eliminar el producto");
        } else {
            console.log("Producto eliminado exitosamente");
            await actualizarListaProductos();
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
}

async function actualizarListaProductos() {
    try {
        console.log("Actualizando lista de productos...");
        const listaAPI = await listarProductos();  
        lista.innerHTML = '';  // Limpiar la lista actual
        listaAPI.forEach(producto => {
            lista.appendChild(CrearCard(producto.nombre, producto.precio, producto.imagen, producto.id));
        });
    } catch (error) {
        console.error("Error al actualizar lista de productos:", error);
    }
}

export const conexionAPI = {
    listarProductos, enviarProducto, eliminarProducto
}

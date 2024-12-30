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
            mostrarAlerta("No se pudo eliminar el producto.");
        } else {
            console.log("Producto eliminado exitosamente");
            await actualizarListaProductos();
            mostrarAlerta("Producto eliminado correctamente.");
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        mostrarAlerta("Error al eliminar el producto.");
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


function mostrarAlerta(mensaje) {
    // Crear el contenedor de la alerta
    const alerta = document.createElement('div');
    alerta.textContent = mensaje;
    alerta.style.position = 'fixed';
    alerta.style.top = '50%';
    alerta.style.left = '50%';
    alerta.style.transform = 'translate(-50%, -50%)';
    alerta.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    alerta.style.color = '#fff';
    alerta.style.padding = '20px';
    alerta.style.borderRadius = '8px';
    alerta.style.fontSize = '16px';
    alerta.style.zIndex = '9999';
    alerta.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
    alerta.style.transition = 'opacity 0.5s ease';

    // Agregar la alerta al DOM
    document.body.appendChild(alerta);

    // Después de 3 segundos, eliminar la alerta
    setTimeout(() => {
        alerta.style.opacity = '0';
        setTimeout(() => alerta.remove(), 500);  // Eliminar después de la animación
    }, 3000);
}

export const conexionAPI = {
    listarProductos, enviarProducto, eliminarProducto, mostrarAlerta, actualizarListaProductos
}

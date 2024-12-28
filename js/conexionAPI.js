const serverURL = 'https://alurageek-giovanni.onrender.com';

async function listarProductos() {
    const conexion = await fetch(`${serverURL}/productos`);
    const conexionConvertida = await conexion.json();
    
    console.log(conexionConvertida);
    return conexionConvertida;
}

async function enviarProducto(nombre, precio, imagen, id) {
    const conexion = await fetch(`${serverURL}/productos`,{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            id:id,
            nombre: nombre,
            precio: precio,
            imagen:imagen
        })
    })
    const conexionConvertida = await conexion.json();
    console.log(conexionConvertida);
    return conexionConvertida;
}

async function eliminarProducto(id) {
    const confirmar = confirm("¿Estás seguro de eliminar este producto?");
    
    if (confirmar) {
        const respuesta = await fetch(`${serverURL}/productos/${id}`,{
            method: "DELETE",
        });

        if (!respuesta.ok) {
            alert("No se pudo eliminar el producto");
        } else {
            alert("Producto eliminado con éxito");
            actualizarListaProductos();
            location.reload();
        }
    } else {
        alert("Eliminación cancelada");
    }
}

async function actualizarListaProductos() {
    const lista = document.querySelector("[lista-productos]");
    lista.innerHTML = '';  // Limpiar la lista actual
    const productos = await listarProductos();  // Obtener la lista actualizada
    productos.forEach(producto => {
        lista.appendChild(CrearCard(producto.nombre, producto.precio, producto.imagen));  // Volver a renderizar los productos
    });
}

export const conexionAPI = {
    listarProductos, enviarProducto, eliminarProducto
}

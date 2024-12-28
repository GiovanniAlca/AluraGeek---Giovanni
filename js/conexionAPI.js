async function listarProductos() {
    const conexion = await fetch("http://localhost:3002/productos");
    const conexionConvertida = await conexion.json();
    
    console.log(conexionConvertida);
    return conexionConvertida;
}

async function enviarProducto(nombre, precio, imagen, id) {
    const conexion = await fetch("http://localhost:3002/productos",{
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
    return conexionConvertida;
}

async function eliminarProducto(id) {
    
    const confirmar = confirm("¿Estás seguro de eliminar este producto?")
    
    if (confirmar) {
        const respuesta = await fetch(`http://localhost:3002/productos/${id}`,{
            method: "DELETE",
        });

        if (!respuesta.ok) {
        alert("No se pudo eliminar producto")
        } else {
            alert("Producto eliminado con éxito")
        }
    } else {
        alert("Eliminación cancelada");
        location.reload();
    }
    



    
}

export const conexionAPI={
    listarProductos, enviarProducto, eliminarProducto
}
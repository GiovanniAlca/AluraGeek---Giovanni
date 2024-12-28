async function listarProductos() {
    const conexion = await fetch("http://localhost:3002/productos");
    const conexionConvertida = await conexion.json();
    
    console.log(conexionConvertida);
    return conexionConvertida;
}

async function enviarProducto(nombre, precio, imagen) {
    const conexion = await fetch("http://localhost:3002/productos",{
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
            nombre: nombre,
            precio: precio,
            imagen:imagen
        })
    })
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

export const conexionAPI={
    listarProductos, enviarProducto
}
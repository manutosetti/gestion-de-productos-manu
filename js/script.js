let productos = JSON.parse(localStorage.getItem("productos")) || [];

class Product {
    constructor(producto, categoria, precio, stock) {
        this.producto = producto;
        this.categoria = categoria;
        this.precio = precio;
        this.stock = stock;
    }
}

document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
 
    let producto = document.getElementById("articulo").value;
    let categoria = document.getElementById("categoria").value;
    let precio = parseFloat(document.getElementById("precio").value);
    let stock = parseInt(document.getElementById("stock").value, 10);
    let alerta = document.getElementById("alerta-form");

    if (producto === "" || categoria === "" || isNaN(precio) || isNaN(stock)) {
        alerta.innerHTML = "<p>Se debe ingresar los valores correspondientes</p>";
        return;
    } else {
        alerta.innerHTML = "";
    }

    let product = new Product(producto, categoria, precio, stock);
    productos.push(product);
    localStorage.setItem("productos", JSON.stringify(productos)); // Guardar en localStorage
    anadirALista(product);
    limpiarInputs();
});

function anadirALista(product) {
    let listaProducto = document.getElementById("texto-agregar");
    let element = document.createElement('div');
    element.classList.add('div-productos');
    element.innerHTML = `
        <div class="carta-div">
            <strong>Producto:</strong> ${product.producto} <br>
            <strong>Categoria:</strong> ${product.categoria} <br>
            <strong>Precio del producto:</strong> ${product.precio.toFixed(2)} <br>
            <strong>Stock del producto:</strong> <input type="number" class="stock-input" value="${product.stock}" min="0" /> <br>
            <button class="delete">Eliminar</button>
        </div>
    `;
    listaProducto.appendChild(element);

    element.querySelector('.delete').addEventListener('click', function() {
        let i = productos.findIndex(p => p.producto === product.producto);
        if (i > -1) {
            productos.splice(i, 1);
            localStorage.setItem("productos", JSON.stringify(productos)); // Actualizar localStorage
        }
        element.remove();
    });

    element.querySelector('.stock-input').addEventListener('change', function(e) {
        let nuevoStock = parseInt(e.target.value, 10);
        if (!isNaN(nuevoStock)) {
            let i = productos.findIndex(p => p.producto === product.producto);
            if (i > -1) {
                productos[i].stock = nuevoStock;
                localStorage.setItem("productos", JSON.stringify(productos)); // Actualizar localStorage
            }
        }
    });
}

function limpiarInputs() {
    document.getElementById("articulo").value = "";
    document.getElementById("categoria").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
}

document.getElementById("search-btn").addEventListener("click", function(e) {
    e.preventDefault();
    let buscarCategoria = document.getElementById("search-input").value.toLowerCase();
    buscarPorCategoria(buscarCategoria);
});

function buscarPorCategoria(categoria) {
    let resultados = productos.filter(product => product.categoria.toLowerCase() === categoria);
    let resultadoContenido = document.getElementById("resultado-contenido");

    resultadoContenido.innerHTML = "";

    if (resultados.length > 0) {
        resultados.forEach(product => {
            let element = document.createElement('div');
            element.classList.add('resultado-item');
            element.innerHTML = `
                <div class="carta-div">
                    <strong>Producto:</strong> ${product.producto} <br>
                    <strong>Categoria:</strong> ${product.categoria} <br>
                    <strong>Precio del producto:</strong> ${product.precio.toFixed(2)} <br>
                    <strong>Stock del producto:</strong> <input type="number" class="stock-input" value="${product.stock}" min="0" /> <br>
                </div>
            `;
            resultadoContenido.appendChild(element);

            element.querySelector('.stock-input').addEventListener('change', function(e) {
                let nuevoStock = parseInt(e.target.value, 10);
                if (!isNaN(nuevoStock)) {
                    let i = productos.findIndex(p => p.producto === product.producto);
                    if (i > -1) {
                        productos[i].stock = nuevoStock;  // Actualizar el stock en el array
                        localStorage.setItem("productos", JSON.stringify(productos)); // Actualizar localStorage
                    }
                }
            });
        });
    } else {
        resultadoContenido.innerHTML = "<p>No se encontraron productos en esta categoría.</p>";
    }
}

function calcularValorTotalInventario() {
    let valorTotal = productos.reduce((total, producto) => {
        return total + (producto.precio * producto.stock);
    }, 0);
    document.getElementById("valor-total-inventario").innerText = `Valor total del inventario: $${valorTotal.toFixed(2)}`;
}

document.getElementById("calcular-inventario-btn").addEventListener("click", function() {
    calcularValorTotalInventario();
});

// Cargar productos al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    productos.forEach(product => anadirALista(product));
    console.log("Productos cargados desde localStorage");
});

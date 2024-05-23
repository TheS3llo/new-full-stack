const URL_BASE = "http://localhost:3000";
const mainDiv = document.querySelector("#main_list");
const isLoggedIn = true;
const token = localStorage.getItem("token");

if (token) {
    // Si hay un token, hacer una solicitud al backend para obtener la lista de productos
    fetch("ruta/al/backend/lista-de-productos", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo obtener la lista de productos");
        }
        return response.json();
    })
    .then(data => {
        // Mostrar la lista de productos en la página
        const productList = document.getElementById("main_list");
        // Código para mostrar la lista de productos
    })
    .catch(error => {
        console.error("Error al obtener la lista de productos:", error);
    });
}

window.onload = function() {
    // Mostrar elementos si el usuario está conectado
    if (isLoggedIn) {
        document.getElementById("recentlyAddedTitle").style.display = "block";
        document.getElementById("main_list").style.display = "block";
    }
};

// Supongamos que esta función se llama cuando el usuario ha iniciado sesión correctamente
function mostrarMainList() {
    // Obtener la referencia a la div main_list
    var mainListDiv = document.getElementById("main_list");
    // Quitar la clase 'hidden'
    mainListDiv.classList.remove("hidden");
}


// Obtener y mostrar productos
const getProducts = async () => {
    try {
        const response = await fetch(`${URL_BASE}/products`);
        const { data } = await response.json();
        console.log(data);

        // Armar HTML
        let content = "";
        for (const product of data) {
            content += `
                <div class="box" id="product-${product.id}">
                    <p><span>nombre:</span> ${product.name}</p>
                    <p><span>categoria:</span> ${product.category}</p>
                    <p><span>descripcion:</span> ${product.description}</p>
                    <p><span>precio:</span> ${product.price}</p>
                    <button onclick="deleteProduct(${product.id})">Eliminar</button>
                </div>
            `;
        }
        mainDiv.innerHTML = content;

    } catch (error) {
        console.log(error);
    }
};

// Enviar nuevo producto
document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;

    const product = { name, category, description, price };

    try {
        const response = await fetch(`${URL_BASE}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const newProduct = await response.json();
            addProductToDOM(newProduct.data);
            document.getElementById('addProductForm').reset(); // Resetear formulario después de enviar
        } else {
            console.error('Error adding product:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

function addProductToDOM(product) {
    const productDiv = document.createElement('div');
    productDiv.classList.add('box');
    productDiv.id = `product-${product.id}`;
    productDiv.innerHTML = `
        <p><span>nombre:</span> ${product.name} </p>
        <p><span>categoria:</span> ${product.category} </p>
        <p><span>descripcion:</span> ${product.description} </p>
        <p><span>precio:</span> ${product.price} </p>
        <button onclick="deleteProduct(${product.id})">Eliminar</button>
    `;
    mainDiv.appendChild(productDiv);
}

// Eliminar producto
async function deleteProduct(id) {
    try {
        const response = await fetch(`${URL_BASE}/products/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.getElementById(`product-${id}`).remove();
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Inicializar obteniendo los productos existentes
getProducts();

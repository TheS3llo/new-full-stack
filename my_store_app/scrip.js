// script.js

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { token, productList } = await response.json();
            // Guardar el token en el almacenamiento local (localStorage) para su uso futuro
            localStorage.setItem("token", token);
            
            // Mostrar la lista de productos
            displayProductList(productList);
        } else {
            alert("Failed to login. Please check your credentials.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
    }
}

function displayProductList(productList) {
    const productListContainer = document.getElementById("productList");
    productListContainer.innerHTML = ""; // Limpiar la lista existente
    
    productList.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = product.name;
        productListContainer.appendChild(listItem);
    });

    // Mostrar la lista principal
    document.getElementById("main_list").style.display = "block";
}

// Verificar si el usuario ya ha iniciado sesión anteriormente (al recargar la página)
window.onload = function() {
    const token = localStorage.getItem("token");
    if (token) {
        // Simular la obtención de la lista de productos del usuario
        const productList = [{ name: "Product 1" }, { name: "Product 2" }, { name: "Product 3" }];
        displayProductList(productList);
    }
};

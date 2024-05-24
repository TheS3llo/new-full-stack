// script.js


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



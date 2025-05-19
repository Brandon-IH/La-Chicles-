document.addEventListener("DOMContentLoaded", function() {
    const categoryFilter = document.getElementById("categoryFilter");
    const sortFilter = document.getElementById("sortFilter");
    const productList = document.getElementById("product-list");
    const products = Array.from(document.querySelectorAll(".product-item"));

    function filterProducts() {
        const category = categoryFilter.value;
        const sortOrder = sortFilter.value;

        // Filtrar productos según la categoría seleccionada
        let filteredProducts = products.filter(product => {
            let productCategory = product.getAttribute("data-category");
            return category === "" || productCategory === category;
        });

        // Ordenar productos por precio
        filteredProducts.sort((a, b) => {
            let priceA = parseFloat(a.getAttribute("data-price"));
            let priceB = parseFloat(b.getAttribute("data-price"));
            return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
        });

        // Limpiar contenedor usando fragment para mejor rendimiento
        productList.innerHTML = "";
        const fragment = document.createDocumentFragment();

        filteredProducts.forEach(product => {
            product.style.opacity = "0"; // Inicia con opacidad baja para animación
            fragment.appendChild(product);
        });

        productList.appendChild(fragment);

        // Aplicar animación de fade-in
        setTimeout(() => {
            filteredProducts.forEach(product => {
                product.style.transition = "opacity 0.5s ease-in-out";
                product.style.opacity = "1";
            });
        }, 100);
    }

    categoryFilter.addEventListener("change", filterProducts);
    sortFilter.addEventListener("change", filterProducts);

    filterProducts();
});

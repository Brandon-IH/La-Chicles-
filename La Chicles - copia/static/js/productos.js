document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const categoriaSeleccionada = params.get("categoria");

    const categoryFilter = document.getElementById("categoryFilter");
    const articleFilter = document.getElementById("articleFilter");
    const sortFilter = document.getElementById("sortFilter");
    const productList = document.getElementById("product-list");
    const toggleButton = document.getElementById("toggleFilters");
    const filters = document.getElementById("filters");

    // 🔹 Mostrar filtros correctamente en responsive
    toggleButton.addEventListener("click", () => {
        filters.style.display = filters.style.display === "none" ? "flex" : "none";
    });

    function filtrarYOrdenar() {
        const categoria = categoriaSeleccionada || categoryFilter.value; // Priorizar URL si viene desde el index
        const articulo = articleFilter.value;
        const orden = sortFilter.value;

        const productos = Array.from(document.querySelectorAll('.product-item'));

        productos.forEach(producto => {
            const cat = producto.dataset.category.toLowerCase();
            const prenda = producto.dataset.prenda.toLowerCase();

            const coincideCategoria = !categoria || cat === categoria.toLowerCase();
            const coincidePrenda = !articulo || prenda === articulo.toLowerCase();

            producto.style.display = coincideCategoria && coincidePrenda ? 'block' : 'none';
        });

        // 🔹 Ordenar productos visibles por precio
        const productosVisibles = productos.filter(p => p.style.display !== 'none');
        productosVisibles.sort((a, b) => {
            const precioA = parseFloat(a.dataset.price);
            const precioB = parseFloat(b.dataset.price);
            return orden === 'asc' ? precioA - precioB : precioB - precioA;
        });

        productosVisibles.forEach(producto => productList.appendChild(producto));
    }

    // Si hay una categoría en la URL, ajustar el filtro automáticamente
    if (categoriaSeleccionada) {
        categoryFilter.value = categoriaSeleccionada;
    }

    // 🔹 Eventos de actualización de filtros
    categoryFilter.addEventListener('change', filtrarYOrdenar);
    articleFilter.addEventListener('change', filtrarYOrdenar);
    sortFilter.addEventListener('change', filtrarYOrdenar);

    // 🔹 Ejecutar al inicio para aplicar filtros iniciales
    filtrarYOrdenar();
});


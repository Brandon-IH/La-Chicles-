document.addEventListener('DOMContentLoaded', () => {
    const categoryFilter = document.getElementById('categoryFilter');
    const articleFilter = document.getElementById('articleFilter');
    const sortFilter = document.getElementById('sortFilter');
    const productList = document.getElementById('product-list');

    function filtrarYOrdenar() {
        const categoria = categoryFilter.value;
        const articulo = articleFilter.value;
        const orden = sortFilter.value;

        const productos = Array.from(document.querySelectorAll('.product-item'));

        productos.forEach(producto => {
            const cat = producto.dataset.category.toLowerCase();
            const prenda = producto.dataset.prenda.toLowerCase();

            const coincideCategoria = !categoria || cat === categoria.toLowerCase();
            const coincidePrenda = !articulo || prenda === articulo.toLowerCase();

            if (coincideCategoria && coincidePrenda) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });

        // Ordenar productos visibles por precio
        const productosVisibles = productos.filter(p => p.style.display !== 'none');
        productosVisibles.sort((a, b) => {
            const precioA = parseFloat(a.dataset.price);
            const precioB = parseFloat(b.dataset.price);
            return orden === 'asc' ? precioA - precioB : precioB - precioA;
        });

        productosVisibles.forEach(producto => productList.appendChild(producto));
    }


    categoryFilter.addEventListener('change', filtrarYOrdenar);
    articleFilter.addEventListener('change', filtrarYOrdenar);
    sortFilter.addEventListener('change', filtrarYOrdenar);

    // Ejecutar al inicio para aplicar filtros iniciales si hay
    filtrarYOrdenar();
});

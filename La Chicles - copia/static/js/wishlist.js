document.addEventListener("DOMContentLoaded", function () {
    let wishlistHearts = document.querySelectorAll(".wishlist-heart");
    let wishlistContainer = document.getElementById("wishlist-items");
    let emptyMessage = document.getElementById("empty-message");

    function saveWishlist(wishlist) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }

    function loadWishlist() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        wishlistContainer.innerHTML = "";

        if (wishlist.length > 0) {
            emptyMessage.style.display = "none";
            wishlist.forEach(product => {
                let div = document.createElement("div");
                div.className = "col-md-4 mb-4";
                div.innerHTML = `
                    <div class="card">
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="text-primary fw-bold">Precio: $${product.price}</p>
                            <button class="btn btn-danger remove-btn" data-id="${product.id}">🗑 Eliminar</button>
                        </div>
                    </div>
                `;
                wishlistContainer.appendChild(div);
            });
        } else {
            emptyMessage.style.display = "block";
        }
    }

    wishlistHearts.forEach(heart => {
        let product = {
            id: heart.getAttribute("data-id"),
            name: heart.getAttribute("data-name"),
            image: heart.getAttribute("data-image"),
            price: heart.getAttribute("data-price")
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (wishlist.some(item => item.id === product.id)) {
            heart.innerText = "❤️";
        }

        heart.addEventListener("click", function () {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            let exists = wishlist.some(item => item.id === product.id);

            if (!exists) {
                wishlist.push(product);
                saveWishlist(wishlist);
                heart.innerText = "❤️";
            } else {
                wishlist = wishlist.filter(item => item.id !== product.id);
                saveWishlist(wishlist);
                heart.innerText = "🤍";
            }
        });
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-btn")) {
            let id = event.target.getAttribute("data-id");
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            wishlist = wishlist.filter(product => product.id !== id);
            saveWishlist(wishlist);
            loadWishlist();
        }
    });

    loadWishlist();
});

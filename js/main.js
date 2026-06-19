// ============================================================
// AUREA - Main JavaScript
// Cart management, customization, UI utilities
// ============================================================

// ---- Cart Management ----
const Cart = {
  get() {
    return JSON.parse(localStorage.getItem('aurea_cart') || '[]');
  },
  save(cart) {
    localStorage.setItem('aurea_cart', JSON.stringify(cart));
    Cart.updateBadge();
  },
  add(item) {
    const cart = Cart.get();
    cart.push({ ...item, id: Date.now() });
    Cart.save(cart);
    Cart.showToast(`${item.name} added to cart!`);
  },
  remove(id) {
    const cart = Cart.get().filter(i => i.id !== id);
    Cart.save(cart);
  },
  updateQuantity(id, qty) {
    const cart = Cart.get().map(i => i.id === id ? { ...i, quantity: qty } : i);
    Cart.save(cart);
  },
  getTotal() {
    return Cart.get().reduce((sum, i) => sum + (i.finalPrice * i.quantity), 0);
  },
  count() {
    return Cart.get().reduce((sum, i) => sum + i.quantity, 0);
  },
  updateBadge() {
    const badge = document.querySelector('.cart-badge');
    const count = Cart.count();
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  },
  showToast(msg) {
    let toast = document.getElementById('aurea-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'aurea-toast';
      toast.style.cssText = `
        position:fixed;bottom:30px;right:30px;background:#4B3E43;color:white;
        padding:14px 24px;border-radius:8px;font-size:14px;z-index:9999;
        transform:translateY(20px);opacity:0;transition:all 0.3s ease;
        font-family:'Montserrat',sans-serif;box-shadow:0 4px 20px rgba(0,0,0,0.2);
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = '✓  ' + msg;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
    }, 2800);
  }
};

// ---- Active Nav Link ----
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ---- Init on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  setActiveNav();
});


// document.addEventListener("DOMContentLoaded", function ()
// {
//     const shipping = 150;
//     const discount = 100;

//     function updateCart()
//     {
//         let subtotal = 0;

//         document.querySelectorAll(".cart-item").forEach(item =>
//         {
//             const quantity =
//                 parseInt(item.querySelector(".quantity").textContent);

//             const price =
//                 parseInt(item.querySelector(".price").dataset.price);

//             subtotal += quantity * price;
//         });

//         document.getElementById("subtotal").textContent =
//             "Rs. " + subtotal;

//         document.getElementById("total").textContent =
//             "Rs. " + (subtotal + shipping - discount);

//         document.querySelector(".cart-items h2").textContent =
//             `Items in Cart (${document.querySelectorAll(".cart-item").length})`;
//     }

//     document.querySelectorAll(".plus").forEach(button =>
//     {
//         button.addEventListener("click", function ()
//         {
//             const quantityElement =
//                 this.parentElement.querySelector(".quantity");

//             let quantity =
//                 parseInt(quantityElement.textContent);

//             quantity++;

//             quantityElement.textContent = quantity;

//             updateCart();
//         });
//     });

//     document.querySelectorAll(".minus").forEach(button =>
//     {
//         button.addEventListener("click", function ()
//         {
//             const quantityElement =
//                 this.parentElement.querySelector(".quantity");

//             let quantity =
//                 parseInt(quantityElement.textContent);

//             if (quantity > 1)
//             {
//                 quantity--;

//                 quantityElement.textContent = quantity;

//                 updateCart();
//             }
//         });
//     });

//     document.querySelectorAll(".remove-btn").forEach(button =>
//     {
//         button.addEventListener("click", function ()
//         {
//             this.closest(".cart-item").remove();

//             updateCart();
//         });
//     });

//     updateCart();
// });







document.addEventListener("DOMContentLoaded", function ()
{
    const shipping = 150;
    const discount = 100;

    function updateCart()
    {
        let subtotal = 0;

        document.querySelectorAll(".cart-item").forEach(item =>
        {
            const price =
                parseInt(item.querySelector(".price").dataset.price);

            const quantity =
                parseInt(item.querySelector(".quantity").textContent);

            subtotal += price * quantity;
        });

        const total = subtotal + shipping - discount;

        document.getElementById("subtotal").textContent =
            `Rs. ${subtotal}`;

        document.getElementById("total").textContent =
            `Rs. ${total}`;

        const itemCount =
            document.querySelectorAll(".cart-item").length;

        document.getElementById("cart-count").textContent =
            `Items in Cart (${itemCount})`;

        if(itemCount === 0)
        {
            document.querySelector(".cart-items").innerHTML =
            `
            <h2 id="cart-count">Items in Cart (0)</h2>
            <p class="empty-cart">
                Your cart is currently empty.
            </p>
            `;

            document.getElementById("subtotal").textContent =
                "Rs. 0";

            document.getElementById("total").textContent =
                `Rs. ${shipping - discount}`;
        }
    }

    document.addEventListener("click", function(e)
    {
        if(e.target.classList.contains("plus"))
        {
            const quantity =
                e.target.parentElement.querySelector(".quantity");

            quantity.textContent =
                parseInt(quantity.textContent) + 1;

            updateCart();
        }

        if(e.target.classList.contains("minus"))
        {
            const quantity =
                e.target.parentElement.querySelector(".quantity");

            let value =
                parseInt(quantity.textContent);

            if(value > 1)
            {
                quantity.textContent = value - 1;
                updateCart();
            }
        }

        if(e.target.classList.contains("remove-btn"))
        {
            e.target.closest(".cart-item").remove();
            updateCart();
        }
    });


    

const addCartBtn = document.querySelector(".add-cart-btn");

if(addCartBtn)
{
    addCartBtn.addEventListener("click", () =>
    {
        const quantity =
        parseInt(
            document.getElementById("product-quantity").value
        ) || 1;

        const product =
        {
            name:
            document.getElementById("product-name").textContent,

            price:
            parseInt(
                document
                .getElementById("product-price")
                .textContent.replace(/[^\d]/g, "")
            ),

            image:
            document.getElementById("product-image").src,

            quantity: quantity
        };

        // let cart =
        // JSON.parse(localStorage.getItem("cart")) || [];
let cart =
JSON.parse(localStorage.getItem("aurea_cart")) || [];
        const existing =
        cart.find(item => item.name === product.name);

        if(existing)
        {
            existing.quantity += quantity;
        }
        else
        {
            cart.push(product);
        }

        // localStorage.setItem(
        //     "cart",
        //     JSON.stringify(cart)
        // );
        localStorage.setItem(
"aurea_cart",
JSON.stringify(cart)
);

        const popup =
        document.getElementById("cart-popup");

        //popup.classList.add("show");
          alert("Added to cart!");
        setTimeout(() =>
        {
            popup.classList.remove("show");
        }, 2000);
    });
}
    updateCart();
});


// ---- Product Card Add To Cart ----

document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".add-cart").forEach(button => {


        button.addEventListener("click", () => {


            const product = {

                name: button.dataset.name,

                finalPrice: Number(button.dataset.price),

                quantity: 1,

                image: button.dataset.image

            };


            Cart.add(product);


        });


    });


});
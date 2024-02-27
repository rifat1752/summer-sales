// modal 
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal1");
    const modalTrigger = document.getElementById("openModalButton"); // Replace with the actual ID of the button triggering the modal

    if (modal && modalTrigger) {
        modalTrigger.addEventListener("click", function() {
            modal.classList.add("modal-open"); // Apply the necessary CSS class to show the modal
        });

        // Add event listener to close the modal
        const modalCloseButton = modal.querySelector(".modalclose");
        if (modalCloseButton) {
            modalCloseButton.addEventListener("click", function() {
                modal.classList.remove("modal-open"); // Remove the CSS class to hide the modal
            });
        }
    }
});


// let start main code
document.addEventListener("DOMContentLoaded", function() {
    const productCards = document.querySelectorAll(".card");
    const applyButton = document.querySelector(".coupon button");
    const purchaseButton = document.getElementById("purchased")
    const closeButton = document.querySelector(".madalclose");
    const productList = document.querySelector(".purchase ol");
    const totalPrice = document.querySelector(".purchase li:nth-child(1) span");
    const discount = document.querySelector(".purchase li:nth-child(2) span");
    const finalTotal = document.querySelector(".purchase li:nth-child(3) span");
    const couponSale =document.querySelector("#input");



    let selectedProducts = JSON.parse(localStorage.getItem("selectedProducts")) || [];
    let currentTotalPrice = parseFloat(localStorage.getItem("currentTotalPrice")) || 0;

    applyButton.disabled = true;
    purchaseButton.disabled = true;

    updateProductList();
    updateTotalPrices();
    applyButtons();
    purchaseButtons();

    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const productName = card.querySelector(".card-title").textContent.trim();
            const productPrice = parseFloat(card.querySelector(".text-gray-500").textContent);

            selectedProducts.push({ name: productName, price: productPrice });
            currentTotalPrice += productPrice;

            updateProductList();
            updateTotalPrices();
            applyButtons();
            purchaseButtons();
            saveToLocalStorage();
        });
    });

    applyButton.addEventListener("click", () => {
        if (couponSale.value === "SELL200") {
            const discountAmount = currentTotalPrice * 0.2;
            discount.textContent = `${discountAmount.toFixed(2)} TK`;

            const discountedTotal = currentTotalPrice - discountAmount;
            finalTotal.textContent = `${discountedTotal.toFixed(2)} TK`;
        }
    });

    closeButton.addEventListener("click", () => {
        selectedProducts = [];
        currentTotalPrice = 0;

        updateProductList();
        updateTotalPrices();
        applyButtons();
        purchaseButtons();
        couponSale.value = "";
        saveToLocalStorage();
    });


    function updateProductList() {
        productList.innerHTML = "";
        selectedProducts.forEach((product, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${product.name}`;
            productList.appendChild(listItem);
        });
    }

    function updateTotalPrices() {
        totalPrice.textContent = `${currentTotalPrice.toFixed(2)} TK`;
        discount.textContent = "00.00 TK";
        finalTotal.textContent = `${currentTotalPrice.toFixed(2)} TK`;
    }

    function applyButtons() {
        if ( currentTotalPrice > 200) {
            applyButton.disabled = false;

        } else {
            applyButton.disabled = true;  
        }
    }
    function purchaseButtons() {
        if ( selectedProducts.length > 0) {
            purchaseButton.disabled = false;

        } else {
            purchaseButton.disabled = true;  
        }
    }
    
    function saveToLocalStorage() {
        localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
        localStorage.setItem("currentTotalPrice", currentTotalPrice);
    }

});
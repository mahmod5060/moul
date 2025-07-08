let products = [];

// استرجاع من LocalStorage
window.onload = function () {
  const saved = localStorage.getItem("smart-products");
  if (saved) {
    products = JSON.parse(saved);
    displayProducts(products);
  }
};

document.getElementById("addBtn").addEventListener("click", function () {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const imageInput = document.getElementById("productImage");

  if (!name || !price || !imageInput.files[0]) {
    alert("⚠️ من فضلك أدخل كل البيانات");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const product = {
      id: Date.now(),
      name,
      price: parseFloat(price).toFixed(2),
      image: e.target.result,
    };

    products.push(product);
    saveAndDisplay();
    clearForm();
  };
  reader.readAsDataURL(imageInput.files[0]);
});

function displayProducts(list) {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  list.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="صورة المنتج">
      <h3>${product.name}</h3>
      <p>💰 ${product.price} جنيه</p>
    `;
    container.appendChild(div);
  });
}

function clearForm() {
  document.getElementById("productName").value = '';
  document.getElementById("productPrice").value = '';
  document.getElementById("productImage").value = '';
}

// تخزين البيانات محليًا
function saveAndDisplay() {
  localStorage.setItem("smart-products", JSON.stringify(products));
  displayProducts(products);
}

// 🔍 بحث ذكي
document.getElementById("searchInput").addEventListener("input", function (e) {
  const query = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(query));
  displayProducts(filtered);
});

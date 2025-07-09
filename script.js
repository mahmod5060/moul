const password = "admin123"; // ← غير كلمة السر هنا لو حبيت
let accessGranted = false;
let products = [];

window.onload = () => {
  const saved = localStorage.getItem("smart-products");
  if (saved) {
    products = JSON.parse(saved);
    displayProducts();
  }
};

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === password) {
    accessGranted = true;
    document.getElementById("formSection").classList.remove("hidden");
    displayProducts();
  } else {
    alert("❌ كلمة السر غير صحيحة");
  }
}

function addProduct() {
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const imageInput = document.getElementById("productImage");

  if (!name || !price || !imageInput.files[0]) {
    alert("⚠️ أدخل كل البيانات");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const product = {
      id: Date.now(),
      name,
      price: parseFloat(price).toFixed(2),
      image: e.target.result
    };
    products.push(product);
    saveProducts();
    clearForm();
    displayProducts();
  };
  reader.readAsDataURL(imageInput.files[0]);
}

function displayProducts() {
  const container = document.getElementById("productList");
  container.innerHTML = "";

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}" alt="صورة المنتج">
      <h3>${product.name}</h3>
      <p>💰 ${product.price} جنيه</p>
      <div class="actions ${accessGranted ? "visible" : ""}">
        <button onclick="editProduct(${product.id})">✏️ تعديل</button>
        <button onclick="deleteProduct(${product.id})">🗑️ حذف</button>
      </div>
    `;
    container.appendChild(div);
  });
}

function clearForm() {
  document.getElementById("productName").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productImage").value = "";
}

function saveProducts() {
  localStorage.setItem("smart-products", JSON.stringify(products));
}

function deleteProduct(id) {
  if (confirm("هل أنت متأكد أنك تريد حذف هذا المنتج؟")) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    displayProducts();
  }
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  const newName = prompt("📝 أدخل اسم جديد:", product.name);
  const newPrice = prompt("💰 أدخل سعر جديد:", product.price);

  if (newName && newPrice) {
    product.name = newName;
    product.price = parseFloat(newPrice).toFixed(2);
    saveProducts();
    displayProducts();
  }
}

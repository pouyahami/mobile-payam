(() => {
  const search = document.querySelector("#productSearch");
  const cards = [...document.querySelectorAll(".product-card")];
  const chips = [...document.querySelectorAll(".chip")];
  const resultCount = document.querySelector("#resultCount");
  const emptyState = document.querySelector("#emptyState");
  const cartCount = document.querySelector("#cartCount");
  const toast = document.querySelector("#toast");
  const menu = document.querySelector(".main-nav");
  const menuToggle = document.querySelector("#menuToggle");
  const cartDrawer = document.querySelector("#cartDrawer");
  const cartOverlay = document.querySelector("#cartOverlay");
  const cartItemsEl = document.querySelector("#cartItems");

  let activeBrand = "all";
  let toastTimer;
  const CART_KEY = "payam_cart_v1";

  const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
  }

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  let cart = loadCart();

  function updateBadge() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (cartCount) cartCount.textContent = fa(total);
  }

  function renderCart() {
    updateBadge();
    if (!cartItemsEl) return;
    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<div class="cart-empty">سبد خرید خالی است.<br><small>محصولات مورد علاقه را اضافه کنید و برای سفارش تماس بگیرید.</small></div>`;
      return;
    }
    cartItemsEl.innerHTML = cart.map((item) => `
      <div class="cart-item" data-id="${item.id}">
        <div>
          <strong>${item.name}</strong>
          <span>تعداد: ${fa(item.qty)}</span>
        </div>
        <div style="display:flex;gap:4px;align-items:center">
          <button class="qty-btn" data-action="dec">−</button>
          <button class="qty-btn" data-action="inc">+</button>
          <button class="remove-btn" data-action="remove">×</button>
        </div>
      </div>
    `).join("");
  }

  function openCart() {
    cartDrawer?.classList.add("open");
    cartOverlay?.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    cartDrawer?.classList.remove("open");
    cartOverlay?.classList.remove("open");
    document.body.style.overflow = "";
  }

  function addToCart(name, id) {
    const existing = cart.find((i) => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, qty: 1 });
    saveCart(cart);
    renderCart();
    notify(`«${name}» به سبد اضافه شد`);
  }

  function filterProducts() {
    const term = (search?.value || "").trim().toLocaleLowerCase("fa");
    let visible = 0;
    cards.forEach((card) => {
      const hay = (card.dataset.search + " " + card.textContent).toLocaleLowerCase("fa");
      const matchTerm = !term || hay.includes(term);
      const matchBrand = activeBrand === "all" || card.dataset.brand === activeBrand;
      const show = matchTerm && matchBrand;
      card.hidden = !show;
      if (show) visible++;
    });
    if (resultCount) resultCount.textContent = fa(visible) + " محصول";
    if (emptyState) emptyState.hidden = visible !== 0;
  }

  function resetFilters() {
    activeBrand = "all";
    if (search) search.value = "";
    chips.forEach((c, i) => {
      c.classList.toggle("active", i === 0);
    });
    filterProducts();
  }

  // Events
  search?.addEventListener("input", filterProducts);

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeBrand = chip.dataset.filter || "all";
      chips.forEach((c) => c.classList.toggle("active", c === chip));
      filterProducts();
    });
  });

  document.querySelector("#resetFilters")?.addEventListener("click", resetFilters);
  document.querySelector("#focusSearch")?.addEventListener("click", () => {
    search?.focus();
    search?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(btn.dataset.add, btn.dataset.id || btn.dataset.add);
    });
  });

  document.querySelector("#cartButton")?.addEventListener("click", openCart);
  document.querySelector("#closeCart")?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  cartItemsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const row = btn.closest(".cart-item");
    const id = row?.dataset.id;
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    const action = btn.dataset.action;
    if (action === "inc") item.qty++;
    else if (action === "dec") {
      item.qty--;
      if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
    } else if (action === "remove") {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart(cart);
    renderCart();
  });

  document.querySelector("#clearCart")?.addEventListener("click", () => {
    cart = [];
    saveCart(cart);
    renderCart();
    notify("سبد خالی شد");
  });

  document.querySelectorAll("[data-brand-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const brand = btn.dataset.brandLink;
      const chip = chips.find((c) => c.dataset.filter === brand);
      if (chip) chip.click();
      document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
    });
  });

  menuToggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("open") || false;
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  menu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const year = document.querySelector("#year");
  if (year) {
    const y = new Date().getFullYear();
    // Simple Persian year approx
    year.textContent = fa(y - 621);
  }

  renderCart();
  filterProducts();
})();

(() => {
  const search = document.querySelector("#productSearch");
  const cards = [...document.querySelectorAll(".product-card")];
  const filters = [...document.querySelectorAll(".filter-chip")];
  const resultCount = document.querySelector("#resultCount");
  const emptyState = document.querySelector("#emptyState");
  const cartCount = document.querySelector("#cartCount");
  const toast = document.querySelector("#toast");
  const menu = document.querySelector(".main-nav");
  const menuToggle = document.querySelector("#menuToggle");
  const cartDrawer = document.querySelector("#cartDrawer");
  const cartOverlay = document.querySelector("#cartOverlay");
  const cartItemsEl = document.querySelector("#cartItems");
  const cartTotalEl = document.querySelector("#cartTotal");
  const compareBar = document.querySelector("#compareBar");
  const compareList = document.querySelector("#compareList");
  const compareCount = document.querySelector("#compareCount");

  let activeBrand = "all";
  let toastTimer;

  const faDigits = value => String(value).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  const faPrice = n => faDigits(n.toLocaleString("fa-IR")) + " میلیون تومان";

  function notify(message, duration = 2800) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), duration);
  }

  const CART_KEY = "mobix_cart_v1";
  const COMPARE_KEY = "mobix_compare_v1";

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
  function loadCompare() {
    try { return JSON.parse(localStorage.getItem(COMPARE_KEY) || "[]"); }
    catch { return []; }
  }
  function saveCompare(list) {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
  }

  let cart = loadCart();
  let compare = loadCompare();

  function updateCartBadge() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    if (cartCount) cartCount.textContent = faDigits(totalQty);
  }

  function renderCart() {
    updateCartBadge();
    if (!cartItemsEl) return;
    if (cart.length === 0) {
      cartItemsEl.innerHTML = `<div class="cart-empty">سبد خرید خالی است.<br><small>محصولات مورد علاقه را اضافه کنید.</small></div>`;
      if (cartTotalEl) cartTotalEl.textContent = "۰";
      return;
    }
    let total = 0;
    cartItemsEl.innerHTML = cart.map(item => {
      const price = item.price || 0;
      total += price * item.qty;
      return `<div class="cart-item" data-id="${item.id}"><div class="cart-item-info"><strong>${item.name}</strong><span>${faPrice(price)}</span></div><div class="cart-item-actions"><button class="qty-btn" data-action="dec" aria-label="کاهش">−</button><span class="qty">${faDigits(item.qty)}</span><button class="qty-btn" data-action="inc" aria-label="افزایش">+</button><button class="remove-btn" data-action="remove" aria-label="حذف">×</button></div></div>`;
    }).join("");
    if (cartTotalEl) cartTotalEl.textContent = faPrice(total);
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

  function addToCart(name, price = 0, id = name) {
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    saveCart(cart);
    renderCart();
    notify(`«${name}» به سبد اضافه شد`);
  }

  function updateCompareUI() {
    if (!compareBar || !compareList) return;
    if (compare.length === 0) {
      compareBar.classList.remove("visible");
      return;
    }
    compareBar.classList.add("visible");
    if (compareCount) compareCount.textContent = faDigits(compare.length);
    compareList.innerHTML = compare.map(item =>
      `<span class="compare-chip" data-id="${item.id}">${item.name} <button data-remove-compare="${item.id}" aria-label="حذف">×</button></span>`
    ).join("");
  }

  function toggleCompare(name, id = name) {
    const idx = compare.findIndex(i => i.id === id);
    if (idx >= 0) {
      compare.splice(idx, 1);
      notify(`«${name}» از مقایسه حذف شد`);
    } else {
      if (compare.length >= 3) {
        notify("حداکثر ۳ محصول برای مقایسه می‌توانید انتخاب کنید");
        return;
      }
      compare.push({ id, name });
      notify(`«${name}» به مقایسه اضافه شد`);
    }
    saveCompare(compare);
    updateCompareUI();
  }

  function filterProducts() {
    const term = (search?.value || "").trim().toLocaleLowerCase("fa");
    let visible = 0;
    cards.forEach(card => {
      const haystack = (card.dataset.search + " " + card.textContent).toLocaleLowerCase("fa");
      const matchesTerm = !term || haystack.includes(term);
      const matchesBrand = activeBrand === "all" || card.dataset.brand === activeBrand;
      const show = matchesTerm && matchesBrand;
      card.hidden = !show;
      if (show) visible += 1;
    });
    if (resultCount) resultCount.textContent = faDigits(visible) + " انتخاب";
    if (emptyState) emptyState.hidden = visible !== 0;
  }

  function resetFilters() {
    activeBrand = "all";
    if (search) search.value = "";
    filters.forEach((item, index) => {
      const selected = index === 0;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterProducts();
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  }

  search?.addEventListener("input", filterProducts);
  filters.forEach(button => button.addEventListener("click", () => {
    activeBrand = button.dataset.filter || "all";
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterProducts();
  }));

  document.querySelector("#clearFilters")?.addEventListener("click", e => { e.preventDefault(); resetFilters(); });
  document.querySelector("#resetSearchBtn")?.addEventListener("click", resetFilters);
  document.querySelector("#focusSearch")?.addEventListener("click", () => {
    search?.focus();
    search?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  document.querySelectorAll("[data-add]").forEach(button => {
    button.addEventListener("click", e => {
      e.preventDefault();
      const name = button.dataset.add;
      const price = Number(button.dataset.price || 0);
      const id = button.dataset.id || name;
      addToCart(name, price, id);
    });
  });

  document.querySelector("#cartButton")?.addEventListener("click", openCart);
  document.querySelector("#closeCart")?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);

  cartItemsEl?.addEventListener("click", e => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const itemEl = btn.closest(".cart-item");
    const id = itemEl?.dataset.id;
    if (!id) return;
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const action = btn.dataset.action;
    if (action === "inc") item.qty += 1;
    else if (action === "dec") {
      item.qty -= 1;
      if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    } else if (action === "remove") cart = cart.filter(i => i.id !== id);
    saveCart(cart);
    renderCart();
  });

  document.querySelector("#clearCart")?.addEventListener("click", () => {
    cart = [];
    saveCart(cart);
    renderCart();
    notify("سبد خرید خالی شد");
  });

  compareList?.addEventListener("click", e => {
    const btn = e.target.closest("[data-remove-compare]");
    if (!btn) return;
    const id = btn.dataset.removeCompare;
    const item = compare.find(c => c.id === id);
    if (item) toggleCompare(item.name, id);
  });

  document.querySelector("#clearCompare")?.addEventListener("click", () => {
    compare = [];
    saveCompare(compare);
    updateCompareUI();
    notify("لیست مقایسه پاک شد");
  });

  menuToggle?.addEventListener("click", () => {
    const open = menu?.classList.toggle("open") || false;
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  menu?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));

  const year = document.querySelector("#year");
  if (year) year.textContent = faDigits(new Date().getFullYear());

  renderCart();
  updateCompareUI();
  filterProducts();
})();

(() => {
  const grid = document.querySelector("#catalogGrid");
  const search = document.querySelector("#catalogSearch");
  const brandFilters = document.querySelector("#brandFilters");
  const sortSelect = document.querySelector("#sortSelect");
  const visibleCount = document.querySelector("#visibleCount");
  const totalCount = document.querySelector("#totalCount");
  const brandCount = document.querySelector("#brandCount");
  const emptyState = document.querySelector("#emptyState");
  const pagination = document.querySelector("#pagination");
  const toast = document.querySelector("#toast");
  const cartCount = document.querySelector("#cartCount");
  const cartDrawer = document.querySelector("#cartDrawer");
  const cartOverlay = document.querySelector("#cartOverlay");
  const cartItemsEl = document.querySelector("#cartItems");
  const modal = document.querySelector("#phoneModal");
  const modalOverlay = document.querySelector("#modalOverlay");
  const modalBody = document.querySelector("#modalBody");

  const PER_PAGE = 24;
  const CART_KEY = "payam_cart_v1";
  let phones = [];
  let filtered = [];
  let activeBrand = "all";
  let page = 1;
  let toastTimer;
  let cart = loadCart();

  const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);

  function loadCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }
  function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  function notify(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
  }
  function updateBadge() {
    const total = cart.reduce((s, i) => s + i.qty, 0);
    if (cartCount) cartCount.textContent = fa(total);
  }

  function renderCart() {
    updateBadge();
    if (!cartItemsEl) return;
    if (!cart.length) {
      cartItemsEl.innerHTML = `<div class="cart-empty">سبد خالی است.<br><small>از فهرست گوشی اضافه کنید.</small></div>`;
      return;
    }
    cartItemsEl.innerHTML = cart.map((item) => `
      <div class="cart-item" data-id="${item.id}">
        <div><strong>${item.name}</strong><span>تعداد: ${fa(item.qty)}</span></div>
        <div style="display:flex;gap:4px">
          <button class="qty-btn" data-action="dec">−</button>
          <button class="qty-btn" data-action="inc">+</button>
          <button class="remove-btn" data-action="remove">×</button>
        </div>
      </div>`).join("");
  }

  function addToCart(phone) {
    const existing = cart.find((i) => i.id === phone.id);
    if (existing) existing.qty += 1;
    else cart.push({ id: phone.id, name: phone.name, qty: 1 });
    saveCart();
    renderCart();
    notify(`«${phone.name}» به سبد اضافه شد`);
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

  function brandLabel(b) {
    const map = {
      apple: "Apple", samsung: "Samsung", xiaomi: "Xiaomi",
      honor: "Honor", huawei: "Huawei", nothing: "Nothing",
      google: "Google", oneplus: "OnePlus", realme: "realme",
      oppo: "OPPO", vivo: "vivo", motorola: "Motorola",
      nokia: "Nokia", tecno: "Tecno", infinix: "Infinix"
    };
    return map[b] || b;
  }

  function buildBrandChips() {
    const brands = [...new Set(phones.map((p) => p.brand))].sort();
    brandFilters.innerHTML = `<button class="chip active" data-brand="all">همه</button>` +
      brands.map((b) => `<button class="chip" data-brand="${b}">${brandLabel(b)}</button>`).join("");
    brandFilters.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeBrand = chip.dataset.brand;
        brandFilters.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
        page = 1;
        applyFilters();
      });
    });
    if (brandCount) brandCount.textContent = fa(brands.length);
  }

  function applyFilters() {
    const term = (search?.value || "").trim().toLocaleLowerCase("fa");
    filtered = phones.filter((p) => {
      const matchBrand = activeBrand === "all" || p.brand === activeBrand;
      const hay = (p.search || `${p.name} ${p.name_fa} ${p.brand_name} ${p.chipset}`).toLowerCase();
      const matchTerm = !term || hay.includes(term) || p.name.toLowerCase().includes(term);
      return matchBrand && matchTerm;
    });

    const sort = sortSelect?.value || "name";
    filtered.sort((a, b) => {
      if (sort === "brand") return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name);
      if (sort === "ram") return parseInt(b.ram) - parseInt(a.ram);
      if (sort === "storage") return parseInt(b.storage) - parseInt(a.storage);
      return a.name.localeCompare(b.name);
    });

    renderPage();
  }

  function renderPage() {
    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    if (page > totalPages) page = totalPages;
    const start = (page - 1) * PER_PAGE;
    const slice = filtered.slice(start, start + PER_PAGE);

    if (visibleCount) visibleCount.textContent = fa(filtered.length) + " محصول";
    if (emptyState) emptyState.hidden = filtered.length !== 0;

    if (!slice.length) {
      grid.innerHTML = "";
      pagination.innerHTML = "";
      return;
    }

    grid.innerHTML = slice.map((p) => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-img">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.style.opacity='.3'">
        </div>
        <div class="product-body">
          <span class="p-brand">${p.brand_name.toUpperCase()}</span>
          <h3>${p.name}</h3>
          <p class="p-spec">${p.ram} رم · ${p.storage} · ${p.chipset}</p>
          <div class="p-footer">
            <strong class="price">${p.price_label}</strong>
            <button class="add-btn" data-add="${p.id}">افزودن +</button>
          </div>
        </div>
      </article>
    `).join("");

    let html = "";
    html += `<button class="page-btn" data-page="prev" ${page <= 1 ? "disabled" : ""}>قبلی</button>`;
    const maxButtons = 7;
    let from = Math.max(1, page - 3);
    let to = Math.min(totalPages, from + maxButtons - 1);
    from = Math.max(1, to - maxButtons + 1);
    for (let i = from; i <= to; i++) {
      html += `<button class="page-btn ${i === page ? "active" : ""}" data-page="${i}">${fa(i)}</button>`;
    }
    html += `<button class="page-btn" data-page="next" ${page >= totalPages ? "disabled" : ""}>بعدی</button>`;
    pagination.innerHTML = html;
  }

  function openModal(phone) {
    modalBody.innerHTML = `
      <div class="modal-top">
        <div class="modal-img"><img src="${phone.image}" alt="${phone.name}" onerror="this.style.opacity='.3'"></div>
        <div>
          <span class="modal-brand">${phone.brand_name} · ${phone.brand_fa}</span>
          <h2>${phone.name}</h2>
          <div class="modal-price">${phone.name_fa}</div>
          <p style="color:#9aa8bc;font-size:13px;margin:0">${phone.price_label} — برای موجودی و قیمت روز تماس بگیرید</p>
        </div>
      </div>
      <div class="specs-grid">
        <div class="spec-item"><span>پردازنده</span><b>${phone.chipset}</b></div>
        <div class="spec-item"><span>رم</span><b>${phone.ram}</b></div>
        <div class="spec-item"><span>حافظه</span><b>${phone.storage}</b></div>
        <div class="spec-item"><span>صفحه نمایش</span><b>${phone.screen}</b></div>
        <div class="spec-item"><span>دوربین</span><b>${phone.camera}</b></div>
        <div class="spec-item"><span>باتری</span><b>${phone.battery}</b></div>
        <div class="spec-item"><span>سیستم‌عامل</span><b>${phone.os}</b></div>
        <div class="spec-item"><span>برند</span><b>${phone.brand_fa}</b></div>
      </div>
      <div class="modal-actions">
        <button class="btn btn-primary" id="modalAdd">افزودن به سبد</button>
        <a class="btn btn-ghost" href="../#contact">تماس با فروشگاه</a>
      </div>
    `;
    modal.hidden = false;
    modalOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    document.querySelector("#modalAdd")?.addEventListener("click", () => {
      addToCart(phone);
    });
  }

  function closeModal() {
    modal.hidden = true;
    modalOverlay.hidden = true;
    document.body.style.overflow = "";
  }

  search?.addEventListener("input", () => { page = 1; applyFilters(); });
  sortSelect?.addEventListener("change", () => { page = 1; applyFilters(); });
  document.querySelector("#resetCatalog")?.addEventListener("click", () => {
    if (search) search.value = "";
    activeBrand = "all";
    brandFilters.querySelectorAll(".chip").forEach((c, i) => c.classList.toggle("active", i === 0));
    page = 1;
    applyFilters();
  });

  grid?.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      e.stopPropagation();
      const phone = phones.find((p) => p.id === addBtn.dataset.add);
      if (phone) addToCart(phone);
      return;
    }
    const card = e.target.closest(".product-card");
    if (card) {
      const phone = phones.find((p) => p.id === card.dataset.id);
      if (phone) openModal(phone);
    }
  });

  pagination?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn || btn.disabled) return;
    const val = btn.dataset.page;
    if (val === "prev") page = Math.max(1, page - 1);
    else if (val === "next") page += 1;
    else page = Number(val);
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.querySelector("#modalClose")?.addEventListener("click", closeModal);
  modalOverlay?.addEventListener("click", closeModal);
  document.querySelector("#cartButton")?.addEventListener("click", openCart);
  document.querySelector("#closeCart")?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
  document.querySelector("#clearCart")?.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
    notify("سبد خالی شد");
  });
  cartItemsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const row = btn.closest(".cart-item");
    const id = row?.dataset.id;
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    if (btn.dataset.action === "inc") item.qty++;
    else if (btn.dataset.action === "dec") {
      item.qty--;
      if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
    } else if (btn.dataset.action === "remove") cart = cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  });

  document.querySelector("#menuToggle")?.addEventListener("click", () => {
    document.querySelector(".main-nav")?.classList.toggle("open");
  });

  fetch("../data/phones.json")
    .then((r) => r.json())
    .then((data) => {
      phones = data.phones || [];
      if (totalCount) totalCount.textContent = fa(phones.length);
      buildBrandChips();
      applyFilters();
      renderCart();
    })
    .catch((err) => {
      console.error(err);
      if (grid) grid.innerHTML = `<p style="color:#ff8b8b">خطا در بارگذاری فهرست گوشی‌ها.</p>`;
    });
})();

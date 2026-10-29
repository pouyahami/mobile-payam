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
  let activeBrand = "all";
  let cartItems = 0;
  let toastTimer;

  const faDigits = value => String(value).replace(/\d/g, digit => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
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
  document.querySelector("#clearFilters")?.addEventListener("click", event => {
    event.preventDefault();
    activeBrand = "all";
    if (search) search.value = "";
    filters.forEach((item, index) => {
      const selected = index === 0;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    filterProducts();
    document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
  });
  document.querySelector("#focusSearch")?.addEventListener("click", () => {
    search?.focus();
    search?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelectorAll("[data-add]").forEach(button => button.addEventListener("click", () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = faDigits(cartItems);
    notify("«" + button.dataset.add + "» به سبد نمایشی اضافه شد. برای خرید واقعی، اتصال فروشگاه لازم است.");
  }));
  document.querySelector("#cartButton")?.addEventListener("click", () => {
    notify(cartItems ? "تعداد " + faDigits(cartItems) + " کالا در سبد نمایشی است؛ پرداخت هنوز فعال نیست." : "سبد نمایشی تو خالی است.");
  });
  document.querySelectorAll("[data-brand-link]").forEach(link => link.addEventListener("click", () => {
    const brand = link.dataset.brandLink;
    const button = filters.find(item => item.dataset.filter === brand);
    if (button) button.click();
  }));
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
  filterProducts();
})();
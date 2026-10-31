(() => {
  const specs = {
    "samsung galaxy s26 ultra": ["6.9 اینچ Dynamic AMOLED 2X، QHD+، 120Hz","Snapdragon 8 Elite Gen 5","200MP اصلی + تله‌فوتو + پریسکوپ + فوق‌عریض","5000mAh، شارژ سیمی تا 60W","Android 16 / One UI 8.5","IP68، قلم S Pen، 5G"],
    "samsung galaxy s25 ultra": ["6.9 اینچ Dynamic AMOLED 2X، QHD+، 120Hz","Snapdragon 8 Elite for Galaxy","200MP اصلی + 50MP پریسکوپ + 10MP تله‌فوتو + 50MP فوق‌عریض","5000mAh، 45W سیمی، 15W بی‌سیم","Android 15، قابل ارتقا","IP68، S Pen، 5G"],
    "samsung galaxy s25 fe": ["6.7 اینچ Dynamic AMOLED 2X، FHD+، 120Hz","Exynos 2400","50MP اصلی + 12MP فوق‌عریض + 8MP تله‌فوتو","4900mAh، 45W سیمی، 15W بی‌سیم","Android 16 / One UI","IP68، 5G"],
    "samsung galaxy s24 fe": ["6.7 اینچ Dynamic AMOLED 2X، FHD+، 120Hz","Exynos 2400e","50MP اصلی + 12MP فوق‌عریض + 8MP تله‌فوتو","4700mAh، 25W سیمی، 15W بی‌سیم","Android 14، پشتیبانی چندنسلی","IP68، 5G"],
    "samsung galaxy a56": ["6.7 اینچ Super AMOLED، FHD+، 120Hz","Exynos 1580","50MP اصلی + 12MP فوق‌عریض + 5MP ماکرو","5000mAh، 45W","Android 15 / One UI 7","IP67، 5G"],
    "samsung galaxy a55": ["6.6 اینچ Super AMOLED، FHD+، 120Hz","Exynos 1480","50MP اصلی + 12MP فوق‌عریض + 5MP ماکرو","5000mAh، 25W","Android 14، پشتیبانی چندنسلی","IP67، 5G"],
    "samsung galaxy a36": ["6.7 اینچ Super AMOLED، FHD+، 120Hz","Snapdragon 6 Gen 3","50MP اصلی + 8MP فوق‌عریض + 5MP ماکرو","5000mAh، 45W","Android 15 / One UI 7","IP67، 5G"],
    "samsung galaxy a26": ["6.7 اینچ Super AMOLED، FHD+، 120Hz","Exynos 1380","50MP اصلی + 8MP فوق‌عریض + 2MP ماکرو","5000mAh، 25W","Android 15 / One UI 7","IP67، 5G"],
    "samsung galaxy a17": ["6.7 اینچ Super AMOLED، FHD+، 90Hz","Exynos 1330 (نسخه 5G) / Helio G99 (نسخه 4G)","50MP اصلی + 5MP فوق‌عریض + 2MP ماکرو","5000mAh، 25W","Android 15 / One UI","IP54، نسخه 4G و 5G"],
    "samsung galaxy a16": ["6.7 اینچ Super AMOLED، FHD+، 90Hz","Helio G99 (4G) / Dimensity 6300 (5G)","50MP اصلی + 5MP فوق‌عریض + 2MP ماکرو","5000mAh، 25W","Android 14، پشتیبانی نرم‌افزاری طولانی","IP54، 4G یا 5G"],
    "samsung galaxy a07": ["6.7 اینچ PLS LCD، HD+، 90Hz","Helio G99","50MP اصلی + حسگر کمکی","5000mAh، 25W","Android 15 / One UI","مقاومت IP54، 4G"],
    "apple iphone 17 pro max": ["6.9 اینچ Super Retina XDR OLED، ProMotion 120Hz","Apple A19 Pro","سه دوربین 48MP (اصلی، فوق‌عریض، تله‌فوتو)","باتری حدود 5000mAh، شارژ سریع سیمی و MagSafe","iOS 26","IP68، Face ID، USB‑C، 5G"],
    "apple iphone 17 pro": ["6.3 اینچ Super Retina XDR OLED، ProMotion 120Hz","Apple A19 Pro","سه دوربین 48MP (اصلی، فوق‌عریض، تله‌فوتو)","باتری حدود 4000mAh، شارژ سریع و MagSafe","iOS 26","IP68، Face ID، USB‑C، 5G"],
    "apple iphone 17": ["6.3 اینچ OLED، ProMotion 120Hz","Apple A19","48MP اصلی + 48MP فوق‌عریض","باتری داخلی، شارژ USB‑C و MagSafe","iOS 26","IP68، Face ID، 5G"],
    "apple iphone 16 pro max": ["6.9 اینچ LTPO Super Retina XDR OLED، 120Hz","Apple A18 Pro","48MP اصلی + 48MP فوق‌عریض + 12MP تله‌فوتو 5x","4685mAh، شارژ سیمی و MagSafe","iOS 18، قابل ارتقا","IP68، تیتانیوم، USB‑C"],
    "apple iphone 16 pro": ["6.3 اینچ LTPO Super Retina XDR OLED، 120Hz","Apple A18 Pro","48MP اصلی + 48MP فوق‌عریض + 12MP تله‌فوتو 5x","3582mAh، شارژ سیمی و MagSafe","iOS 18، قابل ارتقا","IP68، تیتانیوم، USB‑C"],
    "apple iphone 16": ["6.1 اینچ Super Retina XDR OLED، 60Hz","Apple A18","48MP اصلی + 12MP فوق‌عریض","3561mAh، شارژ USB‑C و MagSafe","iOS 18، قابل ارتقا","IP68، Face ID، 5G"],
    "xiaomi 15 ultra": ["6.73 اینچ LTPO AMOLED، WQHD+، 120Hz","Snapdragon 8 Elite","دوربین چهارگانه Leica؛ اصلی 50MP و پریسکوپ 200MP","5410mAh، شارژ 90W سیمی و 80W بی‌سیم","Android 15 / HyperOS 2","IP68، 5G"],
    "xiaomi 15": ["6.36 اینچ LTPO AMOLED، 1.5K، 120Hz","Snapdragon 8 Elite","سه دوربین 50MP با همکاری Leica","5240mAh، شارژ 90W سیمی و 50W بی‌سیم","Android 15 / HyperOS 2","IP68، 5G"],
    "xiaomi 14t pro": ["6.67 اینچ AMOLED، 1.5K، 144Hz","Dimensity 9300+","50MP اصلی + 50MP تله‌فوتو + 12MP فوق‌عریض، Leica","5000mAh، شارژ 120W سیمی و 50W بی‌سیم","Android 14 / HyperOS","IP68، 5G"],
    "xiaomi 14t": ["6.67 اینچ AMOLED، 1.5K، 144Hz","Dimensity 8300 Ultra","50MP اصلی + 50MP تله‌فوتو + 12MP فوق‌عریض","5000mAh، شارژ 67W","Android 14 / HyperOS","IP68، 5G"],
    "xiaomi redmi note 14 pro+ 5g": ["6.67 اینچ AMOLED، 1.5K، 120Hz","Snapdragon 7s Gen 3","200MP اصلی با OIS + 8MP فوق‌عریض + 2MP ماکرو","5110mAh، شارژ 120W","Android 14 / HyperOS","IP68/IP69K، 5G"],
    "xiaomi redmi note 14 pro 5g": ["6.67 اینچ AMOLED، 1.5K، 120Hz","Dimensity 7300 Ultra","200MP اصلی با OIS + 8MP فوق‌عریض + 2MP ماکرو","5110mAh، شارژ 45W","Android 14 / HyperOS","IP68/IP69K، 5G"],
    "xiaomi redmi note 14": ["6.67 اینچ AMOLED، FHD+، 120Hz","Helio G99 Ultra (نسخه 4G) / Dimensity 7025 Ultra (5G)","108MP اصلی + 8MP فوق‌عریض + 2MP ماکرو (بسته به نسخه)","5500mAh، شارژ 33W","Android 14 / HyperOS","نسخه‌های 4G و 5G"],
    "xiaomi poco x7 pro": ["6.67 اینچ AMOLED، 1.5K، 120Hz","Dimensity 8400 Ultra","50MP اصلی با OIS + 8MP فوق‌عریض","6000mAh، شارژ 90W","Android 15 / HyperOS 2","IP68، 5G"],
    "xiaomi poco f7": ["6.83 اینچ AMOLED، 1.5K، 120Hz","Snapdragon 8s Gen 4","50MP اصلی با OIS + 8MP فوق‌عریض","6500mAh، شارژ 90W","Android 15 / HyperOS 2","IP68، 5G"],
    "xiaomi poco f6": ["6.67 اینچ AMOLED، 1.5K، 120Hz","Snapdragon 8s Gen 3","50MP اصلی با OIS + 8MP فوق‌عریض","5000mAh، شارژ 90W","Android 14 / HyperOS","IP64، 5G"],
    "xiaomi poco c85": ["6.9 اینچ IPS LCD، HD+، 120Hz","Helio G81 Ultra","50MP اصلی","6000mAh، شارژ 33W","Android 15 / HyperOS","4G، حسگر اثرانگشت کناری"],
    "xiaomi redmi 15": ["6.9 اینچ IPS LCD، FHD+، 144Hz","Snapdragon 6s Gen 3 (بسته به نسخه)","50MP اصلی","7000mAh، شارژ سریع 33W","Android 15 / HyperOS 2","نسخه‌های 4G/5G بسته به بازار"],
    "google pixel 9 pro xl": ["6.8 اینچ LTPO OLED، QHD+، 120Hz","Google Tensor G4","50MP اصلی + 48MP فوق‌عریض + 48MP تله‌فوتو 5x","5060mAh، شارژ سیمی و بی‌سیم","Android 14، پشتیبانی 7 ساله","IP68، 5G"],
    "google pixel 9": ["6.3 اینچ OLED، FHD+، 120Hz","Google Tensor G4","50MP اصلی + 48MP فوق‌عریض","4700mAh، شارژ سیمی و بی‌سیم","Android 14، پشتیبانی 7 ساله","IP68، 5G"],
    "honor x9c": ["6.78 اینچ AMOLED خمیده، 1.5K، 120Hz","Snapdragon 6 Gen 1","108MP اصلی با OIS + 5MP فوق‌عریض","6600mAh، شارژ 66W","Android 14 / MagicOS 8","مقاومت در برابر ضربه و آب؛ 5G"],
    "honor 200": ["6.7 اینچ OLED، 1.5K، 120Hz","Snapdragon 7 Gen 3","50MP اصلی + 50MP تله‌فوتو + 12MP فوق‌عریض","5200mAh، شارژ 100W","Android 14 / MagicOS 8.0","5G، حسگر اثرانگشت زیر نمایشگر"],
    "motorola edge 50 pro": ["6.7 اینچ pOLED، 1.5K، 144Hz","Snapdragon 7 Gen 3","50MP اصلی + 10MP تله‌فوتو 3x + 13MP فوق‌عریض","4500mAh، شارژ 125W سیمی و 50W بی‌سیم","Android 14","IP68، 5G"],
    "nothing phone (2a)": ["6.7 اینچ AMOLED، FHD+، 120Hz","Dimensity 7200 Pro","50MP اصلی + 50MP فوق‌عریض","5000mAh، شارژ 45W","Android 14 / Nothing OS","IP54، Glyph Interface، 5G"],
    "oneplus 13": ["6.82 اینچ LTPO AMOLED، QHD+، 120Hz","Snapdragon 8 Elite","سه دوربین 50MP؛ اصلی، تله‌فوتو پریسکوپی و فوق‌عریض","6000mAh، شارژ 100W سیمی و 50W بی‌سیم","Android 15 / OxygenOS 15","IP68/IP69، 5G"]
  };

  const aliases = [
    ["galaxy s26 ultra","samsung galaxy s26 ultra"],["galaxy s25 ultra","samsung galaxy s25 ultra"],["galaxy s25 fe","samsung galaxy s25 fe"],["galaxy s24 fe","samsung galaxy s24 fe"],
    ["galaxy a56","samsung galaxy a56"],["galaxy a55","samsung galaxy a55"],["galaxy a36","samsung galaxy a36"],["galaxy a26","samsung galaxy a26"],["galaxy a17","samsung galaxy a17"],["galaxy a16","samsung galaxy a16"],["galaxy a07","samsung galaxy a07"],
    ["iphone 17 pro max","apple iphone 17 pro max"],["iphone 17 pro","apple iphone 17 pro"],["iphone 17","apple iphone 17"],["iphone 16 pro max","apple iphone 16 pro max"],["iphone 16 pro","apple iphone 16 pro"],["iphone 16","apple iphone 16"],
    ["xiaomi 15 ultra","xiaomi 15 ultra"],["xiaomi 15","xiaomi 15"],["14t pro","xiaomi 14t pro"],["14t","xiaomi 14t"],["redmi note 14 pro+ 5g","xiaomi redmi note 14 pro+ 5g"],["redmi note 14 pro 5g","xiaomi redmi note 14 pro 5g"],["redmi note 14","xiaomi redmi note 14"],
    ["poco x7 pro","xiaomi poco x7 pro"],["poco f7","xiaomi poco f7"],["poco f6","xiaomi poco f6"],["poco c85","xiaomi poco c85"],["redmi 15","xiaomi redmi 15"],
    ["pixel 9 pro xl","google pixel 9 pro xl"],["pixel 9","google pixel 9"],["honor x9c","honor x9c"],["honor 200","honor 200"],["edge 50 pro","motorola edge 50 pro"],["phone (2a)","nothing phone (2a)"],["oneplus 13","oneplus 13"]
  ];

  const normalize = s => s.toLowerCase().replace(/[^a-z0-9+() ]/g," ").replace(/\s+/g," ").trim();
  const matchSpec = name => {
    const n = normalize(name);
    for (const [needle,key] of aliases) if (n.includes(normalize(needle))) return specs[key] ? {key, rows:specs[key]} : null;
    return null;
  };
  const cards = [...document.querySelectorAll(".directory-card")];
  cards.forEach(card => {
    const title = card.querySelector("h2")?.textContent?.trim() || "";
    const action = document.createElement("button");
    action.type = "button";
    action.className = "spec-open";
    action.textContent = "مشخصات فنی";
    action.addEventListener("click", () => openSpecs(title, card));
    const info = card.querySelector(".directory-info");
    if (info) info.append(action);
  });

  const overlay = document.createElement("div");
  overlay.className = "spec-modal-backdrop";
  overlay.hidden = true;
  overlay.innerHTML = '<section class="spec-modal" role="dialog" aria-modal="true" aria-labelledby="specModalTitle"><button class="spec-close" type="button" aria-label="بستن">×</button><div class="eyebrow">MOBIX DEVICE PROFILE</div><h2 id="specModalTitle"></h2><p class="spec-intro"></p><div class="spec-grid"></div><p class="spec-source"></p></section>';
  document.body.append(overlay);
  const close = () => { overlay.hidden = true; document.body.classList.remove("spec-modal-open"); };
  overlay.querySelector(".spec-close").addEventListener("click", close);
  overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });

  function openSpecs(name, card) {
    const found = matchSpec(name);
    const brand = card.dataset.brand || "";
    const sourceUrl = "https://www.mobile.ir/phones/search.aspx?term=" + encodeURIComponent(name);
    overlay.querySelector("#specModalTitle").textContent = name;
    overlay.querySelector(".spec-intro").textContent = found
      ? "خلاصه مشخصات فنی نسخه‌های شناخته‌شده این مدل. مشخصات ممکن است با نسخه منطقه‌ای، حافظه و شبکه تفاوت داشته باشد."
      : "برای این مدل هنوز برگه مشخصات تأییدشده در پایگاه موبیکس تکمیل نشده است. برای جلوگیری از درج اطلاعات حدسی، مشخصات را از مرجع تخصصی بررسی کن.";
    const labels = ["نمایشگر","پردازنده","دوربین پشتی","باتری و شارژ","سیستم‌عامل","ارتباطات و مقاومت"];
    overlay.querySelector(".spec-grid").innerHTML = found
      ? found.rows.map((value,i) => '<div class="spec-item"><span>'+labels[i]+'</span><strong>'+value+'</strong></div>').join("")
      : '<div class="spec-item spec-empty"><span>وضعیت اطلاعات</span><strong>در انتظار تکمیل و راستی‌آزمایی</strong></div>';
    overlay.querySelector(".spec-source").innerHTML = 'منبع بررسی تکمیلی: <a href="'+sourceUrl+'" target="_blank" rel="noopener noreferrer">جست‌وجوی همین مدل در مرجع موبایل ایران ↗</a>';
    overlay.hidden = false;
    document.body.classList.add("spec-modal-open");
  }
})();

const galleryImages = [
  "assets/gallery/IMG_1028.jpg",
  "assets/gallery/IMG_1696.jpg",
  "assets/gallery/IMG_3408.jpg",
  "assets/gallery/IMG_3414.jpg",
  "assets/gallery/IMG_4589.jpg",
  "assets/gallery/IMG_4590.jpg",
  "assets/gallery/IMG_4591.jpg",
  "assets/gallery/IMG_4981.jpg",
  "assets/gallery/IMG_4984.jpg",
  "assets/gallery/IMG_4986.jpg",
  "assets/gallery/IMG_4988.jpg",
  "assets/gallery/IMG_5020.jpg",
  "assets/gallery/IMG_5072.jpg",
  "assets/gallery/IMG_5073.jpg",
  "assets/gallery/IMG_5104.jpg",
  "assets/gallery/IMG_5677.jpg",
  "assets/gallery/IMG_5691.jpg",
  "assets/gallery/IMG_5696.jpg",
  "assets/gallery/IMG_5704.jpg",
  "assets/gallery/IMG_5706.jpg",
  "assets/gallery/IMG_5707.jpg",
  "assets/gallery/IMG_5750.jpg",
  "assets/gallery/IMG_5755.jpg",
  "assets/gallery/IMG_5823.jpg",
  "assets/gallery/IMG_5842.jpg",
  "assets/gallery/IMG_5938.jpg",
  "assets/gallery/IMG_6172.jpg",
  "assets/gallery/IMG_6193.jpg",
  "assets/gallery/IMG_6194.jpg",
  "assets/gallery/photo_10_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_11_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_12_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_13_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_14_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_15_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_1_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_2_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_3_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_4_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_5_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_6_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_7_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_8_2026-03-12_19-39-39.jpg",
  "assets/gallery/photo_9_2026-03-12_19-39-39.jpg",
  "assets/gallery/temp_image_5E99FA7A-9F3D-4814-9D99-11FF42C2E577.jpg",
  "assets/gallery/temp_image_8E536AAF-9193-4F28-9ADE-9AE8A9F4CF40.jpg",
];

const correctFlag = "ctf{y4_b4g1ra_Sh3vch3nk0}";

const gallery = document.querySelector("#gallery");
const galleryCount = document.querySelector("#gallery-count");
const form = document.querySelector("#flag-form");
const flagInput = document.querySelector("#flag-input");
const flagStatus = document.querySelector("#flag-status");
const giftCard = document.querySelector("#gift-card");
const giftPanel = document.querySelector("#gift-panel");
const bootScreen = document.querySelector(".boot-screen");
const bootProgress = document.querySelector(".boot-progress");
const bootPercentage = document.querySelector("#boot-percentage");

function buildGallery() {
  if (!gallery) {
    return;
  }

  const fragment = document.createDocumentFragment();

  galleryImages.forEach((src, index) => {
    const card = document.createElement("figure");
    card.className = "gallery-card reveal";

    const image = document.createElement("img");
    image.src = src;
    image.alt = `Фото из архива ${index + 1}`;
    image.loading = "lazy";
    image.decoding = "async";

    const footer = document.createElement("footer");

    const imageIndex = document.createElement("span");
    imageIndex.className = "image-index";
    imageIndex.textContent = `snapshot ${String(index + 1).padStart(2, "0")}`;

    const label = document.createElement("span");
    label.className = "image-label";
    label.textContent = index % 3 === 0 ? "field note" : index % 3 === 1 ? "memory pack" : "live frame";

    footer.append(imageIndex, label);
    card.append(image, footer);
    fragment.append(card);
  });

  gallery.append(fragment);

  if (galleryCount) {
    galleryCount.textContent = String(galleryImages.length);
  }
}

function setupReveal() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -5% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupFlagForm() {
  if (!form || !flagInput || !flagStatus || !giftCard || !giftPanel) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = flagInput.value.trim();
    flagStatus.classList.remove("is-error", "is-success");

    if (value === correctFlag) {
      flagStatus.textContent = "Жди 17 марта, лох, и пиши в лс.";
      flagStatus.classList.add("is-success");
      giftCard.hidden = false;
      giftPanel.classList.add("is-unlocked");
      flagInput.setAttribute("aria-invalid", "false");
      giftCard.scrollIntoView({
        block: "nearest",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      });
      return;
    }

    flagStatus.textContent = "Шум не сошёлся. Нужен точный флаг.";
    flagStatus.classList.add("is-error");
    giftCard.hidden = true;
    giftPanel.classList.remove("is-unlocked");
    flagInput.setAttribute("aria-invalid", "true");
  });
}

function runBootSequence() {
  if (!bootScreen || !bootProgress || !bootPercentage) {
    return;
  }

  let progress = 0;
  const steps = [9, 17, 24, 31, 42, 56, 63, 71, 84, 92, 100];

  const tick = () => {
    progress = steps.shift() ?? 100;
    bootProgress.style.width = `${progress}%`;
    bootPercentage.textContent = `${String(progress).padStart(3, "0")}%`;

    if (progress < 100) {
      window.setTimeout(tick, 110);
      return;
    }

    window.setTimeout(() => {
      bootScreen.classList.add("is-hidden");
    }, 320);
  };

  window.setTimeout(tick, 180);
}

buildGallery();
setupReveal();
setupFlagForm();

if (document.readyState === "complete") {
  runBootSequence();
} else {
  window.addEventListener("load", runBootSequence, { once: true });
}

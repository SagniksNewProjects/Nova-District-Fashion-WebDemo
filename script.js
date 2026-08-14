const loader = document.getElementById("loader");
const progress = document.getElementById("progress");
const menuButton = document.getElementById("menuButton");
const menuClose = document.getElementById("menuClose");
const mobileMenu = document.getElementById("mobileMenu");
const modal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalNumber = document.getElementById("modalNumber");
const modalDescription = document.getElementById("modalDescription");
const modalAction = document.getElementById("modalAction");

const products = {
  hoodie: {
    number: "01 / NEW ARRIVALS",
    title: "STRUCTURED OVERSIZED HOODIE",
    description: "A clean oversized silhouette designed around the NOVA DISTRICT philosophy of strong form, comfort and everyday movement.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=90"
  },
  cargo: {
    number: "02 / NEW ARRIVALS",
    title: "UTILITY CARGO TROUSERS",
    description: "Functional streetwear built with a relaxed urban cut, designed for movement while maintaining a precise silhouette.",
    image: "https://images.unsplash.com/photo-1506629905607-d9f6f0f8f0f4?auto=format&fit=crop&w=1200&q=90"
  },
  outerwear: {
    number: "03 / NEW ARRIVALS",
    title: "STATEMENT OUTERWEAR",
    description: "A structured outer layer designed to become the defining element of an everyday city uniform.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90"
  },
  midnight: {
    number: "01 / COLLECTION",
    title: "MIDNIGHT CORE",
    description: "Dark essentials built around clean silhouettes and a confident monochrome attitude."
  },
  urban: {
    number: "02 / COLLECTION",
    title: "URBAN UTILITY",
    description: "Functional pieces inspired by movement, concrete spaces and modern city life."
  },
  concrete: {
    number: "03 / COLLECTION",
    title: "CONCRETE SERIES",
    description: "A restrained collection exploring structure, texture and neutral urban tones."
  },
  mono: {
    number: "04 / COLLECTION",
    title: "MONO ESSENTIAL",
    description: "Timeless everyday pieces reduced to their clearest and strongest forms."
  },
  silver: {
    number: "05 / COLLECTION",
    title: "SILVER EDGE",
    description: "A sharper interpretation of the NOVA DISTRICT identity with technical, contemporary details."
  },
  neo: {
    number: "06 / COLLECTION",
    title: "NEO MINIMAL",
    description: "Minimal design with a modern attitude — simple, precise and deliberately understated."
  },
  formal: {
    number: "07 / COLLECTION",
    title: "STREET FORMAL",
    description: "Tailored proportions meet urban functionality in a collection designed to move between worlds."
  },
  shadow: {
    number: "08 / COLLECTION",
    title: "SHADOW LINE",
    description: "A darker capsule built around contrast, silhouette and quiet confidence."
  }
};

window.addEventListener("load", () => {
  setTimeout(() => loader.classList.add("hidden"), 450);
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
});

function openMenu() {
  mobileMenu.classList.add("open");
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  mobileMenu.classList.remove("open");
  document.body.classList.remove("no-scroll");
}

menuButton.addEventListener("click", openMenu);
menuClose.addEventListener("click", closeMenu);

mobileMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMenu);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

const filterButtons = document.querySelectorAll(".filter");
const collectionCards = document.querySelectorAll(".collection-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    collectionCards.forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !show);
    });
  });
});

function openProduct(key) {
  const product = products[key];
  if (!product) return;

  modalNumber.textContent = product.number;
  modalTitle.textContent = product.title;
  modalDescription.textContent = product.description;

  const source = document.querySelector(`[data-product="${key}"] img`);
  const sourceUrl = product.image || (source ? source.src : "");

  modalImage.src = sourceUrl;
  modalImage.alt = product.title;

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeProduct() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

document.querySelectorAll("[data-product]").forEach(element => {
  element.addEventListener("click", event => {
    if (event.target.closest(".filter")) return;
    openProduct(element.dataset.product);
  });
});

modalClose.addEventListener("click", closeProduct);

modal.addEventListener("click", event => {
  if (event.target === modal) closeProduct();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeProduct();
    closeMenu();
  }
});

modalAction.addEventListener("click", () => {
  closeProduct();
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => document.getElementById("name").focus(), 700);
});

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Please complete all fields before sending.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    return;
  }

  formMessage.textContent = "Thank you. Your enquiry has been prepared successfully.";
  form.reset();
});

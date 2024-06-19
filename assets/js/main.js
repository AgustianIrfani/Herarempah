/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variables exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div tag with the nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

//==================== Via WA ================================//
document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let nama = document.getElementById("nama").value;
  let jenis = document.getElementById("jenis").value;
  // let selectElement = document.getElementById("berat");
  // let berat =
  //   selectElement.options[selectElement.selectedIndex].getAttribute(
  //     "data-value"
  //   );
  let quantity = document.getElementById("quantity").value;
  let alamat = document.getElementById("alamat").value;
  let tanggal = document.getElementById("tanggal").value;
  let total = document.getElementById("total").value;

  // Format pesan untuk WhatsApp
  let text =
    "Nama: " +
    nama +
    "%0AJenis: " +
    jenis +
    // "%0ABerat PerBungkus: " +
    // berat +
    "%0AJumlah: " +
    quantity +
    "%0AAlamat: " +
    alamat +
    "%0ATanggal Pengiriman: " +
    tanggal +
    "%0ATotal Harga: " +
    total;
  let url = "https://api.whatsapp.com/send?phone=6282367526080&text=" + text;

  window.open(url);
});

//==================== About ================================//
let readMoreButton = document.getElementById("read-more-button");
let aboutParagraph = document.getElementById("about-paragraph");

readMoreButton.addEventListener("click", function (event) {
  event.preventDefault(); // Mematikan fungsi default dari link

  if (!document.getElementById("additional-paragraph")) {
    let additionalParagraph = document.createElement("p");
    additionalParagraph.textContent =
      "Hera Rempah merupakan UMKM asal medan, yang begerak di bidang penjualan produk rempah kemasan yang sudah memiliki izin edar resmi, saat ini hera rempah memasarkan produknya ke beberapa swalayan dikota medan ";
    additionalParagraph.id = "additional-paragraph";
    aboutParagraph.parentNode.insertBefore(additionalParagraph, readMoreButton);

    readMoreButton.textContent = "Tutup";
  } else {
    let additionalParagraph = document.getElementById("additional-paragraph");
    additionalParagraph.parentNode.removeChild(additionalParagraph);

    readMoreButton.textContent = "Selengkapnya";
  }
});

let images = [
  "assets/img/about2.jpeg",
  "assets/img/about1.jpeg",
  "assets/img/makasi.png",
];
let currentImageIndex = 0;
let sliderImage = document.getElementById("slider-image");
let intervalId = setInterval(changeImage, 3000); // Menyimpan ID interval di variabel global

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  sliderImage.src = images[currentImageIndex];
}
/*==================== Form MENU ============================= */
function showForm(event, jenis, hargaPerKg) {
  event.preventDefault(); // Mencegah link dari pengarah ke halaman baru
  var form = document.getElementById("orderForm");
  form.style.display = "block";
  document.getElementById("jenis").value = jenis;
  document.getElementById("hargaPerKg").value = hargaPerKg;
  hitungTotal();
}

function hitungTotal() {
  // var berat = parseInt(document.getElementById("berat").value);
  var hargaPerKg = parseInt(document.getElementById("hargaPerKg").value);
  var quantity = parseInt(document.getElementById("quantity").value);
  var total = hargaPerKg * quantity;

  // Mengubah nilai total ke format mata uang Rupiah
  var totalRupiah = formatRupiah(total.toString(), "Rp. ");

  document.getElementById("total").value = totalRupiah;
}

function formatRupiah(angka, prefix) {
  var number_string = angka.toString(),
    split = number_string.split(","),
    sisa = split[0].length % 3,
    rupiah = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return prefix === undefined
    ? rupiah + ""
    : rupiah
    ? prefix + rupiah + ""
    : "";
}

document.addEventListener("click", function (event) {
  var form = document.getElementById("orderForm");
  if (!form.contains(event.target) && event.target.tagName !== "BUTTON") {
    form.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
  var form = document.getElementById("orderForm");
  if (!form.contains(event.target) && event.target.tagName !== "BUTTON") {
    form.style.display = "none";
  }
});
/* ================ Maps ===================== */
const toggleMapLink = document.getElementById("toggle-map");
const mapContainer = document.getElementById("map-container");

let mapVisible = false; // Menyimpan status peta (terlihat atau tidak)

// Fungsi untuk menampilkan atau menyembunyikan peta
function showMap(event) {
  event.preventDefault();
  if (!mapVisible) {
    mapContainer.style.display = "block";
    toggleMapLink.textContent = "Sembunyikan Maps"; // Ganti teks link
    // Tambahkan kode untuk menampilkan maps menggunakan iframe embed dari Google Maps
    mapContainer.innerHTML =
      '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.490092503861!2d106.82412481476822!3d-6.211546395502046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7c1592b76e39c3%3A0x56c47746a3ad4b98!2sMonumen%20Nasional%20(Monas)!5e0!3m2!1sen!2sid!4v1649263303583!5m2!1sen!2sid" width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy"></iframe>';
    mapVisible = true;
  } else {
    mapContainer.style.display = "none";
    toggleMapLink.textContent = "Tampilkan Maps"; // Ganti teks link kembali
    mapContainer.innerHTML = ""; // Hapus konten maps
    mapVisible = false;
  }
}

// Tambahkan event listener untuk menampilkan atau menyembunyikan peta saat link diklik
toggleMapLink.addEventListener("click", showMap);
/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
  const nav = document.getElementById("header");
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 200) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL TOP ====================*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: "top",
  distance: "30px",
  duration: 1000,
  reset: true,
});

sr.reveal(
  `.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`,
  {
    interval: 200,
  }
);

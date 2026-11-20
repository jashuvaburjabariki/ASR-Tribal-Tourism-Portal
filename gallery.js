/*=========================================
    LOADER
=========================================*/

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
    }, 800);
});

/*=========================================
    MOBILE MENU
=========================================*/

const menuBtn = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
    menuBtn.onclick = () => {
        navLinks.classList.toggle("show");
    };
}

/*=========================================
    STICKY NAVBAR
=========================================*/

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.classList.add("sticky");

    } else {

        navbar.classList.remove("sticky");

    }

});

/*=========================================
    DARK MODE
=========================================*/

const darkBtn = document.querySelector(".dark-mode");

if (darkBtn) {

    darkBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        darkBtn.innerHTML = document.body.classList.contains("dark")
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

    });

}

/*=========================================
    SEARCH IMAGES
=========================================*/

const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        let value = this.value.toLowerCase();

        document.querySelectorAll(".gallery-item").forEach(item => {

            let text = item.innerText.toLowerCase();

            item.style.display =
                text.includes(value) ? "block" : "none";

        });

    });

}

/*=========================================
    FILTER BUTTONS
=========================================*/

const filterBtns = document.querySelectorAll(".gallery-filter button");

filterBtns.forEach(button => {

    button.addEventListener("click", function () {

        filterBtns.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const category = this.innerText.toLowerCase();

        document.querySelectorAll(".gallery-item").forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

/*=========================================
    LIGHTBOX
=========================================*/

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox-image");

const closeBtn = document.querySelector(".close");

const prevBtn = document.querySelector(".prev");

const nextBtn = document.querySelector(".next");

const counter = document.querySelector(".counter");

let current = 0;

function showImage(index) {

    current = index;

    lightbox.style.display = "flex";

    lightboxImage.src = galleryImages[current].src;

    counter.innerHTML =
        `${current + 1} / ${galleryImages.length}`;

}

galleryImages.forEach((img, index) => {

    img.addEventListener("click", () => {

        showImage(index);

    });

});

if (closeBtn) {

    closeBtn.onclick = () => {

        lightbox.style.display = "none";

    };

}

if (nextBtn) {

    nextBtn.onclick = () => {

        current++;

        if (current >= galleryImages.length)
            current = 0;

        showImage(current);

    };

}

if (prevBtn) {

    prevBtn.onclick = () => {

        current--;

        if (current < 0)
            current = galleryImages.length - 1;

        showImage(current);

    };

}

/*=========================================
    FAVORITE BUTTON
=========================================*/

document.querySelectorAll(".fa-heart").forEach(icon => {

    icon.addEventListener("click", function () {

        this.classList.toggle("favorite");

    });

});

/*=========================================
    DOWNLOAD IMAGE
=========================================*/

document.querySelectorAll(".fa-download").forEach((icon, index) => {

    icon.addEventListener("click", () => {

        const a = document.createElement("a");

        a.href = galleryImages[index].src;

        a.download = "tourism-image.jpg";

        a.click();

    });

});

/*=========================================
    FULLSCREEN IMAGE
=========================================*/

document.querySelectorAll(".fa-expand").forEach((icon, index) => {

    icon.addEventListener("click", () => {

        showImage(index);

        if (lightbox.requestFullscreen) {

            lightbox.requestFullscreen();

        }

    });

});

/*=========================================
    LOAD MORE
=========================================*/

const loadBtn = document.getElementById("loadMore");

const items = document.querySelectorAll(".gallery-item");

let visible = 12;

items.forEach((item, index) => {

    if (index >= visible)

        item.style.display = "none";

});

if (loadBtn) {

    loadBtn.onclick = () => {

        visible += 12;

        items.forEach((item, index) => {

            if (index < visible)

                item.style.display = "block";

        });

        if (visible >= items.length) {

            loadBtn.style.display = "none";

        }

    };

}

/*=========================================
    SCROLL TO TOP
=========================================*/

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        topBtn.style.display = "flex";

    } else {

        topBtn.style.display = "none";

    }

});

if (topBtn) {

    topBtn.onclick = () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };

}

/*=========================================
    ESC KEY CLOSE LIGHTBOX
=========================================*/

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        if (lightbox)

            lightbox.style.display = "none";

    }

});

/*=========================================
    LEFT & RIGHT ARROWS
=========================================*/

document.addEventListener("keydown", e => {

    if (lightbox.style.display === "flex") {

        if (e.key === "ArrowRight") {

            nextBtn.click();

        }

        if (e.key === "ArrowLeft") {

            prevBtn.click();

        }

    }

});
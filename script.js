const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    let images = [...imageList.children]; // Lista de imágenes originales
    const slideWidth = images[0].clientWidth;
    let isTransitioning = false; // Bloquea acciones mientras se ajusta el scroll

    // Función para clonar siempre las 5 tarjetas al final
    const checkAndCloneImages = () => {
        const scrollThreshold = imageList.scrollWidth - imageList.clientWidth - slideWidth * 2;

        if (imageList.scrollLeft >= scrollThreshold) {
            // Clonamos las 5 imágenes al final
            const clones = images.slice(0, 5).map(img => img.cloneNode(true));
            clones.forEach(clone => {
                imageList.appendChild(clone);
            });

            // Volvemos a capturar la lista de imágenes y botones de flecha
            images = [...imageList.children];

            // Asignamos eventos a los botones de las nuevas tarjetas
            updateSlideButtons();
        }
    };

    // Función para mover el slider
    const moveSlide = () => {
        if (isTransitioning) return;

        isTransitioning = true;
        const scrollAmount = slideWidth;

        imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });

        setTimeout(() => {
            checkAndCloneImages(); // Clonamos más imágenes si es necesario
            isTransitioning = false;
        }, 300);
    };

    // Función para asignar eventos a las flechas de TODAS las tarjetas
    const updateSlideButtons = () => {
        const allSlideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
        allSlideButtons.forEach(button => {
            button.removeEventListener("click", moveSlide); // Evitar duplicados
            button.addEventListener("click", moveSlide);
        });
    };

    // Iniciar eventos de los botones al cargar
    updateSlideButtons();

    // Ajustar el ancho del slider cuando cambia el tamaño de la pantalla
    window.addEventListener("resize", () => {
        const newSlideWidth = images[0].clientWidth;
        imageList.scrollLeft = newSlideWidth;
    });
};

window.addEventListener("load", initSlider);


// Inicialización de Google Translate
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'es' }, 'google_translate_element');
}

// Función para alternar el idioma
function toggleLanguageDesktop() {
    const select = document.querySelector("select.goog-te-combo");
    const button = document.getElementById("language-toggle"); // Botón principal
    const submenuItem = document.querySelector("#sexto a"); // Opción del submenú

    if (select) {
        if (select.value === 'en') {
            select.value = 'es';
            button.innerText = 'ES';
            submenuItem.innerText = 'EN';
        } else {
            select.value = 'en';
            button.innerText = 'EN';
            submenuItem.innerText = 'ES';
        }
        select.dispatchEvent(new Event("change"));

        setTimeout(() => {
            select.dispatchEvent(new Event("change"));
        }, 100);
    }
}

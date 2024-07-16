const shareMenu = {
    elements: {
        menu: document.querySelector(".card-share-content"),
        toggleButton: document.querySelector(".card-share-btn"),
        vShape: document.querySelector(".card-share-content-shape"),
    },
        isShowing: false,

    showMenu() {
        this.elements.menu.style.display = "flex";
        this.elements.menu.style.opacity = 0;
        this.elements.toggleButton.classList.add("menu-shown");

        const menuWidth = this.elements.menu.offsetWidth;
        const windowWidth = window.innerWidth;
        const rightEdge = menuWidth + this.elements.menu.offsetLeft;
        if (rightEdge > windowWidth) {
        const overflow = rightEdge - windowWidth;
            this.elements.menu.style.marginRight = `-${overflow}px`;
            this.elements.vShape.style.marginLeft = `${overflow}px`;
        } else {
            this.elements.menu.style.marginRight = "";
            this.elements.vShape.style.marginLeft = "";
        }

        requestAnimationFrame(() => {
            this.elements.menu.style.opacity = 1;
        });
    },

    hideMenu() {
        this.elements.menu.style.opacity = 0;
        this.elements.toggleButton.classList.remove("menu-shown");

    setTimeout(() => {
        this.elements.menu.style.display = "none";
        this.elements.menu.style.marginRight = "";
        this.elements.vShape.style.marginLeft = "";
        }, 200);
    },

    toggleMenu() {
        this.isShowing = !this.isShowing;
        if (this.isShowing) {
            this.showMenu();
        } else {
            this.hideMenu();
        }
    },

    init() {
        this.elements.toggleButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.toggleMenu();
    });

        document.addEventListener("click", (e) => {
            if (this.isShowing && !e.target.closest(".card-share-content")) {
            this.hideMenu();
        }
    });

        window.addEventListener("resize", this.toggleMenu);
    },
};

shareMenu.init();
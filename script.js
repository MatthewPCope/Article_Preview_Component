const shareMenu = {
    vShape: document.querySelector(".card-share-content-shape"),
    menuElement: document.querySelector(".card-share-content"),
    toggleButton: document.querySelector(".card-share-btn"),
    isShowing: false,

    showMenu() {
        this.menuElement.style.display = "flex";
        this.menuElement.style.opacity = "0";
        this.toggleButton.classList.add("menu-shown");

        const rect = this.menuElement.getBoundingClientRect();
        let offsetX = window.outerWidth - (rect.width + rect.left);
        if (offsetX < 0) {
            const x = Math.abs(offsetX) + 24;
            this.menuElement.style.marginRight = `${x}px`;
            this.vShape.style.marginLeft = `${x}px`;
        }

        requestAnimationFrame(() => {
            this.menuElement.style.opacity = "1";
        });
    },

    hideMenu() {
        this.menuElement.style.opacity = "0";
        this.toggleButton.classList.remove("menu-shown");

        setTimeout(() => {
            this.menuElement.style.display = "none";
            this.menuElement.style.marginRight = "";
            this.vShape.style.marginLeft = "";
        }, 200);
    },

    toggleMenu() {
        if (this.isShowing) {
            this.hideMenu();
        } else {
            this.showMenu();
        }
        this.isShowing = !this.isShowing;
    },

    init() {
        this.toggleButton.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        this.menuElement.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        document.addEventListener("click", () => {
            if (this.isShowing) {
                this.hideMenu();
                this.isShowing = false;
            }
        });

        window.addEventListener("resize", () => {
            if (this.isShowing) {
                this.hideMenu();
                this.isShowing = false;
            }
        });
    },
};

shareMenu.init();
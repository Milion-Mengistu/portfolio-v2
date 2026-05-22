document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-links a");
    const yearTarget = document.querySelector("[data-year]");
    const sections = document.querySelectorAll("main section[id]");

    const setHeaderState = () => {
        if (!header) {
            return;
        }

        header.classList.toggle("scrolled", window.scrollY > 16);
    };

    const closeMenu = () => {
        if (!navToggle || !navMenu) {
            return;
        }

        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    };

    if (yearTarget) {
        yearTarget.textContent = new Date().getFullYear();
    }

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("is-open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 860) {
                closeMenu();
            }
        });
    }

    if ("IntersectionObserver" in window && sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const currentId = entry.target.getAttribute("id");

                navLinks.forEach((link) => {
                    const isMatch = link.getAttribute("href") === `#${currentId}`;
                    link.classList.toggle("is-active", isMatch);
                });
            });
        }, {
            rootMargin: "-35% 0px -45% 0px",
            threshold: 0.1
        });

        sections.forEach((section) => observer.observe(section));
    }
});

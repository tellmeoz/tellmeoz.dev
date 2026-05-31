document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    
    // Function to get current theme state
    function getCurrentTheme() {
        // Check if manual override exists
        const localTheme = localStorage.getItem("theme");
        if (localTheme) return localTheme;
        
        // Otherwise, resolve based on system media query
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return systemPrefersDark ? "dark" : "light";
    }

    // Apply color-scheme meta and data-theme attribute
    function applyTheme(theme) {
        const root = document.documentElement;
        
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
        
        // Dynamic Meta color-scheme adaptation
        const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.content = theme;
        }
    }

    // Initial setup
    const initialTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(initialTheme);

    // Toggle button click listener
    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || getCurrentTheme();
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    // Listen for OS system theme changes to adapt if no manual preference is pinned
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        // Only apply if the user hasn't explicitly set a preference in localStorage
        if (!localStorage.getItem("theme")) {
            const systemTheme = e.matches ? "dark" : "light";
            applyTheme(systemTheme);
        }
    });

    // Smooth hover visual logic for glow orbs tracking cursor (Subtle micro-animation)
    const glowBg = document.querySelector(".glow-bg");
    const orb1 = document.querySelector(".orb-1");
    const orb2 = document.querySelector(".orb-2");

    if (glowBg && orb1 && orb2) {
        window.addEventListener("mousemove", (e) => {
            // Calculate cursor coordinates relative to viewport
            const x = e.clientX;
            const y = e.clientY;
            
            // Move orbs slightly toward cursor for interactive depth (using translate)
            const moveX1 = (x - window.innerWidth / 2) * 0.05;
            const moveY1 = (y - window.innerHeight / 2) * 0.05;
            const moveX2 = (x - window.innerWidth / 2) * -0.03;
            const moveY2 = (y - window.innerHeight / 2) * -0.03;
            
            orb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
            orb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        });
    }
});

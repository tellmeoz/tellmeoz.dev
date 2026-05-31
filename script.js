document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const langToggleBtn = document.getElementById("lang-toggle-btn");
    const langToggleLabel = document.getElementById("lang-toggle-label");
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");
    const formSubmitBtn = document.getElementById("form-submit-btn");

    // -------------------------------------------------------------
    // Theme Toggling Logic
    // -------------------------------------------------------------
    function getCurrentTheme() {
        const localTheme = localStorage.getItem("theme");
        if (localTheme) return localTheme;
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return systemPrefersDark ? "dark" : "light";
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        if (theme === "dark") {
            root.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
        }
        
        const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
        if (metaColorScheme) {
            metaColorScheme.content = theme;
        }
    }

    const initialTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    applyTheme(initialTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || getCurrentTheme();
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
    });

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });

    // -------------------------------------------------------------
    // Language Toggling Logic
    // -------------------------------------------------------------
    function getCurrentLanguage() {
        return localStorage.getItem("lang") || "es";
    }

    function applyLanguage(lang) {
        document.documentElement.setAttribute("lang", lang);
        localStorage.setItem("lang", lang);
        
        // The button label shows the NEXT language available to switch to
        langToggleLabel.textContent = lang === "es" ? "EN" : "ES";
    }

    // Apply initial language
    const initialLang = getCurrentLanguage();
    applyLanguage(initialLang);

    langToggleBtn.addEventListener("click", () => {
        const currentLang = getCurrentLanguage();
        const newLang = currentLang === "es" ? "en" : "es";
        applyLanguage(newLang);
        
        // Hide feedback when language changes to avoid confusing translation
        formFeedback.classList.add("hidden");
    });

    // -------------------------------------------------------------
    // Contact Form Submission (Vercel Serverless Function + Resend)
    // -------------------------------------------------------------
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            // Get current language for localized messages
            const currentLang = getCurrentLanguage();
            
            // Form messages translations
            const messages = {
                es: {
                    sending: "Enviando mensaje...",
                    success: "¡Mensaje enviado con éxito! Se ha dirigido a hi@tellmeoz.dev.",
                    error: "Hubo un error al enviar el mensaje. Por favor intenta de nuevo.",
                    missing: "Por favor completa todos los campos requeridos."
                },
                en: {
                    sending: "Sending message...",
                    success: "Message sent successfully! Routed to hi@tellmeoz.dev.",
                    error: "There was an error sending your message. Please try again.",
                    missing: "Please fill in all required fields."
                }
            };

            const name = document.getElementById("form-name").value.trim();
            const email = document.getElementById("form-email").value.trim();
            const subject = document.getElementById("form-subject").value.trim();
            const message = document.getElementById("form-message").value.trim();

            if (!name || !email || !message) {
                showFeedback(messages[currentLang].missing, "error");
                return;
            }

            // Disable button and show sending status
            formSubmitBtn.disabled = true;
            const originalButtonTextHtml = formSubmitBtn.innerHTML;
            formSubmitBtn.textContent = messages[currentLang].sending;
            
            // Clear previous feedback
            formFeedback.classList.add("hidden");
            formFeedback.className = "form-feedback hidden";

            try {
                const response = await fetch("/api/send", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, subject, message })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    showFeedback(messages[currentLang].success, "success");
                    contactForm.reset();
                } else {
                    console.error("Server side error:", result.error);
                    showFeedback(`${messages[currentLang].error} (${result.error || 'Provider Error'})`, "error");
                }
            } catch (err) {
                console.error("Network / client error:", err);
                showFeedback(messages[currentLang].error, "error");
            } finally {
                // Restore button state
                formSubmitBtn.disabled = false;
                formSubmitBtn.innerHTML = originalButtonTextHtml;
            }
        });
    }

    function showFeedback(text, type) {
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`; // remove hidden, set type (success/error)
    }

    // -------------------------------------------------------------
    // Mouse Glow Orb Animation (Micro-animation)
    // -------------------------------------------------------------
    const orb1 = document.querySelector(".orb-1");
    const orb2 = document.querySelector(".orb-2");

    if (orb1 && orb2) {
        window.addEventListener("mousemove", (e) => {
            const x = e.clientX;
            const y = e.clientY;
            
            const moveX1 = (x - window.innerWidth / 2) * 0.05;
            const moveY1 = (y - window.innerHeight / 2) * 0.05;
            const moveX2 = (x - window.innerWidth / 2) * -0.03;
            const moveY2 = (y - window.innerHeight / 2) * -0.03;
            
            orb1.style.transform = `translate(${moveX1}px, ${moveY1}px)`;
            orb2.style.transform = `translate(${moveX2}px, ${moveY2}px)`;
        });
    }
});

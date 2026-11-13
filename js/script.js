/* Kartik Portfolio interactions — vanilla JavaScript with jQuery enhancements */
(function () {
  "use strict";

  const root = document.documentElement;
  const themeButtons = document.querySelectorAll(".theme-toggle");
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  // Theme preference is saved locally in this browser.
  function applyTheme(theme) {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
    } else {
      root.removeAttribute("data-theme");
    }
    themeButtons.forEach(function (button) {
      const darkIsActive = theme === "dark";
      button.setAttribute("aria-label", darkIsActive ? "Switch to light theme" : "Switch to dark theme");
      const label = button.querySelector(".theme-label");
      if (label) label.textContent = darkIsActive ? "Dark" : "Light";
      const icon = button.querySelector(".theme-icon");
      if (icon) icon.textContent = darkIsActive ? "☼" : "◐";
    });
  }

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem("kartika-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }
  applyTheme(savedTheme);

  themeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      try {
        localStorage.setItem("kartika-theme", nextTheme);
      } catch (error) {
        // Theme still works for this page even if browser storage is disabled.
      }
    });
  });

  // Mobile navigation.
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("click", function (event) {
      if (!primaryNav.contains(event.target) && !navToggle.contains(event.target)) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
      }
    });
  }

  // Footer year.
  document.querySelectorAll(".current-year").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  // Scroll reveal; content remains visible if IntersectionObserver is unavailable.
  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, activeObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach(function (element) { observer.observe(element); });
  } else {
    revealElements.forEach(function (element) { element.classList.add("is-visible"); });
  }

  // Small animated role rotator on the home page.
  const typedText = document.getElementById("typed-text");
  if (typedText) {
    const phrases = ["Cybersecurity", "Web Development", "Machine Learning", "Continuous Learning"];
    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      typedText.textContent = phrases[0];
    } else {
      function typeNext() {
        const phrase = phrases[phraseIndex];
        if (deleting) {
          charIndex -= 1;
          typedText.textContent = phrase.slice(0, charIndex);
        } else {
          charIndex += 1;
          typedText.textContent = phrase.slice(0, charIndex);
        }

        let delay = deleting ? 42 : 78;
        if (!deleting && charIndex >= phrase.length) {
          deleting = true;
          delay = 1250;
        } else if (deleting && charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          delay = 250;
        }
        window.setTimeout(typeNext, delay);
      }
      window.setTimeout(typeNext, 1600);
    }
  }

  // Resume print / Save as PDF.
  const printButton = document.getElementById("print-resume");
  if (printButton) {
    printButton.addEventListener("click", function () {
      window.print();
    });
  }

  // Contact form: front-end validation only; valid details are used to open a mail draft.
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const fields = ["name", "email", "subject", "message"];
    const status = document.getElementById("form-status");

    function setError(field, message) {
      const input = document.getElementById(field);
      const error = document.getElementById(field + "-error");
      input.setAttribute("aria-invalid", message ? "true" : "false");
      if (error) error.textContent = message;
    }

    function validateField(field) {
      const input = document.getElementById(field);
      const value = input.value.trim();
      let error = "";

      if (!value) {
        error = "Please complete this field.";
      } else if (field === "name" && value.length < 2) {
        error = "Please enter at least 2 characters.";
      } else if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Enter a valid email address.";
      } else if (field === "subject" && value.length < 3) {
        error = "Please enter a subject with at least 3 characters.";
      } else if (field === "message" && value.length < 10) {
        error = "Please enter a message with at least 10 characters.";
      }

      setError(field, error);
      return !error;
    }

    fields.forEach(function (field) {
      const input = document.getElementById(field);
      input.addEventListener("blur", function () { validateField(field); });
      input.addEventListener("input", function () {
        if (input.getAttribute("aria-invalid") === "true") validateField(field);
      });
    });

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const isValid = fields.map(validateField).every(Boolean);
      if (!isValid) {
        status.className = "form-status error";
        status.textContent = "Please correct the highlighted fields before continuing.";
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const body = "Hello Kartik,\n\n" + message + "\n\nFrom: " + name + "\nReply email: " + email;
      const mailto = "mailto:kartikkalal044@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      status.className = "form-status success";
      status.textContent = "Your details passed validation. Your email app may open with a draft; no message has been sent by this website.";
      window.location.href = mailto;
    });
  }

  // jQuery enhancement: gentle smooth scroll for same-page anchors, with reduced-motion support.
  if (window.jQuery) {
    jQuery(function ($) {
      $('a[href^="#"]').on("click", function (event) {
        const targetId = $(this).attr("href");
        if (!targetId || targetId === "#") return;
        const target = $(targetId);
        if (target.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          event.preventDefault();
          $("html, body").stop().animate({ scrollTop: target.offset().top - 82 }, 420);
        }
      });
    });
  }
})();

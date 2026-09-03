/* ========================================
   NOMAD 松戸宿 — Main JavaScript
   ======================================== */

(function () {
  'use strict';

  // --- Language Toggle ---
  let currentLang = 'ja';
  const langBtn = document.getElementById('langToggle');

  function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-ja][data-en]').forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (el.tagName === 'A' || el.tagName === 'SPAN' || el.tagName === 'P' || el.tagName === 'LI') {
        el.innerHTML = text;
      } else if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4') {
        el.innerHTML = text;
      } else if (el.tagName === 'BUTTON') {
        var span = el.querySelector('span[data-' + lang + ']');
        if (span) span.innerHTML = span.getAttribute('data-' + lang);
        else el.innerHTML = text;
      } else {
        el.innerHTML = text;
      }
    });
    langBtn.textContent = lang === 'ja' ? 'EN' : 'JA';
  }

  if (langBtn) {
    langBtn.addEventListener('click', function () {
      setLanguage(currentLang === 'ja' ? 'en' : 'ja');
    });
  }

  // Check URL hash for language
  if (window.location.hash === '#en') {
    setLanguage('en');
  }

  // --- Header Scroll ---
  var header = document.getElementById('header');
  function onScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile Menu ---
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('open');
      var isOpen = nav.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });

  // --- FAQ Accordion ---
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (faq) {
        faq.classList.remove('open');
        faq.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      // Open clicked (if wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Smooth Scroll (for anchor links) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80; // header height
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // --- Fade-in on Scroll (Intersection Observer) ---
  var fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();

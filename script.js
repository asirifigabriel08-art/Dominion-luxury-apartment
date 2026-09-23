// Dominion-Luxury Apartments — site behavior
// Shared across all pages: mobile nav, sticky header, floating WhatsApp/Call buttons.
// Page-specific: gallery lightbox (apartments.html), enquiry form + WhatsApp handoff (contact.html).

(function () {
  'use strict';

  // Real contact number for Dominion-Luxury Apartments (Sakumono, Accra).
  // Change this in one place to update every WhatsApp/call link on the site.
  var WHATSAPP_NUMBER = '233599463533'; // international format, no leading zero, no "+"
  var PHONE_DISPLAY = '+233 59 946 3533';
  var DEFAULT_WHATSAPP_MESSAGE = "Hello Dominion-Luxury Apartments, I'd like to check availability for a stay.";

  /* ---------- Mobile nav toggle ---------- */
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open menu');
      });
    });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('siteHeader');
  if (header) {
    var setHeaderState = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    setHeaderState();
    window.addEventListener('scroll', setHeaderState, { passive: true });
  }

  /* ---------- Ambient 3D motion and shader glow ---------- */
  var motionTargets = document.querySelectorAll('.hero-photo, .mini-card, .feature-card, .summary-card, .rate-card, .stat-pill, .gallery-tile, .hero-panel, .testimonial-wrap');

  motionTargets.forEach(function (element) {
    element.addEventListener('pointermove', function (event) {
      var bounds = element.getBoundingClientRect();
      var px = (event.clientX - bounds.left) / bounds.width;
      var py = (event.clientY - bounds.top) / bounds.height;
      var rotateY = (px - 0.5) * 11;
      var rotateX = (0.5 - py) * 11;

      element.style.setProperty('--rotate-y', rotateY + 'deg');
      element.style.setProperty('--rotate-x', rotateX + 'deg');
      element.style.background = 'radial-gradient(circle at ' + (px * 100) + '% ' + (py * 100) + '%, rgba(255,255,255,0.32), rgba(255,255,255,0.08) 24%, rgba(255,255,255,0) 60%)';
    });

    element.addEventListener('pointerleave', function () {
      element.style.setProperty('--rotate-y', '0deg');
      element.style.setProperty('--rotate-x', '0deg');
      element.style.background = '';
    });
  });

  var parallaxTargets = document.querySelectorAll('.hero-art, .hero-video-wrap, .hero-photo-stack, .hero-photo, .mini-card, .signature-layout, .feature-card, .gallery-tile');
  var updateParallax = function () {
    var viewportHeight = window.innerHeight;
    parallaxTargets.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      var progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
      var offset = (progress - 0.5) * 24;
      element.style.setProperty('--parallaxY', offset + 'px');
    });
  };

  if (parallaxTargets.length) {
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
  }

  window.addEventListener('pointermove', function (event) {
    var x = (event.clientX / window.innerWidth) * 100;
    var y = (event.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--pointer-x', x + '%');
    document.body.style.setProperty('--pointer-y', y + '%');
  });

  /* ---------- Floating WhatsApp + Call + AI assistant buttons (every page) ---------- */
  (function injectFloatingActions() {
    var wrap = document.createElement('div');
    wrap.className = 'floating-actions';

    var waLink = document.createElement('a');
    waLink.className = 'floating-btn floating-btn--whatsapp';
    waLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);
    waLink.target = '_blank';
    waLink.rel = 'noopener';
    waLink.setAttribute('aria-label', 'Message us on WhatsApp');
    waLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3.6-6.7" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 4a8 8 0 0 1 7.6 10.6L21 20l-5.6-1.4A8 8 0 1 1 12 4z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';

    var callLink = document.createElement('a');
    callLink.className = 'floating-btn floating-btn--call';
    callLink.href = 'tel:+' + WHATSAPP_NUMBER;
    callLink.setAttribute('aria-label', 'Call ' + PHONE_DISPLAY);
    callLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.5c1 .3 2 .5 3 .7a2 2 0 0 1 1.7 2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>';

    var aiButton = document.createElement('button');
    aiButton.type = 'button';
    aiButton.className = 'floating-btn floating-btn--assistant';
    aiButton.setAttribute('aria-label', 'Open Dominion AI concierge');
    aiButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 15a2 2 0 0 1 4 0v1H10v-1Zm-3-7a5 5 0 1 1 10 0v2.2A3 3 0 0 1 17 13.5V15H7v-1.5a3 3 0 0 1 1-2.3V8Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    wrap.appendChild(waLink);
    wrap.appendChild(callLink);
    wrap.appendChild(aiButton);
    document.body.appendChild(wrap);

    var aiPanel = document.createElement('div');
    aiPanel.className = 'ai-chat-panel';
    aiPanel.id = 'aiChatPanel';
    aiPanel.innerHTML = [
      '<div class="ai-chat-panel__header">',
      '  <div>',
      '    <span class="ai-chat-panel__eyebrow">Dominion AI</span>',
      '    <strong>Concierge</strong>',
      '  </div>',
      '  <button type="button" class="ai-chat-panel__close" aria-label="Close AI concierge">×</button>',
      '</div>',
      '<div class="ai-chat-panel__messages" id="aiChatMessages"></div>',
      '<div class="ai-chat-panel__quick-replies">',
      '  <button type="button" class="ai-quick-reply">Check availability</button>',
      '  <button type="button" class="ai-quick-reply">Room information</button>',
      '  <button type="button" class="ai-quick-reply">Talk to customer care</button>',
      '  <button type="button" class="ai-quick-reply">Leave a review</button>',
      '</div>',
      '<div class="ai-chat-panel__composer">',
      '  <input id="aiChatInput" type="text" placeholder="Type your name or ask a question..." aria-label="Ask the Dominion AI assistant">',
      '  <button id="aiChatSend" type="button" aria-label="Send message">Send</button>',
      '</div>'
    ].join('');
    document.body.appendChild(aiPanel);

    var aiChatPanel = document.getElementById('aiChatPanel');
    var aiChatMessages = document.getElementById('aiChatMessages');
    var aiChatInput = document.getElementById('aiChatInput');
    var aiChatSend = document.getElementById('aiChatSend');
    var aiChatClose = aiPanel.querySelector('.ai-chat-panel__close');
    var PROFILE_KEY = 'dominionAiProfile';

    function appendMessage(role, text) {
      var message = document.createElement('div');
      message.className = 'ai-chat-message ai-chat-message--' + role;
      message.textContent = text;
      aiChatMessages.appendChild(message);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function typeBotReply(text, delay) {
      var replyDelay = delay || 3000;
      var typingMessage = document.createElement('div');
      typingMessage.className = 'ai-chat-message ai-chat-message--bot ai-chat-message--typing';
      typingMessage.textContent = '...';
      aiChatMessages.appendChild(typingMessage);
      aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

      setTimeout(function () {
        typingMessage.textContent = text;
        typingMessage.classList.remove('ai-chat-message--typing');
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
      }, replyDelay);
    }

    function getTimeGreeting() {
      var hour = new Date().getHours();
      if (hour < 12) return 'Good morning';
      if (hour < 18) return 'Good afternoon';
      return 'Good evening';
    }

    function readProfile() {
      try {
        var stored = localStorage.getItem(PROFILE_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        return {};
      }
    }

    function saveProfile(profile) {
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
      } catch (error) {}
    }

    function getCurrentName() {
      var profile = readProfile();
      return profile && profile.name ? profile.name : '';
    }

    function getAiReply(question, visitorName) {
      var q = (question || '').toLowerCase();
      var name = visitorName || 'there';

      if (/(customer care|customer service|human|agent|support team|talk to someone|connect me|customer support)/.test(q)) {
        return 'I can connect you to our customer care team right away. You can continue in WhatsApp or speak with the team directly by phone.';
      }
      if (/(availability|available|dates|check in|check-in|checkin|book|booking|reserve)/.test(q)) {
        return 'To check availability, send your dates and guest count. The team will confirm the best room option and next steps for you, ' + name + '.';
      }
      if (/(room|apartment|suite|studio|private|living|bedroom|space|house)/.test(q)) {
        return 'Dominion-Luxury Apartments offers a private, comfortable homestay experience with a boutique-luxury feel. The team can confirm the best room fit for your dates and preferences.';
      }
      if (/(price|rate|cost|pricing|nightly|deposit|how much)/.test(q)) {
        return 'Rates are best confirmed directly because they depend on your dates and room choice. The team can confirm the right rate for you once you share your travel plans.';
      }
      if (/(sakumono|tema|location|beach|lagoon|accra|near|where|address)/.test(q)) {
        return 'Dominion-Luxury Apartments is located in Sakumono, a coastal community in Ghana’s Tema Metropolitan District, close to the lagoon and beach area.';
      }
      if (/(hello|hi|hey|good morning|good afternoon|good evening)/.test(q)) {
        return getTimeGreeting() + ', ' + name + '! I can help with availability, room information, location, and direct support.';
      }
      if (/(thank you|thanks)/.test(q)) {
        return 'You’re welcome, ' + name + '. I can continue helping with your stay, availability, or customer care connection.';
      }
      if (/(wifi|parking|security|clean|cleaning|amenities|family|couple|group)/.test(q)) {
        return 'The stay is designed to feel private, practical, and relaxed. For exact amenities or guest capacity, the property team can confirm the best option for your request.';
      }

      return 'I can help with room availability, pricing, location, or connecting you to the customer care team. Tell me what service you need and I’ll guide you.';
    }

    function renderWelcomeMessage() {
      var profile = readProfile();
      var currentName = profile.name || '';

      if (currentName) {
        appendMessage('bot', getTimeGreeting() + ', ' + currentName + '! I’m here to help with availability, room details, and direct customer support. What service do you need today?');
      } else {
        appendMessage('bot', 'Hi there! I’m here to help. Before I assist you, what is your name?');
      }
    }

    var reviewModal = document.createElement('div');
    reviewModal.className = 'review-modal';
    reviewModal.id = 'reviewModal';
    reviewModal.hidden = true;
    reviewModal.innerHTML = [
      '<div class="review-modal__card" role="dialog" aria-modal="true" aria-labelledby="reviewModalTitle">',
      '  <div class="review-modal__header">',
      '    <h3 id="reviewModalTitle" class="review-modal__title">Leave a review</h3>',
      '    <button type="button" class="review-modal__close" aria-label="Close review form">×</button>',
      '  </div>',
      '  <form class="review-form" id="reviewForm">',
      '    <div class="review-stars" aria-label="Rating">',
      '      <button type="button" class="review-star" data-value="1" aria-label="1 star">★</button>',
      '      <button type="button" class="review-star" data-value="2" aria-label="2 stars">★</button>',
      '      <button type="button" class="review-star" data-value="3" aria-label="3 stars">★</button>',
      '      <button type="button" class="review-star" data-value="4" aria-label="4 stars">★</button>',
      '      <button type="button" class="review-star" data-value="5" aria-label="5 stars">★</button>',
      '    </div>',
      '    <label for="reviewComment">Your comment</label>',
      '    <textarea id="reviewComment" placeholder="Tell us how we did..."></textarea>',
      '    <div class="review-actions">',
      '      <button type="button" class="review-cancel">Maybe later</button>',
      '      <button type="submit" class="review-submit">Send review</button>',
      '    </div>',
      '  </form>',
      '</div>'
    ].join('');
    document.body.appendChild(reviewModal);

    var reviewForm = document.getElementById('reviewForm');
    var reviewStars = reviewModal.querySelectorAll('.review-star');
    var reviewComment = document.getElementById('reviewComment');
    var reviewClose = reviewModal.querySelector('.review-modal__close');
    var reviewCancel = reviewModal.querySelector('.review-cancel');
    var selectedRating = 0;

    function setRating(value) {
      selectedRating = value;
      reviewStars.forEach(function (star) {
        star.classList.toggle('is-active', Number(star.dataset.value) <= value);
      });
    }

    reviewStars.forEach(function (star) {
      star.addEventListener('click', function () {
        setRating(Number(star.dataset.value));
      });
    });

    reviewClose.addEventListener('click', closeReviewModal);
    reviewCancel.addEventListener('click', closeReviewModal);
    reviewModal.addEventListener('click', function (event) {
      if (event.target === reviewModal) closeReviewModal();
    });

    if (reviewForm) {
      reviewForm.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = getCurrentName() || 'Guest';
        var comment = reviewComment.value.trim() || 'No comment provided.';
        var ratingText = selectedRating ? selectedRating + ' star' + (selectedRating > 1 ? 's' : '') : 'No rating';

        appendMessage('bot', 'Thank you, ' + name + '. Your review has been received with ' + ratingText + '.');
        appendMessage('bot', 'We appreciate your feedback and value your experience with us.');
        closeReviewModal();
        reviewForm.reset();
        selectedRating = 0;
        setRating(0);
      });
    }

    function promptForReview(name) {
      appendMessage('bot', 'Thank you for speaking with us, ' + name + '. Would you be willing to leave a quick review about your experience?');
      appendMessage('bot', 'A quick review helps us improve and helps future guests feel confident booking with us.');
      openReviewModal();
    }

    function openReviewModal() {
      var modal = document.getElementById('reviewModal');
      if (!modal) return;
      modal.hidden = false;
    }

    function closeReviewModal() {
      var modal = document.getElementById('reviewModal');
      if (!modal) return;
      modal.hidden = true;
    }

    function handleAiMessage(rawText) {
      var text = (rawText || '').trim();
      if (!text) return;

      appendMessage('user', text);

      var profile = readProfile();
      var currentName = profile.name || '';
      var lowerText = text.toLowerCase();

      if (!currentName) {
        var name = text.replace(/\s+/g, ' ').trim();
        if (name.length < 2) {
          typeBotReply('Please type your full name so I can greet you properly.', 1200);
          return;
        }

        profile.name = name;
        saveProfile(profile);

        typeBotReply(getTimeGreeting() + ', ' + name + '! I’m here to help with availability, room information, and customer support. What service do you need today?', 1500);
        return;
      }

      if (/(leave a review|review)/.test(lowerText)) {
        typeBotReply('Thank you for helping us improve. Please share your experience and we will continue to serve you better.', 1500);
        window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hello Dominion-Luxury Apartments, I would like to leave a review about my experience.'), '_blank', 'noopener');
        return;
      }

      if (/(customer care|customer service|human|agent|support team|talk to someone|connect me|customer support)/.test(lowerText)) {
        typeBotReply('Absolutely — I can connect you directly to our customer care team. You can continue on WhatsApp or call the team now.', 1800);
        setTimeout(function () {
          appendMessage('bot', 'Opening WhatsApp to our support line now.');
          window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hello Dominion-Luxury Apartments, I would like to speak to the customer care team.'), '_blank', 'noopener');
          promptForReview(currentName);
        }, 1800);
        return;
      }

      if (/(check availability|availability|dates|stay|book|booking|reserve)/.test(lowerText) || /(room|suite|apartment|bedroom|private)/.test(lowerText) || /(price|rate|pricing|cost|how much)/.test(lowerText) || /(location|where|sakumono|beach|lagoon)/.test(lowerText) || /(contact|support|question)/.test(lowerText)) {
        typeBotReply(getAiReply(text, currentName), 1800);
        setTimeout(function () { promptForReview(currentName); }, 2200);
        return;
      }

      typeBotReply(getAiReply(text, currentName), 1800);
      setTimeout(function () { promptForReview(currentName); }, 2200);
    }

    function toggleAiPanel(forceOpen) {
      var shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !aiPanel.classList.contains('is-open');
      aiPanel.classList.toggle('is-open', shouldOpen);
      aiButton.classList.toggle('is-active', shouldOpen);
      if (shouldOpen) {
        setTimeout(function () { aiChatInput.focus(); }, 120);
      }
    }

    renderWelcomeMessage();

    aiButton.addEventListener('click', function () {
      toggleAiPanel();
    });

    aiChatClose.addEventListener('click', function () {
      toggleAiPanel(false);
    });

    aiChatSend.addEventListener('click', function () {
      handleAiMessage(aiChatInput.value);
      aiChatInput.value = '';
    });

    aiChatInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleAiMessage(aiChatInput.value);
        aiChatInput.value = '';
      }
    });

    aiPanel.querySelectorAll('.ai-quick-reply').forEach(function (button) {
      button.addEventListener('click', function () {
        handleAiMessage(button.textContent);
      });
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && aiPanel.classList.contains('is-open')) {
        toggleAiPanel(false);
      }
    });
  })();

  /* ---------- Reveal-on-scroll animation ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealEls.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealEls.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  /* ---------- Testimonial slider (home) ---------- */
  var testimonialItems = document.querySelectorAll('.testimonial');
  var prevBtn = document.querySelector('.slider-btn-prev');
  var nextBtn = document.querySelector('.slider-btn-next');

  if (testimonialItems.length && prevBtn && nextBtn) {
    var currentIndex = 0;
    var showTestimonial = function (index) {
      testimonialItems.forEach(function (item, itemIndex) {
        var isActive = itemIndex === index;
        item.classList.toggle('is-active', isActive);
      });
    };

    prevBtn.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
      showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(currentIndex);
    });

    setInterval(function () {
      currentIndex = (currentIndex + 1) % testimonialItems.length;
      showTestimonial(currentIndex);
    }, 5000);
  }

  /* ---------- FAQ accordion ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (faqItem) {
    var button = faqItem.querySelector('.faq-question');
    var answer = faqItem.querySelector('.faq-answer');

    if (!button || !answer) return;

    button.addEventListener('click', function () {
      var isOpen = faqItem.classList.contains('is-open');

      faqItems.forEach(function (item) {
        item.classList.remove('is-open');
        var itemButton = item.querySelector('.faq-question');
        if (itemButton) itemButton.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        faqItem.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Gallery lightbox (apartments.html) ---------- */
  var galleryGrid = document.getElementById('galleryGrid');
  var lightbox = document.getElementById('lightbox');
  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var lightboxClose = document.getElementById('lightboxClose');

  if (galleryGrid && lightbox && lightboxImage && lightboxCaption && lightboxClose) {
    galleryGrid.querySelectorAll('.gallery-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var imgSrc = tile.getAttribute('data-image') || tile.querySelector('img')?.getAttribute('src') || '';
        lightboxImage.src = imgSrc;
        lightboxImage.alt = tile.querySelector('img')?.getAttribute('alt') || 'Apartment photo';
        lightboxCaption.textContent = tile.getAttribute('data-caption') || '';
        lightbox.hidden = false;
      });
    });

    var closeLightbox = function () { lightbox.hidden = true; };
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }

  /* ---------- Enquiry form + WhatsApp handoff (contact.html) ---------- */
  var form = document.getElementById('enquireForm');
  var status = document.getElementById('formStatus');
  var checkIn = document.getElementById('checkIn');
  var checkOut = document.getElementById('checkOut');
  var whatsappQuickLink = document.getElementById('whatsappQuickLink');

  if (checkIn && checkOut) {
    var todayISO = new Date().toISOString().slice(0, 10);
    checkIn.min = todayISO;

    var syncCheckoutMin = function () {
      if (!checkIn.value) return;
      var nextDay = new Date(checkIn.value);
      nextDay.setDate(nextDay.getDate() + 1);
      var minOut = nextDay.toISOString().slice(0, 10);
      checkOut.min = minOut;
      if (checkOut.value && checkOut.value < minOut) checkOut.value = minOut;
    };
    checkIn.addEventListener('change', syncCheckoutMin);
  }

  function buildWhatsAppMessage() {
    if (!form) return DEFAULT_WHATSAPP_MESSAGE;
    var name = (document.getElementById('fullName') || {}).value || '';
    var inDate = (checkIn || {}).value || '';
    var outDate = (checkOut || {}).value || '';
    var guests = (document.getElementById('guests') || {}).value || '';
    var pref = (document.getElementById('roomPreference') || {}).value || '';
    var msg = (document.getElementById('message') || {}).value || '';

    var lines = ["Hello Dominion-Luxury Apartments, I'd like to check availability."];
    if (name) lines.push('Name: ' + name);
    if (inDate || outDate) lines.push('Dates: ' + (inDate || '?') + ' to ' + (outDate || '?'));
    if (guests) lines.push('Guests: ' + guests);
    if (pref) lines.push('Preference: ' + pref);
    if (msg) lines.push('Message: ' + msg);
    return lines.join('\n');
  }

  if (whatsappQuickLink && form) {
    form.addEventListener('input', function () {
      whatsappQuickLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(buildWhatsAppMessage());
    });
  }

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.checkValidity()) {
        status.textContent = 'Please fill in your name, email, phone, and dates.';
        return;
      }
      if (checkIn.value && checkOut.value && checkOut.value <= checkIn.value) {
        status.textContent = 'Check-out needs to be after check-in.';
        return;
      }

      var name = document.getElementById('fullName').value.trim();

      // NOTE for developer: this is a static frontend — there is no backend yet.
      // A form submission here is a front-end inquiry flow. We redirect to a thank-you page.
      // If you later add a backend, replace this navigation with a fetch() POST.
      if (whatsappQuickLink) {
        whatsappQuickLink.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);
      }

      status.textContent = 'Thanks, ' + (name.split(' ')[0] || 'there') + ' — your enquiry is being prepared.';
      window.location.href = 'thank-you.html';
    });
  }
})();

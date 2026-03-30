document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // --- Calculator Logic ---
  const teamSizeSlider = document.getElementById('team-size');
  const hoursWastedSlider = document.getElementById('hours-wasted');
  const teamSizeVal = document.getElementById('team-size-val');
  const hoursWastedVal = document.getElementById('hours-wasted-val');
  const annualLossVal = document.getElementById('annual-loss');

  const updateCalculator = () => {
    const teamSize = parseInt(teamSizeSlider.value);
    const hoursWasted = parseFloat(hoursWastedSlider.value);
    
    teamSizeVal.textContent = teamSize;
    hoursWastedVal.textContent = hoursWasted;

    // Calculation: Team * Hours * 52 weeks * $70/hr * 2 (Efficiency multiplier)
    const annualLoss = Math.round(teamSize * hoursWasted * 52 * 70 * 2);
    
    // Format as currency
    annualLossVal.textContent = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(annualLoss);
  };

  if (teamSizeSlider && hoursWastedSlider) {
    teamSizeSlider.addEventListener('input', updateCalculator);
    hoursWastedSlider.addEventListener('input', updateCalculator);
    updateCalculator(); // Initial calculation
  }

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
  }
});

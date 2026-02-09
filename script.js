

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Initial setup - navbar starts full screen with centered logo
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');

    // Initially hide hero section
    hero.style.opacity = '0';

    // Handle scroll to transition navbar
    let hasTransitioned = false;
    window.addEventListener('scroll', () => {
        if (!hasTransitioned && window.scrollY > 50) {
            hasTransitioned = true;

            // Shrink navbar and move logo to left
            navbar.classList.add('shrink');

            // Show hero section after navbar transition
            setTimeout(() => {
                hero.style.opacity = '1';
                hero.style.transition = 'opacity 1s ease';
                hero.classList.add('visible');
            }, 1000);
        }

        // Navbar background change on scroll (only after shrink)
        if (navbar.classList.contains('shrink')) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add fade-in class to elements we want to animate
document.querySelectorAll('.service-card, .stat, .contact-form, .contact-info').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#27ae60';
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Service card hover effect enhancement
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let i = 0;
let isDeleting = false;

function typeWriter() {
    const text = originalText;
    if (!isDeleting) {
        heroTitle.textContent = text.substring(0, i + 1);
        i++;
        if (i === text.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
            return;
        }
    } else {
        heroTitle.textContent = text.substring(0, i);
        i--;
        if (i === 0) {
            isDeleting = false;
        }
    }
    setTimeout(typeWriter, isDeleting ? 50 : 100);
}

// Enable typing effect
setTimeout(typeWriter, 1000);

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Hero section scroll transition
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (scrolled > 100) {
        hero.classList.add('scrolled');
    } else {
        hero.classList.remove('scrolled');
    }
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Particle effect function
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// Add particle styles
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    .particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float 20s infinite linear;
        top: 100%;
    }
    .particle:nth-child(odd) {
        animation-direction: reverse;
    }
`;
document.head.appendChild(particleStyle);

// Stats counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 20);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});


const teamData = [
  {
    name: "Shriyansh Singh",
    role: "Founder, Director & Chief Executive Officer",
    img: "CEO.jpeg",
    desc: "As the Founder and CEO, Shreyansh Singh leads Curelex with a vision to integrate cutting-edge technology into healthcare."
  },
  {
    name: "Aman Maurya",
    role: "Co-Founder, Director & Chief Operating Officer",
    img: "COF.jpeg",
    desc: "As Co-Founder and COO, Aman Maurya oversees operations, ensuring seamless delivery of services."
  },
  {
    name: "Ashutosh Mishra",
    role: "Co-Founder & Chief Technology Officer",
    img: "CTO.png",
    desc: "As Co-Founder and CTO, Ashutosh Mishra spearheads technological advancements at Curelex."
  },
  {
    name: "Ishan Shrivastava",
    role: "Chief Marketing Officer",
    img: "CMO.jpeg",
    desc: "As CMO, Ishan Shrivastava drives marketing strategies to promote Curelex's innovative healthcare solutions."
  },
  {
    name: "Sandhya Tiwari",
    role: "Chief Legal Officer",
    img: "CLO.jpeg",
    desc: "As CLO, Sandhya Tiwari oversees legal affairs, ensuring compliance and protecting the organization."
  },
  {
    name: "Vishal Kumar Gond",
    role: "Head Camps and Awareness",
    img: "HCA.png",
    desc: "As Head of Camps and Awareness, Vishal Kumar Gond organizes community outreach programs and awareness campaigns."
  },
  {
    name: "Pankaj Pal",
    role: "Head Public Relations",
    img: "HPR.png",
    desc: "As Head of Public Relations, Pankaj Pal manages communications and enhances Curelex's reputation."
  }
];

function showMember(index, el) {
  document.getElementById("teamImg").src = teamData[index].img;
  document.getElementById("teamName").innerText = teamData[index].name;
  document.getElementById("teamRole").innerText = teamData[index].role;
  document.getElementById("teamDesc").innerText = teamData[index].desc;

  document.querySelectorAll(".team-list li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");

  moveArrow(el);
}

function moveArrow(li) {
  const arrow = document.getElementById("bubbleArrow");
  const list = document.getElementById("teamList");

  const liRect = li.getBoundingClientRect();
  const listRect = list.getBoundingClientRect();

  const topPos = liRect.top - listRect.top + (liRect.height / 2) - 12;
  arrow.style.top = topPos + "px";
}

/* initial arrow */
window.onload = () => {
  const firstLi = document.querySelector(".team-list li.active");
  moveArrow(firstLi);
};


const heroImg = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
  const rect = heroImg.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight - 100) {
    heroImg.classList.add("show");
  }
});

/* also show if already in view on load */
window.addEventListener("load", () => {
  const rect = heroImg.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    heroImg.classList.add("show");
  }
});

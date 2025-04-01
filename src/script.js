// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Typing Animation
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Software Engineer", "AI/ML Engineer", "College Student"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Project Filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    projectCards.forEach((card) => {
      if (
        filterValue === "all" ||
        card.getAttribute("data-category") === filterValue
      ) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Contact Form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Get form data
  const templateParams = {
    from_name: contactForm.querySelector('input[name="name"]').value,
    from_email: contactForm.querySelector('input[name="email"]').value,
    subject: contactForm.querySelector('input[name="subject"]').value,
    message: contactForm.querySelector('textarea[name="message"]').value,
  };

  // Initialize EmailJS with environment variable
  (function () {
    emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
  })();

  // Send email using EmailJS
  emailjs
    .send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      templateParams
    )
    .then(
      function (response) {
        alert("Message sent successfully!");
        contactForm.reset();
      },
      function (error) {
        alert("Failed to send message. Please try again.");
        console.error("EmailJS error:", error);
      }
    )
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
});

// Skill Progress Animation
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress");
  skillBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = width;
    }, 500);
  });
}

// Trigger skill animation when scrolled into view
const skillsSection = document.querySelector("#skills");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateSkills();
    }
  });
});

observer.observe(skillsSection);

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or default to user's system preference
const currentTheme =
  localStorage.getItem("theme") ||
  (prefersDarkScheme.matches ? "dark" : "light");

// Set initial theme
if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  themeToggle.checked = true;
}

// Theme switch handler
themeToggle.addEventListener("change", function () {
  if (this.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// Listen for system theme changes
prefersDarkScheme.addEventListener("change", (e) => {
  const newTheme = e.matches ? "dark" : "light";
  if (!localStorage.getItem("theme")) {
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.checked = e.matches;
  }
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress-bar");
  const totalScroll =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalScroll) * 100;
  scrollProgress.style.width = `${progress}%`;
});

// Back to Top functionality
const backToTop = document.querySelector(".back-to-top");
const threshold = 300;

// Show/hide button based on scroll position
const handleScroll = () => {
  if (window.pageYOffset > threshold) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
};

window.addEventListener("scroll", handleScroll);

// Smooth scroll to top when clicked
backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hide button on page load
document.addEventListener("DOMContentLoaded", () => {
  handleScroll();
});

// Page Loading Animation
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

// Section Visibility Animation
const observerOptions = {
  threshold: 0.1,
};

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.classList.add('visible');
//         }
//     });
// }, observerOptions);

// document.querySelectorAll('section').forEach(section => {
//     observer.observe(section);
// });

// Function to load projects dynamically
function loadProjects() {
  const projectGrid = document.querySelector('.project-grid');
  const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
  
  // If there are no projects in localStorage, keep the existing HTML content
  if (projects.length === 0) return;
  
  // Clear existing projects
  projectGrid.innerHTML = '';
  
  // Add projects from localStorage
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-category', project.category);
    
    projectCard.innerHTML = `
      <div class="project-img">
        <img src="${project.image}" alt="${project.title}" />
        <div class="project-overlay">
          <div class="project-links">
            ${project.link ? `<a href="${project.link}" class="project-link" target="_blank"><i class="fas fa-link"></i></a>` : ''}
            ${project.github ? `<a href="${project.github}" class="project-link" target="_blank"><i class="fab fa-github"></i></a>` : ''}
          </div>
        </div>
      </div>
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-tags">
          ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
        </div>
      </div>
    `;
    
    projectGrid.appendChild(projectCard);
  });
  
  // Re-initialize project filters
  initProjectFilters();
}

// Function to load skills dynamically
function loadSkills() {
  const skillsContainer = document.querySelector('.skills-container');
  const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || [];
  
  // If there are no skills in localStorage, keep the existing HTML content
  if (skills.length === 0) return;
  
  // Group skills by category
  const skillsByCategory = {};
  skills.forEach(skill => {
    if (!skillsByCategory[skill.category]) {
      skillsByCategory[skill.category] = [];
    }
    skillsByCategory[skill.category].push(skill);
  });
  
  // Clear existing skills
  skillsContainer.innerHTML = '';
  
  // Add skills by category
  Object.keys(skillsByCategory).forEach(category => {
    const skillCard = document.createElement('div');
    skillCard.className = 'skill-card';
    
    let icon = 'fas fa-code'; // Default icon
    if (category === 'Backend') icon = 'fas fa-server';
    if (category === 'AI/ML') icon = 'fas fa-brain';
    if (category === 'Other') icon = 'fas fa-tools';
    
    skillCard.innerHTML = `
      <i class="${icon}"></i>
      <h3>${category}</h3>
    `;
    
    // Add skills for this category
    skillsByCategory[category].forEach(skill => {
      const skillBar = document.createElement('div');
      skillBar.className = 'skill-bar';
      skillBar.innerHTML = `
        <div class="skill-progress" style="width: ${skill.level}%">
          <span>${skill.name}</span>
        </div>
      `;
      skillCard.appendChild(skillBar);
    });
    
    skillsContainer.appendChild(skillCard);
  });
  
  // Re-initialize skill animations
  animateSkills();
}

// Function to load experience items (if you want to add an experience section)
function loadExperience() {
  const experiences = JSON.parse(localStorage.getItem('portfolioExperience')) || [];
  
  // If there are no experiences or no experience section, return
  if (experiences.length === 0 || !document.getElementById('experience')) return;
  
  // Implementation for experience section if you add it later
}

// Call these functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
  // Load dynamic content
  loadProjects();
  loadSkills();
  loadExperience();
  
  // Your existing initialization code
});

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = {
        name: contactForm.querySelector('input[name="name"]').value,
        email: contactForm.querySelector('input[name="email"]').value,
        subject: contactForm.querySelector('input[name="subject"]').value,
        message: contactForm.querySelector('textarea[name="message"]').value
      };
      
      // Send email using EmailJS
      emailjs.send('default_service', 'template_default', {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
      .then(function() {
        // Show success message
        alert('Your message has been sent successfully!');
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      })
      .catch(function(error) {
        // Show error message
        alert('Oops! There was an error sending your message. Please try again later.');
        console.error('EmailJS error:', error);
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});
// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting on scroll
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }

    // Navbar background on scroll
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        } else {
            navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        highlightActiveNavLink();
        handleNavbarScroll();
        animateOnScroll();
    });

    // Scroll animations
    function animateOnScroll() {
        const animateElements = document.querySelectorAll('.education-item, .skill-item, .project-card, .achievement-card');
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }

    // Contact form validation and handling
    const contactForm = document.getElementById('contactForm');
    const formInputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        subject: document.getElementById('subject'),
        message: document.getElementById('message')
    };

    const errorElements = {
        name: document.getElementById('nameError'),
        email: document.getElementById('emailError'),
        subject: document.getElementById('subjectError'),
        message: document.getElementById('messageError')
    };

    // Validation functions
    function validateName(name) {
        if (!name.trim()) {
            return 'Name is required';
        }
        if (name.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }
        return '';
    }

    function validateEmail(email) {
        if (!email.trim()) {
            return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    }

    function validateSubject(subject) {
        if (!subject.trim()) {
            return 'Subject is required';
        }
        if (subject.trim().length < 3) {
            return 'Subject must be at least 3 characters long';
        }
        return '';
    }

    function validateMessage(message) {
        if (!message.trim()) {
            return 'Message is required';
        }
        if (message.trim().length < 10) {
            return 'Message must be at least 10 characters long';
        }
        return '';
    }

    // Show/hide error messages
    function showError(field, message) {
        errorElements[field].textContent = message;
        errorElements[field].classList.add('show');
        formInputs[field].style.borderColor = 'var(--color-error)';
    }

    function clearError(field) {
        errorElements[field].classList.remove('show');
        formInputs[field].style.borderColor = '';
    }

    // Real-time validation
    Object.keys(formInputs).forEach(field => {
        formInputs[field].addEventListener('input', function() {
            const value = this.value;
            let errorMessage = '';

            switch(field) {
                case 'name':
                    errorMessage = validateName(value);
                    break;
                case 'email':
                    errorMessage = validateEmail(value);
                    break;
                case 'subject':
                    errorMessage = validateSubject(value);
                    break;
                case 'message':
                    errorMessage = validateMessage(value);
                    break;
            }

            if (errorMessage) {
                showError(field, errorMessage);
            } else {
                clearError(field);
            }
        });

        // Clear error on focus
        formInputs[field].addEventListener('focus', function() {
            clearError(field);
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const formData = {
            name: formInputs.name.value,
            email: formInputs.email.value,
            subject: formInputs.subject.value,
            message: formInputs.message.value
        };

        // Validate all fields
        const errors = {
            name: validateName(formData.name),
            email: validateEmail(formData.email),
            subject: validateSubject(formData.subject),
            message: validateMessage(formData.message)
        };

        // Show errors if any
        let hasErrors = false;
        Object.keys(errors).forEach(field => {
            if (errors[field]) {
                showError(field, errors[field]);
                hasErrors = true;
            } else {
                clearError(field);
            }
        });

        // If no errors, simulate form submission
        if (!hasErrors) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });

    // Success message function
    function showSuccessMessage(message) {
        // Create success message element
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--color-success);
            color: var(--color-btn-primary-text);
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        successDiv.textContent = message;
        
        // Add to page
        document.body.appendChild(successDiv);
        
        // Animate in
        setTimeout(() => {
            successDiv.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.parentNode.removeChild(successDiv);
                }
            }, 300);
        }, 5000);
    }

    // Skill item hover effects
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px) scale(1)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px) scale(1)';
        });
    });

    // Smooth reveal animation for sections
    function revealSections() {
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('fade-in');
            }, index * 200);
        });
    }

    // Initialize animations
    setTimeout(revealSections, 500);

    // Back to top functionality
    const backToTopLink = document.querySelector('a[href="#home"]');
    if (backToTopLink) {
        backToTopLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for better scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const observeElements = document.querySelectorAll('.education-item, .skill-item, .project-card, .achievement-card, .contact-item');
    observeElements.forEach(el => {
        observer.observe(el);
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle resize events
    window.addEventListener('resize', function() {
        // Close mobile menu on resize to larger screen
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Initialize page
    function initializePage() {
        // Set initial active nav link
        highlightActiveNavLink();
        
        // Initial scroll animation check
        animateOnScroll();
        
        // Handle initial navbar state
        handleNavbarScroll();
        
        console.log('Portfolio website initialized successfully!');
    }

    // Initialize everything
    initializePage();

    // Performance optimization: debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll-intensive functions
    const debouncedScrollHandler = debounce(() => {
        highlightActiveNavLink();
        handleNavbarScroll();
        animateOnScroll();
    }, 10);

    window.removeEventListener('scroll', function() {
        highlightActiveNavLink();
        handleNavbarScroll();
        animateOnScroll();
    });

    window.addEventListener('scroll', debouncedScrollHandler);
});
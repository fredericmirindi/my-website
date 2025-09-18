// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    
    // Get the button element
    const clickButton = document.getElementById('clickButton');
    
    // Counter for button clicks
    let clickCount = 0;
    
    // Array of fun messages
    const messages = [
        'Hello there! 👋',
        'Nice click! 🎉',
        'You\'re awesome! ⭐',
        'Keep clicking! 🚀',
        'Amazing! 🌟',
        'Fantastic! 🎊',
        'You\'re on fire! 🔥',
        'Incredible! 💫'
    ];
    
    // Add click event listener to the button
    if (clickButton) {
        clickButton.addEventListener('click', function() {
            clickCount++;
            
            // Get a random message
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            
            // Update button text with click count and message
            clickButton.textContent = `${randomMessage} (Clicked ${clickCount} times)`;
            
            // Add a fun animation class
            clickButton.style.transform = 'scale(0.95)';
            
            // Reset the animation after a short delay
            setTimeout(() => {
                clickButton.style.transform = 'scale(1)';
            }, 150);
            
            // Create a fun particle effect
            createParticleEffect(event);
            
            console.log(`Button clicked ${clickCount} times!`);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Function to create particle effect
    function createParticleEffect(event) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = event.clientX + 'px';
            particle.style.top = event.clientY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);
            
            // Animate the particle
            const angle = (Math.PI * 2 * i) / 6;
            const velocity = 100;
            const life = 1000;
            
            particle.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: life,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }
    
    // Add a subtle animation to sections when they come into view
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
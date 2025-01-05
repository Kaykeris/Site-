// Initialize EmailJS with your public key
(function() {
    emailjs.init("GJpHwAEl8pon3yJge"); 
})();

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const submitButton = document.getElementById('submit-btn');
    const loadingText = document.getElementById('loading-text');
    
    submitButton.disabled = true;
    loadingText.style.display = 'block';
    setTimeout(() => loadingText.classList.add('visible'), 10);

    const templateParams = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'K Company', 
    };

    emailjs.send('service_007', 'template_nyk7yho', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Mensagem enviada com sucesso!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        })
        .finally(function() {
            submitButton.disabled = false;
            loadingText.classList.remove('visible');
            setTimeout(() => loadingText.style.display = 'none', 300);
        });
}

// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    // Initialize scroll to top
    const scrollButton = document.querySelector('.scroll-top');
    if (scrollButton) {
        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            
            if (scrollTop + clientHeight > scrollHeight - 300) {
                scrollButton.classList.add('visible');
            } else {
                scrollButton.classList.remove('visible');
            }
        });

        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize section animations
    const sections = document.querySelectorAll('section');
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});

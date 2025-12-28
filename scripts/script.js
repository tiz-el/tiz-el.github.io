document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    // Close menu when clicking a link (but not if it's a dropdown toggle on mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            // Check if this link is a dropdown toggle and we are on mobile
            if (window.innerWidth <= 768 && link.parentElement.classList.contains('dropdown')) {
                // Do nothing here, let the dropdown toggle handler specifically handle it
                return;
            }

            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);

    // Sticky Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 31, 63, 1)'; // Solid navy on scroll
        } else {
            navbar.style.backgroundColor = ''; // Revert to CSS default (#2b3a8c)
        }
    });

    // News Slider Functionality
    const newsTrack = document.getElementById('news-track');
    const newsContainer = document.querySelector('.news-slider-container');
    const prevBtn = document.getElementById('news-prev');
    const nextBtn = document.getElementById('news-next');

    if (newsTrack && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const cardWidth = 320; // Estimated card width + margin, for rough scrolling

        nextBtn.addEventListener('click', () => {
            newsContainer.scrollBy({ left: cardWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            newsContainer.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        });
    }

    // Mobile Dropdown Toggle
    if (window.innerWidth <= 768) {
        const dropdownToggles = document.querySelectorAll('.dropdown > .nav-link');

        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent jump
                const menu = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');

                // Toggle current
                menu.classList.toggle('active');

                // Rotate icon if exists
                if (icon) {
                    icon.style.transform = menu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                }
            });
        });
    }

    // Auto-sliding for Services on Mobile (480px)
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        let isPaused = false;
        let slideIntervalId;

        const startSlider = () => {
            if (window.innerWidth <= 480) {
                slideIntervalId = setInterval(() => {
                    if (isPaused) return;

                    const maxScroll = servicesGrid.scrollWidth - servicesGrid.clientWidth;
                    if (servicesGrid.scrollLeft >= maxScroll - 10) {
                        servicesGrid.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Scroll by approx one card width + gap
                        servicesGrid.scrollBy({ left: 280, behavior: 'smooth' });
                    }
                }, 3000);
            }
        };

        const stopSlider = () => {
            clearInterval(slideIntervalId);
        };

        // Initial start
        startSlider();

        // Pause on touch to allow manual browsing
        servicesGrid.addEventListener('touchstart', () => isPaused = true);
        servicesGrid.addEventListener('touchend', () => {
            setTimeout(() => isPaused = false, 3000);
        });

        // Re-evaluate on resize
        window.addEventListener('resize', () => {
            stopSlider();
            startSlider();
        });
    }
});

// Scramble reveal animation on page load
console.log("Kevin Xia's Personal Website");

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

function scrambleText(element) {
    const originalText = element.textContent;
    const length = originalText.length;
    let iterations = 0;

    const interval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return originalText[index];
                }
                if (char === ' ') return ' ';
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        iterations += 1 / 3;

        if (iterations >= length) {
            clearInterval(interval);
            element.textContent = originalText;
        }
    }, 30);
}

// Page load animation
document.addEventListener('DOMContentLoaded', () => {
    // Hide all content initially
    document.body.style.opacity = '0';

    // Start reveal after a brief moment
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity = '1';

        // Scramble the h1 heading
        const h1 = document.querySelector('h1');
        if (h1) {
            setTimeout(() => scrambleText(h1), 150);
        }

        // Animate sections with stagger
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 300 + (index * 80));
        });

        // Animate profile image with a scale effect
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) {
            profileImg.style.opacity = '0';
            profileImg.style.transform = 'scale(0.8)';

            setTimeout(() => {
                profileImg.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                profileImg.style.opacity = '1';
                profileImg.style.transform = 'scale(1)';
            }, 100);
        }
    }, 50);

    // Infinite looping carousel for books
    const booksGrid = document.querySelector('.books-grid');
    if (booksGrid) {
        const bookCards = Array.from(booksGrid.children);

        // Clone books multiple times for seamless looping
        const cloneCount = 3;
        for (let i = 0; i < cloneCount; i++) {
            bookCards.forEach(card => {
                const clone = card.cloneNode(true);
                booksGrid.appendChild(clone);
            });
        }

        const baseSpeed = 0.5; // base pixels per frame
        let currentSpeed = baseSpeed;
        const maxSpeed = 5; // maximum speed when scrolling
        const deceleration = 0.05; // how fast it returns to base speed

        // Auto-scroll function - ALWAYS running
        function autoScroll() {
            if (booksGrid) {
                booksGrid.scrollLeft += currentSpeed;

                // Reset scroll position for infinite loop
                const maxScroll = booksGrid.scrollWidth / (cloneCount + 1);
                if (booksGrid.scrollLeft >= maxScroll) {
                    booksGrid.scrollLeft = 0;
                }

                // Gradually return to base speed
                if (currentSpeed > baseSpeed) {
                    currentSpeed = Math.max(baseSpeed, currentSpeed - deceleration);
                }
            }
            requestAnimationFrame(autoScroll);
        }

        // Start auto-scrolling
        autoScroll();

        // Wheel scroll to speed up
        booksGrid.addEventListener('wheel', (e) => {
            e.preventDefault();

            // Speed up when scrolling right, slow down when scrolling left
            if (e.deltaY > 0 || e.deltaX > 0) {
                currentSpeed = Math.min(maxSpeed, currentSpeed + 0.5);
            } else if (e.deltaY < 0 || e.deltaX < 0) {
                currentSpeed = Math.max(baseSpeed * 0.2, currentSpeed - 0.3);
            }
        }, { passive: false });

        // Touch support for mobile - swipe to speed up
        let touchStartX;
        let lastTouchX;
        let touchVelocity = 0;

        booksGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            lastTouchX = touchStartX;
        });

        booksGrid.addEventListener('touchmove', (e) => {
            const currentX = e.touches[0].pageX;
            touchVelocity = lastTouchX - currentX;
            lastTouchX = currentX;

            // Speed up based on swipe velocity
            if (touchVelocity > 0) {
                currentSpeed = Math.min(maxSpeed, currentSpeed + Math.abs(touchVelocity) * 0.05);
            }
        });

        booksGrid.addEventListener('touchend', () => {
            // Speed gradually returns to base automatically via autoScroll
        });
    }
});

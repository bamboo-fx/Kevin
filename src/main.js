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
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';

        // Scramble the h1 heading
        const h1 = document.querySelector('h1');
        if (h1) {
            setTimeout(() => scrambleText(h1), 300);
        }

        // Animate sections with stagger
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
        });

        // Animate profile image with a scale effect
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) {
            profileImg.style.opacity = '0';
            profileImg.style.transform = 'scale(0.8)';

            setTimeout(() => {
                profileImg.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                profileImg.style.opacity = '1';
                profileImg.style.transform = 'scale(1)';
            }, 200);
        }
    }, 100);
});

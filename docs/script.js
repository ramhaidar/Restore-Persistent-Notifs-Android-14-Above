// Tab functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding tab pane
            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Copy to clipboard functionality
    const copyButtons = document.querySelectorAll('.copy-btn');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const clipboardId = button.dataset.clipboard;
            let textToCopy = '';

            // Define the text for each clipboard ID
            switch (clipboardId) {
                case 'mac-linux-all':
                    textToCopy = 'adb shell \'for p in $(pm list packages --user 0 -3 | cut -d: -f2); do cmd appops set --user 0 --uid "$p" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow; done\'';
                    break;
                case 'windows-all':
                    textToCopy = 'adb shell pm list packages --user 0 -3 | % {\n  $pkg = ($_ -split \':\')[1]\n  if ($pkg) { adb shell "cmd appops set --user 0 --uid $pkg SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow" }\n}';
                    break;
                case 'single-app':
                    textToCopy = 'adb shell cmd appops set --user 0 --uid com.example.app SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS allow';
                    break;
                case 'verify':
                    textToCopy = 'adb shell cmd appops get --user 0 --uid com.example.app | grep DISMISSIBLE';
                    break;
                case 'revert-all-mac':
                    textToCopy = 'adb shell \'for p in $(pm list packages --user 0 -3 | cut -d: -f2); do cmd appops set --user 0 --uid "$p" SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS default; done\'';
                    break;
                case 'revert-single':
                    textToCopy = 'adb shell cmd appops set --user 0 --uid com.example.app SYSTEM_EXEMPT_FROM_DISMISSIBLE_NOTIFICATIONS default';
                    break;
            }

            try {
                await navigator.clipboard.writeText(textToCopy);
                // Visual feedback
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#4ade80';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.background = '#4ade80';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                }, 2000);
            }
        });
    });

    // Smooth scrolling for anchor links
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

    // Add some animation on scroll
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

    // Observe elements for animation
    document.querySelectorAll('.requirement-card, .step, .note-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Phone mockup animation
    const phoneMockup = document.querySelector('.phone-mockup');
    if (phoneMockup) {
        phoneMockup.style.animation = 'float 6s ease-in-out infinite';
    }
});

// Add floating animation for phone mockup
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);